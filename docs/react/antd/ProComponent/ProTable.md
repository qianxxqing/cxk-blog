### ProTable ###
#### 这里使用class组件实现 CxkTable -- 简易的ProTable ####

目录结构如下
```
|-- CxkTable
  |-- SearchForm
  |   |-- index.jsx
  |   |-- config.js //searchForm的默认配置文件
  |-- index.jsx
  |-- config.js //CxkTable默认配置文件
```
##### @/CxkTable/index.jsx #####

```jsx
//@/CxkTable/index.jsx
import React from 'react'
import { Table } from 'antd'
import SearchForm from './SearchForm'
import config from './config'
class TableContext extends Table {
  constructor(props) {
    super(props)
  }
}

export default class CxkTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dataSource: this.props.dataSource || [],
      pagination: {
        ...config.pagination,
        onChange: (current, pageSize) => {
          this.setState(({ pagination }) => ({
            pagination: {
              ...pagination,
              current,
              pageSize
            }
          }), () => this.reload())
        }
      },
      filter: {} //request arguments[2] 
    }
  }

  get pagination() {
    return {
      ...this.state.pagination,
      ...(this.props.pagination || {})
    }
  }

  setFilter = (filter, cb) => void this.setState({ filter }, cb)

  getRequestArguments = () => {
    const { pagination } = this
    const { filter } = this.state
    const { current, pageSize } = pagination
    return [
      //pamams
      {
        current,
        pageSize
      },
      //sotter
      undefined,
      //filter
      filter
    ]
  }

  componentDidMount() {
    console.log(this.context, 'this')
    this.reload()
  }

  reload = () => {
    const { request } = this.props
    const { getRequestArguments } = this
    request && (async () => {
      this.setState({ loading: true })
      const res = await request(...getRequestArguments())
      this.setState(state => ({
        dataSource: res.data,
        loading: false,
        pagination: {
          ...state.pagination,
          total: res.total
        }
      }))
    })()
  }

  render() {
    const { columns, search } = this.props
    const { dataSource, loading } = this.state
    const { setFilter, reload, pagination } = this
    return (
      <div>
        {
          search && (
            <SearchForm 
              columns={columns} 
              setFilter={setFilter}
              reload={reload}
            />
          ) 
        }
        <TableContext 
          columns={columns}
          loading={loading}
          pagination={pagination}
          dataSource={dataSource}
        />
      </div>
    )
  }
}

```

##### @/CxkTable/config.js #####
```js
export default {
  pagination: {
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
    pageSize: 10,
    current: 1,
    total: 0,
    showQuickJumper: true,
    showTotal: t => `共${t}条`,
  }
}
```

##### @/CxkTable/searchForm/index.jsx #####

```jsx
import React, { Component } from 'react'
import { Col, Row, Form, Input, Button } from 'antd'
import config from './config'
const { Item } = Form


export default Form.create({
  name: 'searchForm',
})(class SearchFormContext extends Component {
  renderSearchFormItem = (item, key) => {
    const { getFieldDecorator } = this.props.form
    return (
      <Item label={item.title} key={key}>
        {
          item.dataIndex ? getFieldDecorator(item.dataIndex)(
            item.renderFormItem ? item.renderFormItem() : <Input/>
          ) : (item.renderFormItem ? item.renderFormItem() : <Input/>)
        }
      </Item>
    )
  }
  renderSearchFormItems = () => {
    const { columns=[], form } = this.props
    return columns.filter(item => !item.hideInSearch).map(this.renderSearchFormItem)
  }

  handleReset = () => {
    this.props.form.resetFields()
    this.props.setFilter({})
  }

  handleSearch = () => {
    const vals = this.props.form.getFieldsValue()
    this.props.setFilter(vals, () => {
      this.props.reload()
    })
    
  }

  componentDidMount() {
    console.log('searchFormDidMount()')
  }

  render() {
    const { props, renderSearchFormItems, handleReset, handleSearch } = this
    return (
      <Form 
        {...config.form}
      >
        {renderSearchFormItems()}
        <Item>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Item>
      </Form>
    )
  }
})
```

##### @/CxkTable/searchForm/config.js #####

```js
export default {
  form: {
    layout: 'inline' 
  }
}
```
*****
#### demo文件 ####


```jsx
//Demo.jsx
import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'
import CxkTable from './comonents/CxkTable'

export default class Test extends Component {
  get columns() {
    return [
      {
        title: 'id',
        dataIndex: 'id',
        hideInSearch: true
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '注册时间',
        dataIndex: 'time',
        renderFormItem: () => <DatePicker/>
      },
      {
        title: '操作',
        render: (_, record) => (
          <Button type="primary" onClick={() => this.addUpdateRecord(record.id)}>编辑</Button>
        ),
        hideInSearch: true
      }
    ]
  }

  addUpdateRecord = id => {
    console.log('编辑' + id)
  }

  fetchData = async () => new Promise((resolve) => {
    setTimeout(() => {
      const list = Array(10).fill().map((_, i) => ({
        id: Math.random(),
        name: Math.random() > 0.4 ? '马保国' : '蔡徐坤',
        age: parseInt(Math.random() * 30),
        time: Date.now()
      }))
      resolve(list)
    }, 2000)
  })

  render() {
    const { columns } = this
    return (
      <div>
        <CxkTable
          columns={columns}
          search={false} //这里只支持false不支持searchConfig
          dataSource={[{}, {}]}
          request={async (parmas, sorter, filter) => {
            console.log(parmas, filter, 'params, filter')
            const list = await this.fetchData()
            return {
              data: list,
              total: 35
            }
          }}
        />
      </div>
    )
  }
}

```
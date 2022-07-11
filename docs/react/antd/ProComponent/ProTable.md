### ProTable ###
#### 使用class组件实现 ####

```javascript
import React from 'react'
import { Table } from 'antd'
import SearchForm from './SearchForm'
import defaultConfig from './defaultConfig'
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
        ...defaultConfig.pagination,
        onChange: (current, pageSize) => {
          this.setState(({ pagination }) => ({
            pagination: {
              ...pagination,
              current,
              pageSize
            }
          }), () => this.reload())
        }
      }
    }
    this.searchFormRef = null
  }

  get pagination() {
    return {
      ...this.state.pagination,
      ...(this.props.pagination || {})
    }
  }


  getRequestArguments = () => {
    const { pagination } = this
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
      (this.searchFormRef.getFieldsValue() || {})
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
    const { columns } = this.props
    const { dataSource, loading } = this.state
    const { pagination } = this
    return (
      <div>
        <SearchForm columns={columns} ref={ref => this.searchFormRef = ref}/>
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

```javascript
import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
const { Item } = Form

export default Form.create({
  mapPropsToFields: props => Form.createFormField({
    columns: props.columns
  })
})(class SearchFormContext extends Component {
  renderSearchFormItems = () => {
    const { columns, form } = this.props
    const { getFieldDecorator } = form
    return columns.filter(item => !item.hideInSearch).map((item, i) => (
      <Item label={item.title} key={i}>
        {getFieldDecorator(item.dataIndex)(<Input/>)}
      </Item>
    ))
  }
  
  shouldComponentUpdate() {
    return false
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSearch = () => {
    const vals = this.props.form.getFieldsValue()
    console.log(vals)
  }

  render() {
    const { renderSearchFormItems, handleReset, handleSearch } = this
    return (
      <Form>
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

```javascript
//defaultConfig.js
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

```javascript
//Demo.jsx
import React, { Component } from 'react'
import CxkTable from './CxkTable'

export default class Test extends Component {
  get columns() {
    return [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      }
    ]
  }

  fetchData = async () => new Promise((resolve) => {
    setTimeout(() => {
      const list = Array(10).fill().map((_, i) => ({
        id: Math.random(),
        name: Date.now(),
        age: Math.random() * 20
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
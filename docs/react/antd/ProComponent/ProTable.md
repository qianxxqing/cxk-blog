### ProTable ###
#### 使用class组件实现 ####

```javascript
//ProTable.js
import React from 'react'
import { Table } from 'antd'
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
  }

  get pagination() {
    return {
      ...this.state.pagination,
      ...(this.props.pagination || {})
    }
  }

  //request hooks
  get requestArguments() {
    const { pagination } = this
    const { current, pageSize } = pagination
    return [
      //pamams
      {
        current,
        pageSize
      }
    ]
  }

  componentDidMount() {
    console.log(this, 'this')
    this.reload()
  }

  reload = () => {
    const { request } = this.props
    const { requestArguments } = this
    request && (async () => {
      this.setState({ loading: true })
      const res = await request(...requestArguments)
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
      <TableContext 
        columns={columns}
        loading={loading}
        pagination={pagination}
        dataSource={dataSource}
      />
    )
  }
}

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
import ProTable from './ProTable'

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
        title: Date.now(),
        age: Math.random() * 20
      }))
      resolve(list)
    }, 2000)
  })

  render() {
    const { columns } = this
    return (
      <div>
        <ProTable
          columns={columns}
          dataSource={[{}, {}]}
          request={async (parmas) => {
            console.log(parmas, 'params')
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
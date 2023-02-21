### RequestButton ###

##### 封装antd Button组件 使其完成请求防抖 #####


```jsx
import { useState } from 'react'
import { Button } from 'antd'

//request: () => Promise()
export default function RequestButton(props) {
  const [loading, setLoading] = useState(false)
  const proxyOnClick = (...args) => {
    props.onClick && props.onClick(...args)
    setLoading(true)
    props.request(...args).finally(() => {
      setLoading(false)
    })
  }
  return (
    <Button 
      {...props}
      loading={loading}
      onClick={proxyOnClick}
    >{props.children}</Button>
  )
}
```

##### demo #####

```jsx
import { RequestButton } from '@/components/myAntd'
export default function Demo() {
  
  const handleOutputQuery = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('output')
      resolve()
    }, 1000)
  })

  return (
    <>
      <RequestButton 
        type="primary"
        request={handleOutputQuery}
      >导出excel</RequestButton>
    </>
  )
}
```
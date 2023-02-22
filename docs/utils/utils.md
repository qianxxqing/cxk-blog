### 个人开发常用工具函数 ###

#### 简化数据类型判断 ####
```javascript
const getRawType = value => Object.prototype.toString.call(value).slice(8, -1)
```

#### 复制到粘贴板 #### 
```javascript
export const copy = content => {
  const input = document.createElement("input")
  input.setAttribute("value", content)
  document.body.appendChild(input)
  input.select()
  input.setSelectionRange(0, 9999)
  if (document.execCommand("copy")) {
    document.execCommand("copy")
    message.success("复制成功！")
  }
  document.body.removeChild(input)
}
```

#### url文件转化成blob ####
```javascript
export const getBlob = url => new Promise(resolve => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url + '?=' + Math.random(), true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.response)
    }
  }
  xhr.send()
})
```

#### 下载文件 ####
```js
export const downloadFile = async (fileName, url) => {
  //注: 依赖于getBlob
  const data = await getBlob(url)
  const reader = new FileReader()
  // 传入被读取的blob对象
  reader.readAsDataURL(data)
  reader.onload = (e) => {
    let a = document.createElement('a')
    a.download = fileName
    a.style.display = 'none'
    let url = reader.result
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
```

#### 获取图片的base64 ####
```js
export const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})
```

#### map类型转化(一般适用于将antd Select适用的类型转化为需要的类型) ####
```js
export const getMapBySelect = ({
  statusList = [], 
  isReverse = false, //map反转 (1 => 'a' 转变 'a' => 1)
  type = Object, //严格map是Map 默认Object
  defaultProps = { text: 'text', value: 'value'}
}) => {
  const [textProp, valueProp] = [defaultProps.text, defaultProps.value]
  const map = new type(statusList.map(item => {
    const mapItem = [item[textProp], item[valueProp]]
    return isReverse ? mapItem : mapItem.reverse()
  }))
  if(Class === Object) {
    return map.reduce((pre, cur) => ({ ...acc, [cur[0]]: cur[1]}), {})
  }
  if(Class === Map) {
    return new Map(map)
  }
  if(Class === Function) {
    return key => new Map(map).get(key)
  }
}

//demo
const statusList = [
  {text: '苹果', value: 1},
  {text: '香蕉', value: 2},
]
const _map = getMapBySelect({ statusList, type: Map })
console.log(_map)
```

#### 获取文件名字符串的后缀 ####
```js
const getSuffix = src => src.split('?')[0].slice(src.lastIndexOf('.') + 1)
```

#### 获取阿里云oss压缩后的图片 ####
```js
const getResizeImage = (img, width = 350) => img ? `${img}?x-oss-process=image/resize,w_${width}` : ''
```

#### js动态生成新的script ####
```js
const createScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
  resolve(script)
})
```

#### 引入vConsole ####
```js
//注: 依赖于createScript
const createVconsle = () => {
  const src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
  createScript(src).then((res) => {
    setTimeout(() => {
      const setScript = document.createElement("script")
      setScript.type = "text/javascript"
      const code = "var vConsole = new window.VConsole();"
      try {
        setScript.appendChild(document.createTextNode(code))
      } catch (error) {
        setScript.text = code
      }
      document.body.appendChild(setScript)
    }, 2000)
  })
  //返回一个销毁vConsole的函数
  return () => window.vConsole.destroy()
}
```
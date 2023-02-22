## devConst ##

在开发环境下使用的一些变量 比如说开发环境下的css容器添加border而发布生产后让border隐藏 可以通过`process.env`对象来区分环境
##### react项目中使用 #####

```jsx
const { CXK_ENV } = process.env //在webpack配置开发环境混入CXK_ENV=development 生产环境为production
const isDev = CXK_ENV === 'development'
const getRandomColor = () => '#' + parseInt(Math.random() * 0x1000000).toString(16).padStart(6, '0') //随机颜色
void (global => {
  window.$const = {}
  global.devBorder = isDev ? `1px solid ${getRandomColor()}` : undefined
})(window)

//例如在react.js项目中使用

export default function Demo() {
  return (
    <div style={{ marginTop: 20, border: window.$const.devBorder }}>
      123
    </div>
  )
}

```

##### vue项目中使用 #####

```js

//注意在vue.js中这个函数应该绑定在vue.prototype上(vue2) 或者app.config.globalProperties上(vue3)
//这里以vue3.js为例
//main.js
import { createApp } from 'vue'
import App from './App.vue'
//在webpack配置开发环境混入CXK_ENV=development 生产环境为production
const { CXK_ENV } = process.env 
const isDev = CXK_ENV === 'development'
const getRandomColor = () => '#' + parseInt(Math.random() * 0x1000000).toString(16).padStart(6, '0')

const app = createApp(App)
app.config.globalProperties.$const = {}
app.config.globalProperties.$const.devBorder = isDev ? `1px solid ${getRandomColor()}` : undefined

app.mount('#app')
```

```vue

//组件 template
<template>
  <div :style="{border: $const.devBorder}">
    123
  </div>
</template>

```



## 代理console ##

我们在开发环境下会在代码中编写很多`console`,我们不希望在生产环境下被别人看到console,或者不希望被别人使用`console`调试我们的代码,可以使用以下插件来代理`console`

```js
const { CXK_ENV } = process.env //nodejs混入自定义的env来区分环境
const isDev = CXK_ENV === 'development'
//生产环境关闭console
void (global => {
  if (!isDev) {
    for(const key in global.console) {
      if(typeof global.console[key] === 'function') {
        global.console[key] = () => {}
      }
    }
  }
})(window)
```

 同样的道理,我们可以设置一个`黑名单`来让部分报错保持沉默

这里以`react`项目,循环不设置`key`的报错保持沉默为例子(慎用)

````jsx
void (global => {
  //静默报错的黑名单匹配单词
  const blackList = [
    //这里示范一下禁用react的key报错 慎用
    `Each child in a list should have a unique "key" prop.`
  ]
  const e = global.console.error
  const getIsSilent = (...args) => {
    return [...args].some(arg => blackList.some(word => String(arg).indexOf(word) !== -1))
  }
  global.console.error = (...args) => {
    getIsSilent(...args) || e(...args)
  }
})(window)

export default function Demo() {
  return (
  	<>
      {Array(114514).fill().map((_, i) => <p>{i}</p>)}
    </>
  )
}
````

扩展: 当然,在一些较难调试的情况下,也可以借用网络请求把错误日志发送给服务端便于debug

```js
const handler = () => {
  try {
    //...do something
  } catch(e) {
    console.error(e)
    fetch(xxx, {
      errorMsg: String(e)
    })
  }
}
```


### useComputed ###
#### 在react函数式组件模拟vue computed的set功能 ####
******

`react`中函数式组件 可以用`useMemo`模拟vue的`computed`的`get`属性 当需要用到`set`属性的时候 需要对该hooks进行扩展

下面自定义`hooks useComputed`

首先说明vue和react的状态区别在于 `vue`用了`proxy`劫持数据 我们可以直接修改状态 但是`react`里面`state`的修改必须试用`setState`函数 

也就是说我们`vue`的`computed`里面可以 直接对`data`数据操作即可完成`set`数据

```javascript
//vue.js
export default {
  data: () => ({
    msg: '我是蔡徐坤'
  }),
  computed: {
    reverseMsg: {
      get() {
        return this.msg.split('').reverse().join('')
      },
      set(v) {
        this.msg = v.split('').reverse().join('')
      }
    }
  }
}
```



react中 state的修改都是用setState函数实现 那么**useComputed**的**set**函数也应该是一个**setState**方法

```javascript
import { useMemo } from 'react'

export const useComputed = (option, deps) => {
  const cbRes = (typeof option === 'function') ? option() : option.get() //兼容对象式和函数式
  const res = useMemo(() => cbRes, deps)
  const changeRes = (v) => option.set(v)
  return [res, changeRes]
}
```

````javascript
//demo react.js
//useComputed得到数组 第一位是get 第二位是set
//然后我们在set函数里面对依赖的状态进行setState即可完成useComputed
export default function Demo() {
  const [str, setStr] = useState('蔡徐坤')
  const addStr = () => setStr(str => str + Math.random().toString()[2])
  const [reverseStr, setReverseStr] = useComputed({
    get: () => str.split('').reverse().join(''),
    set: v => setStr(v.split('').reverse().join(''))
  }, [str])
  //const reverseStr = useMemo(() => str.split('').reverse().join(''), [str])
  const changeReverseStr = () => {
  	setReverseStr('马保国')
  }
  return (<></>)
}

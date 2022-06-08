### useComputed ###
#### 在react函数式组件模拟vue computed的set功能 ####
******

react中函数式组件 可以用useMemo模拟vue的computed的get属性 当需要用到set属性的时候 需要对该hooks进行扩展

下面自定义hooks useComputed

首先说明vue和react的状态区别在于 vue 用了proxy劫持数据 

也就是说我们vue的computed里面可以 直接对data数据操作即可完成set数据

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

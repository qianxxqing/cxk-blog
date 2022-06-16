### useEffect ###

*****

```js
let preDeps = undefined //初始deps应该为undefined 这样在deps为[]的时候可以触发一次
//cb的返回值
let unmountHooks = undefined
const setUnmountHooks = hooks => {
  console.log(hooks, 'hooks')
  //这样初始值为undefined 这样将其变为函数后就不会重复执行
  typeof unmountHooks === 'function' || (unmountHooks = hooks)
}
const patchIsDepsUpdate = (preDeps, deps) => {
  if(preDeps?.length !== deps.length) {
    return true
  }
  //校验deps和preDeps是否一致(使用Object.is进行浅比较)
  return !preDeps.every((_, i) => Object.is(preDeps[i], deps[i]))
}
export const useCxkEffect = (cb, deps) => {
  if(typeof cb !== 'function') {
    throw new Error('第一个参数(cb)必须是函数')
  }
  //没有deps 与render同步
  if(!deps) {
    setUnmountHooks(cb())
  } else {
    //校验deps类型为数组
    if(!Array.isArray(deps)) {
      throw new Error('第二个参数(deps)必须是依赖数组')
    }
    const isUpdate = patchIsDepsUpdate(preDeps, deps)
    //如果依赖更新则执行回调
    isUpdate && setUnmountHooks(cb())
    //更新deps
    preDeps = deps
  }
}
```


useStore




```javascript
//@/store/index.js

import { useMemo, useContext } from 'react'
import { useSetState } from 'ahooks'
import StoreContext from './context'

//state
const createInitState = () => ({
  ts: Date.now(),
  msg: 'cxknmsl',
  userInfo: {},
  count: 0,
  list: () => new Array(114514).fill().map((_, i) => i) //大型数据应该用函数暴露 后续修改直接替换整个函数
})

//computed
const getters = {
  reverseMsg: state => [state.msg.split('').reverse().join(''), [state.msg]],
  userName: state => [state.userInfo?.name, [state.userInfo]],
}


//Store
const Store = (props) => {
  const [state, setState] = useSetState(createInitState)
  return (
    <StoreContext.Provider value={[state, setState]}>
      {props.children}
    </StoreContext.Provider>
  )
}

/* 
  hooks-------
*/

export const useStore = () => {
  const [state, setState] = useContext(StoreContext)
  return [state, setState]
}

//修改复杂数据项
export const useComplexStore = target => {
  const [state, setState] = useContext(StoreContext)
  if(!target) {
    return [state, setState]
  }
  const createStateGroup = key => [
    state[key], 
    payload => setState(state => {
      return typeof payload === 'function' ?
        {[key]: payload(state[key])} :
        {[key]: payload}
    })
  ]
  if(Array.isArray(target)) {
    return target.map(key => createStateGroup(key)) 
  } else {
    return createStateGroup(target)
  }
}

export const useStoreGetters = (payload) => {
  const mapGetter = (typeof payload === 'function') ? payload : (getters => getters[payload])
  const [state] = useContext(StoreContext)
  const [computedRes, deps] = mapGetter(getters)(state)
  const getter = useMemo(() => computedRes, deps)
  return getter
}

export default Store

```


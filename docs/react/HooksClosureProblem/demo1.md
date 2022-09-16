### 我遇到的React Hooks中的闭包问题 (关键词: 函数词法作用域)

```jsx
import React, { useState, useEffect, useMemo } from 'react';

export default function Welcome() {
  const [data, setData] = useState(0)
  const [btnFlag, setBtnFlag] = useState(false)

  const getData = () => {
    console.log(data)
    return data
  }

  //hooks带来的闭包问题
  const renderBtn = useMemo(() => (
    btnFlag ? <button>禁止点击的按钮</button> : <button onClick={() => getData()}>获取数据的按钮</button>
  ), [btnFlag])
  //useMemo最好不要涉及ui 如果要使用 需要把返回ui里面函数依赖的数据全部加入deps
  //data改变使得useMemo重新执行获取 getData函数才能获取当前词法作用域内最新的data

  useEffect(() => {
    setInterval(() => {
      setData(data => data + 1)
    }, 1000)
  }, [])

  return (
    <>
      <p>data: --- {data}</p>
      <button onClick={() => setBtnFlag(f => !f)}>切换下一个按钮的状态</button>
      &nbsp;&nbsp;&nbsp;
      {renderBtn}
    </>
  );
}
```

demo中 renderBtn是由useMemo包裹返回的UI组件,deps为`[btnFlag]`,逻辑是在切换`btnFlag`时重新渲染Btn

但是这样`getData`函数无法返回最新的data数据
由于`函数的静态作用域`原理 useMemo在deps不变时不会返回新的memoState, 而react的函数组件本质上是函数重载 `renderBtn`将会得到并非最新的函数`getData`,而老旧的`getData`获取老旧的`data`所以产生了bug

总结: ui组件尽量不要使用useMemo渲染,如果一定要使用,那么应该将关联的`state`和函数内依赖的`state`都传入`useMemo`的`deps`
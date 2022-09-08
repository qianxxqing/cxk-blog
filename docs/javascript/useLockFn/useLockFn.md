### useLockFn函数(竞态锁) ###

用于给一个异步函数增加竞态锁，防止并发执行。


```javascript
//竞态锁 @param fn: (...args: any[]) => Promise<any>
/**
* @function useLockFn
* @description 用于给一个异步函数增加竞态锁，防止并发执行。
* @param fn {Function} (...args: any[]) => Promise<any>
*/
const useLockFn = (fn) => {
  let finish = true
  return (...args) => {
    if(!finish) return
    finish = false
    fn(...args).finally(() => {
      finish = true
    })
  }
}
```

#### demo ####

```javascript

//demo
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      code: 200,
      success: true,
      data: []
    })
  }, 3000)
})

const lockFetchData = useLockFn(async () => {
  const res = await fetchData()
  console.log(res)
})

window.addEventListener('click', () => {
  lockFetchData()
})
```


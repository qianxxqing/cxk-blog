### useOnce函数 在生命周期内只会令其回调运行1次的hooks ###

用于确保回调最多只被执行1次


```javascript
//竞态锁 @param cb: (...args: any[]) => any
/**
* @function useOnce
* @description 用于确保回调最多只被执行1次
* @param cb {Function} (...args: any[]) => any
*/
const useOnce = function(cb) {
  let isFirst = true
  return function() {
    if(isFirst) {
      isFirst = false
      cb.apply(this, arguments)
    }
  }
}
```

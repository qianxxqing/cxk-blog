### pipe函数 ###

##### 案例 #####
现在有2个钩子函数`checkLogin(同步)`和`checkIsVip(异步)`
```javascript
const checkLogin = (cb) => {
  const token = localStorage.getItem('token')
  token && cb?.()
}

const checkIsVip = async (cb) => {
  const isVip = await new Promise((resolve) => {
    setTimeout(() => {
      const res = Math.random() > 0.5
      console.log('network fetch success res==', res)
      resolve(res)
    }, 1000)
  })
  isVip && cb?.()
}
```
我们的需求是在页面mount时候校验只有同步函数`checkLogin`成功执行回调，再执行异步函数`checkIsVip`然后再执行我们自己需要进行的操作`foo`
由此，可以很自然的可以想到
```jsx
import { useEffect } from 'react'
import { checkLogin, checkIsVip } from '@/utils'
const foo = () => {
  console.log('foo()')
}
export default () => {
  useEffect(() => {
    checkLogin(() => {
      checkIsVip(() => {
        foo()
      })
    })
  }, [])
  return (<></>)
}
```
但是这样的问题在于回调嵌套太深,如果实际需求增加`checkA`,`checkB`, `checkC`....会形成回调地狱,很不优雅
```jsx
import { useEffect } from 'react'
import { checkLogin, checkIsVip, checkA, checkB, checkC } from '@/utils'
const foo = () => {
  console.log('foo()')
}

export default () => {
  useEffect(() => {
    checkLogin(() => {
      checkIsVip(() => {
        checkA(() => {
          checkB(() => {
            checkC(() => {
              foo()
            })
          })
        })
      })
    })
  }, [])
  return (<></>)
}
```

##### 封装pipe函数 同时支持异步与同步函数，并且按顺序按需执行 #####
```javascript
const pipe = async (...args) => { //arg must use function
  const middlewares = args.slice(0, -1)
  const cb = args[args.length - 1]
  const generator = function*(middlewares) {
    for(const middleware of middlewares) {
      yield(middleware)
    }
  }
  try {
    const gen = generator(middlewares)
    for(const middleware of middlewares) {
      await new Promise((resolve, reject) => {
        try {
          middleware?.(() => {
            resolve()
          })
        } catch(e) {
          reject(e)
        }
      })
    }
    cb?.()
  } catch(e) {
    // console.log(e, 'e===')
  }
}
```
**demo**
```jsx
import { useEffect } from 'react'
import { checkLogin, checkIsVip, pipe } from '@/utils'
const foo = () => {
  console.log('foo()')
}
export default () => {
  useEffect(() => {
    pipe(checkLogin, checkIsVip, () => {
      foo()
    })
  }, [])
  return (<></>)
}
```

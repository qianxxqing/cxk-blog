### class SuperArray ###
##### 继承于Array类 新增一些好用的方法 ####

******

##### filterSet #####

数组元素是简单数据类型时,可以使用JavaScript内置类**Set**简单去重

```javascript
//利用Set去重
const arr = [1,1,4,5,1,4]
const filterArr = [...new Set(arr)] // --> [1,4,5]
```

但是在处理复杂数组时候这个方法并不好用

```javascript
const arr = [{
    name: '蔡徐坤',
    age: 19,
    id: Symbol(1)
  },
  {
    name: '蔡徐坤',
    age: 20,
    id: Symbol(1)
  },
  {
    name: '肖战',
    age: 20,
    id: Symbol(2)
  },
  {
    name: '马保国',
    age: 20,
    id: Symbol(2)
  },
]
```

Set只能根据引用判断是否去重,于是我们设计一个类**ArraySet**继承于**Array**, 这个类含有一个特殊的过滤函数**filterSet**

```javascript
class SuperArray extends Array {
  filterSet(cb, isUseBefore=false, isReplace=false) {
    /**
    * @param cb {Function} (item) => any 函数的返回值作为过滤去重的依赖
    * @param isUseBefore {Boolean} 如果触发去重时候是否保留后者
    * @param isReplace {Boolean} 仅仅在isUseBefore为true时候有效 如果触发去重时候是否替换前者这将会导致去重后的位置索引问题 具体看demo
    */
    const res = []
    const cache = []
    for (const item of this.slice()) {
      const target = cb(item) //去重的依赖
      const repeatIndex = cache.findIndex(c => target === c)
      if(repeatIndex !== -1) {
        res.push(item)
        cache.push(target)
      } else {
        if(isUseBefore) {
          isReplace ? res.splice(1, repeatIndex, item) : (() => {
            res.splice(1, repeatIndex)
            res.push(item)
          })
        }
      }
    }
    return res
  }
}

const arr = [{
    name: '蔡徐坤',
    age: 19,
    id: Symbol(1)
  },
  {
    name: '蔡徐坤',
    age: 20,
    id: Symbol(1)
  },
  {
    name: '肖战',
    age: 20,
    id: Symbol(2)
  },
  {
    name: '马保国',
    age: 20,
    id: Symbol(2)
  },
]

//demo
//使用ArraySet过滤
//返回值是去重的依赖 这里指定name 那么name === '蔡徐坤'的会作为去重的依赖 后者会覆盖前者
const filterArr = new SuperArray(...arr).filterSet(item => item.name) 
//根据filterSet的返回值来指定去重的依赖 循环后者会覆盖前者
console.log(filterArr) 
```




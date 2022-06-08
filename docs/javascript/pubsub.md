### PubSub的实现 ###
##### 包含emit on once off ####


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <button id="button" type="button">按钮</button>
    <button id="button2" type="button">取消监听</button>
  </body>
</html>
<script type="text/javascript">
  class PubSub {
    constructor() {
      this.eventList = []
    }
    static createId() {
      return Symbol(Math.random())
    }
    static off(names, by) {
      names.forEach(tragets => {
        const combineTargets = Array.isArray(tragets) ? [...tragets] : [tragets]
        combineTargets.forEach(target => {
          this.eventList = this.eventList.filter(e => e[by] !== target)
        })
      })
    }
    on(name, fn) {
      const id = this.constructor.createId()
      const e = {
        name,
        fn,
        id
      }
      this.eventList.push(e)
      return id
    }
    once(name, fn) {
      const id = this.on(name, (...args) => {
        fn(...args)
        this.offById(id)
      })
    }
    off(...args) {
      this.constructor.off.call(this, [...args], 'name')
      return this
    }
    offById(...args) {
      this.constructor.off.call(this, [...args], 'id')
      return this
    }
    emit(name, ...args) {
      const es = this.eventList.filter(e => e.name === name)
      es?.length && es.forEach(e => e.fn(...args))
    }
  }
</script>
<script type="text/javascript">
  const $bus = new PubSub()
  //once只会监听一次就自己移除监听
  $bus.once('click', (...args) => {
    console.log([...args], '监听点击1')
  })
  //on函数返回值是监听器id
  const id = $bus.on('click', (...args) => {
    console.log([...args], '监听点击2')
  })
  button.addEventListener('click', () => {
    //PubSub.prototype.emit(name, payload)
    $bus.emit('click', {
      name: '蔡徐坤',
      ts: Date.now()
    }, '呵呵呵', Symbol('蔡徐坤'))
  })
  button2.addEventListener('click', () => {
    $bus.offById(id) //根据id销毁订阅 example: $bus.offById([id1, id2...], id5, id6)
    //$bus.off('click') 将会销毁所有 click的订阅
  })
</script>
```


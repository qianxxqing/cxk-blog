### AbortController优雅实现取消监听(取代removeEventListener) ###
```html
<style type="text/css">
  #box {
    width: 100px;
    height: 100px;
    background-color: #61DAFB;
  }
</style>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="box">
      <span id="desc">
        数量到100取消监听
      </span>
      <span id="value">
        0
      </span>
    </div>
  </body>
</html>
<script type="text/javascript">
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController
  const controller = new AbortController()
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
  box.addEventListener('mousemove', () => {
    const targetDom = box.querySelector('#value')
    const oldVal = ~~targetDom.innerHTML
    const newVal = oldVal + 1
    targetDom.innerHTML = newVal
    if (newVal >= 100) {
      controller.abort()
    }
  }, {
    signal: controller.signal
  })
</script>
```



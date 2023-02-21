module.exports = {
  title: 'cxk',
  description: 'cxknmsl',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'test页面', link: '/test/test' },
    ],
    sidebar: [
      ['/', '首页'],
      ['/test/test', 'test页面'],
      {
        title: 'JavaScript',
        children: [
          ['/javascript/extendClass/extendClass.md', '类的扩展'],
          ['/javascript/pubsub.md', '发布订阅(PubSub)'],
          ['/javascript/useInit/useInit.md', 'useInit函数'],
          ['/javascript/useLockFn/useLockFn.md', 'useLockFn函数(竞态锁)'],
          ['/javascript/useOnce/useOnce.md', 'useOnce函数'],
          ['/javascript/AbortController.md', '使用AbortController优雅销毁监听'],
          ['/javascript/pipe.md', '使用pipe函数优雅的管理多个条件执行的回调']
        ]
      },
      {
        title: 'React',
        children: [
          {
            title: 'Hooks',
            children: [
              ['/react/hooks/useComputed.md', 'useComputed']
            ]
          },
          {
            title: 'React源码部分',
            children: [
              {
                title: 'Hooks',
                children: [
                  ['/react/sourceCode/hooks/useEffect.md', 'useEffect']
                ]
              }
            ]
          },
          {
            title: 'ant design',
            children: [
              {
                title: 'ProComponent',
                children: [
                  ['/react/antd/ProComponent/ProTable.md', 'ProTable']
                ]
              },
              ['/react/antd/RequestButton.md', 'RequestButton']
            ]
          },
          {
            title: 'Hooks闭包陷阱',
            children: [
              ['/react/HooksClosureProblem/demo1.md', 'useMemo控制ui导致的闭包陷阱']
            ]
          }
        ]
      },
      ['/plugins/plugins.md', '用于开发的小技巧']
    ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
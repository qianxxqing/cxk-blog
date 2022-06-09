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
          ['/javascript/ArraySet/ArraySet.md', 'ArraySet'],
          ['/javascript/pubsub.md', '发布订阅(PubSub)'],
          ['/javascript/useInit/useInit.md', 'useInit函数'],
        ]
      },
      {
        title: 'React',
        children: [
          {
            title: 'hooks',
            children: [
              ['/react/hooks/useComputed.md', 'useComputed']
            ]
          }
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
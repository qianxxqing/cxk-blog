/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "/Users/x/cxk/cxk-blog/node_modules/@vuepress/core/lib/client/components/GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-099d9706",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-099d9706").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-26bf8e2d",
    path: "/javascript/AbortController.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-26bf8e2d").then(next)
    },
  },
  {
    name: "v-2a8e10eb",
    path: "/javascript/extendClass/extendClass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2a8e10eb").then(next)
    },
  },
  {
    name: "v-57b4ea96",
    path: "/javascript/pubsub.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-57b4ea96").then(next)
    },
  },
  {
    name: "v-1a23cd56",
    path: "/javascript/pipe.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1a23cd56").then(next)
    },
  },
  {
    name: "v-2093d607",
    path: "/javascript/useInit/useInit.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2093d607").then(next)
    },
  },
  {
    name: "v-0596900a",
    path: "/javascript/useLockFn/useLockFn.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0596900a").then(next)
    },
  },
  {
    name: "v-b1855a16",
    path: "/plugins/plugins.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-b1855a16").then(next)
    },
  },
  {
    name: "v-14ae177a",
    path: "/javascript/useOnce/useOnce.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-14ae177a").then(next)
    },
  },
  {
    name: "v-f436cb96",
    path: "/react/HooksClosureProblem/demo1.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-f436cb96").then(next)
    },
  },
  {
    name: "v-9293c076",
    path: "/react/antd/ProComponent/ProTable.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-9293c076").then(next)
    },
  },
  {
    name: "v-759b0075",
    path: "/react/hooks/useComputed.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-759b0075").then(next)
    },
  },
  {
    name: "v-61ad8ab5",
    path: "/utils/utils.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-61ad8ab5").then(next)
    },
  },
  {
    name: "v-c7d22506",
    path: "/react/sourceCode/hooks/useEffect.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-c7d22506").then(next)
    },
  },
  {
    name: "v-72930975",
    path: "/test/test.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-72930975").then(next)
    },
  },
  {
    name: "v-11aa9e83",
    path: "/react/antd/RequestButton.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-11aa9e83").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]
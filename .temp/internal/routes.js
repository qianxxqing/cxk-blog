/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "/Users/x/cxk/vue-press/vuepress-starter/node_modules/@vuepress/core/lib/client/components/GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-1c7f9382",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1c7f9382").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-292f79dc",
    path: "/javascript/extendClass/extendClass.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-292f79dc").then(next)
    },
  },
  {
    name: "v-4f25769c",
    path: "/javascript/pubsub.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4f25769c").then(next)
    },
  },
  {
    name: "v-764d362e",
    path: "/javascript/useInit/useInit.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-764d362e").then(next)
    },
  },
  {
    name: "v-21356b48",
    path: "/plugins/plugins.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-21356b48").then(next)
    },
  },
  {
    name: "v-91550528",
    path: "/react/antd/ProComponent/ProTable.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-91550528").then(next)
    },
  },
  {
    name: "v-2d656c48",
    path: "/react/hooks/useComputed.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-2d656c48").then(next)
    },
  },
  {
    name: "v-c69369b8",
    path: "/react/sourceCode/hooks/useEffect.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-c69369b8").then(next)
    },
  },
  {
    name: "v-1ac4b948",
    path: "/test/test.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1ac4b948").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]
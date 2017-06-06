import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['./../view/main.vue'], resolve)
      },
      meta: {
        title: '还没想好啥子名字'
      }
    }
  ]
})

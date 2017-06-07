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
      },
      children: [
        {
          path: 'music',
          component: function (resolve) {
            require(['./../component/music/music-index.vue'], resolve)
          },
          children: [
            {
              path: 'hot',
              component: function (resolve) {
                require(['./../component/music/music-hot.vue'], resolve)
              }
            },
            {
              path: 'songlist',
              component: function (resolve) {
                require(['./../component/music/music-songlist.vue'], resolve)
              }
            },
            {
              path: 'singerlist',
              component: function (resolve) {
                require(['./../component/music/music-singer.vue'], resolve)
              }
            },
            {
              path: 'musicsearch',
              component: function (resolve) {
                require(['./../component/music/music-search.vue'], resolve)
              }
            }
          ]
        }
      ]
    }
  ]
})

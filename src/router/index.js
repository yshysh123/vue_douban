import Vue from 'vue'
import Router from 'vue-router'
//正在热映
import moveshow from '@/components/moveshow/moveshow'
//即将上映
import movecommingsoon from '@/components/movecommingsoon/movecommingsoon'
//初始页
import main from '@/components/main/main'
//详情页
import movecon from '@/components/movecon/movecon'
//排行
import paihang from '@/components/paihang/paihang'
import paihangcon from '@/components/paihang/paihangcon'
//我的
import login from '@/components/login/login'
import user from '@/components/user/user'
import zhuce from '@/components/zhuce/zhuce'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'moveshow',
      component: moveshow
    },
    {
      path: '/commingsoon',
      name: 'movecommingsoon',
      component: movecommingsoon
    },
    {
      path: '/movecon/:id',
      name: 'movecon',
      component: movecon
    },
    {
      path: '/paihang',
      name: 'paihang',
      component: paihang
    },
    {
  		path: '/paihang/:id',
	    name: 'paihangcon',
	    component: paihangcon
    },
    {
  		path: '/login',
	    name: 'login',
	    component: login
    },
    {
  		path: '/user',
	    name: 'user',
	    component: user
    },
    {
  		path: '/zhuce',
	    name: 'zhuce',
	    component: zhuce
    },
    {
			path: '/home',
			component: main
		}
  ]
})

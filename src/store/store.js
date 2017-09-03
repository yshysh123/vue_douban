import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        login:false,
        loginnum:0,
        loginmessage:[
        	{
        		name:'于偲鸿',
        		passname:'yusihong@163.com',
        		password:'123456',
        		sex:'男',
        		brith:'1991-05-03',
        		phone:13888888888,
        		pic:require('./admin.jpg'),
        	},
        	{
        		name:'咕咕鸿',
        		passname:'389636851@qq.com',
        		password:'123456',
        		sex:'男',
        		brith:'1989-05-03',
        		phone:13888888888,
        		pic:require('./admin2.jpg'),
        	}
        ]
    }
})

export default store

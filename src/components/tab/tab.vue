<template>
  <div id="tab">
    <router-link tag="div" class="tab-item" to="/">
    	<span class="icon iconfont icon-shouye"></span>
      <span>热映</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/paihang">
    	<span class="icon iconfont icon-icon1"></span>
      <span>排行</span>
    </router-link>
    <div class="tab-item" @click="user">
    	<span class="icon iconfont icon-bussinessman"></span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
  export default {
  	data(){
			return {
				login:null
			}
		},
  	methods:{
  		user(){
  			this.login = JSON.parse(localStorage.getItem('DBlogin'))
  			if(this.login){
  				this.$router.push({path: '/user'})
  			}else{
  				this.$router.push({path: '/login'})
  			}
  		}
  	}
  }
</script>

<style>
	@import '../../assets/font/movefont/iconfont.css';
  #tab{
  	position: fixed;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #ccc;
    display: flex;
    height: 1.5rem;
    font-size: 0.7rem;
    background: #fff;
  }
  #tab .tab-item{
  	width: 33%;
  	text-align: center;
  	line-height: 1.5rem;
  }
  #tab .tab-item span{
  	display: inline-block;
  	font-size: 0.7rem;
    color: #000;
  }
</style>

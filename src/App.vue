<template>
  <div id="app">
  	<sousuo></sousuo>
    <router-view></router-view>
    <tab></tab>
    <div id="loading" v-if="show">
  			<img src="./loading.jpg"/>
  	</div>
  </div>
</template>

<script>
	import tab from './components/tab/tab'
	import sousuo from './components/search/search'
	export default {
	  name: 'app',
	  watch: {
	  	"$route": "test"
		},
		methods:{
			test(){
				this.show = true;
				document.body.className ="html-body-overflow";
				setTimeout(()=>{
					this.show = false;
					 document.body.className ="";
				},1000)
			}
		},
		data(){
			return {
				show:false
			}
		},
	  components:{
			tab,
			sousuo
		},
	}
</script>

<style>
@import './assets/css/base.css';
#loading{
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: 100000000;
	background: #fff;
}
#loading img{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	width: 80%;
}
.html-body-overflow
{
	height: 100vh;
  overflow-x:hidden;
  overflow-y:hidden;
}
</style>

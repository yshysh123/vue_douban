<template>
	<div id="topchange">
		<span :class="{'active':hash==='now'}" @click="changenow">正在热映</span>
		<span :class="{'active':hash==='commingsoon'}" @click="changecomming">即将上映</span>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	      	hash:''
	      };
	    },
	    mounted() {
			this.hash = location.hash;
			if(this.hash=='#/'){
				this.hash = 'now';
			}else{
				this.hash = 'commingsoon';
			}
	    },
	    methods: {
	      	changecomming(){
	      		this.$router.push({path: '/commingsoon'})
	      	},
	      	changenow(){
	      		this.$router.push({path: '/'})
	      	}
	    }
  	};
</script>

<style>
	#topchange{
		height: 1.5rem;
		line-height: 1.5rem;
		font-size: 0.65rem;
		width: 80%;
		position: absolute;
		left: 0;
		top: 1.45rem;
		z-index: 10;
		background: #fff;
		padding-left: 10%;
		padding-right: 10%;
		border-bottom: 1px solid #ccc;
	}
	#topchange span{
		display: inline-block;
		width: 49%;
		text-align: center;
	}
	#topchange .active{
		color:#55A532;
		border-bottom-color: #55A532;
	}
</style>
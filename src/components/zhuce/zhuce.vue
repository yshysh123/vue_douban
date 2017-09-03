<template>
	<div id="zhuce">
		<div>
			<input type="text" placeholder="邮箱 / 手机号 / 用户名" v-model="input1"/>
			<input type="text" placeholder="昵称" v-model="input3"/>
		</div>
		<div>
			<input type="password" placeholder="密码" v-model="input2"/>
		</div>
		<h5>
			{{error}}
		</h5>
		<div>
			<button @click="click">注册</button>
		</div>
		<div>使用其他方式登录 找回密码</div>
		<div @click="denglu">已有账号,我要登录</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				input1:'',
				input2:'',
				input3:'',
				error:''
			}
		},
		methods:{
			click(){
				let arr = this.$store.state.loginmessage;
				arr.forEach((e,i)=>{
					if(e.passname==this.input1){
						this.error = '用户名重复'
						return
					}else if(i==arr.length-1){
						this.error = ''
						this.$store.state.loginnum = arr.length;
						let login = {
							passname:this.input1,
							password:this.input2,
							name:this.input3,
							pic:require('./admin3.jpg')
						}
						this.$store.state.loginmessage.push(login)
						localStorage.setItem('DBlogin',JSON.stringify(login))
						this.$router.push({path: '/'})
					}
				})
			},
			denglu(){
				this.$router.push({path: '/login'})
			}
		}	
	}
</script>

<style>
	#zhuce{
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 0.8rem;
		font-size: 0.7rem;
		color: #000;
	}
	#zhuce div:nth-of-type(1){
		margin-top: 0.4rem;
	}
	#zhuce div:nth-of-type(1) input{
		width: 100%;
		height: 1.7rem;
		color: #aaa;
		border: 1px solid #ccc;
		font-size: 0.65rem;
		text-indent: 0.4rem;
	}
	#zhuce div:nth-of-type(2){
		margin-bottom: 0.4rem;
	}
	#zhuce div:nth-of-type(2) input{
		width: 100%;
		height: 1.7rem;
		color: #aaa;
		border: 1px solid #ccc;
		font-size: 0.65rem;
		text-indent: 0.4rem;
	}
	#zhuce div:nth-of-type(3){
		margin-bottom: 0.6rem;
	}
	#zhuce h5{
		color: #DF5000;
		font-size: 0.6rem;
		font-weight: 100;
		text-align: center;
		margin-bottom: 0.4rem;
	}
	#zhuce div:nth-of-type(3) button{
		width: 100%;
		height: 1.7rem;
		color: #fff;
		border: 0;
		background: #17AA52;
		border-radius: 5px;
		font-size: 0.65rem;
		letter-spacing: 0.1rem;
	}
	#zhuce div:nth-of-type(4){
		margin-bottom: 1rem;
		font-size: 0.6rem;
		color: #aaa;
		text-align: center;
	}
	#zhuce div:nth-of-type(5){
		text-align: center;
		font-size: 0.8rem;
		color: #aaa;
	}
</style>
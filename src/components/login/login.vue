<template>
	<div id="login">
		<div>
			<input type="text" placeholder="邮箱 / 手机号 / 用户名" v-model="input1"/>
		</div>
		<div>
			<input type="password" placeholder="密码" v-model="input2"/>
		</div>
		<h5>
			{{error}}
		</h5>
		<div>
			<button @click="click">登录</button>
		</div>
		<div>使用其他方式登录 找回密码</div>
		<div @click="zhuce">注册账号</div>
	</div>
</template>

<script>
	export default {
		mounted(){
			localStorage.removeItem('DBlogin');
		},
		data(){
			return {
				input1:'',
				input2:'',
				error:''
			}
		},
		methods:{
			click(){
				let arr = this.$store.state.loginmessage;
				arr.forEach((e,i)=>{
					if(e.passname==this.input1){
						if(e.password==this.input2){
							this.error = ''
							this.$store.state.loginnum = i;
							let login = {
								name:this.input1,
								password:this.input2,
							}
							localStorage.setItem('DBlogin',JSON.stringify(login))
							this.$router.push({path: '/'})
						}else{
							this.error = '请输入正确的密码'
						}
					}else{
						this.error = '请输入正确的用户名'
					}
				})
			},
			zhuce(){
				this.$router.push({path: '/zhuce'})
			}
		}	
	}
</script>

<style>
	#login{
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 0.8rem;
		font-size: 0.7rem;
		color: #000;
	}
	#login div:nth-of-type(1){
		margin-top: 0.4rem;
	}
	#login div:nth-of-type(1) input{
		width: 100%;
		height: 1.7rem;
		color: #aaa;
		border: 1px solid #ccc;
		font-size: 0.65rem;
		text-indent: 0.4rem;
	}
	#login div:nth-of-type(2){
		margin-bottom: 0.4rem;
	}
	#login div:nth-of-type(2) input{
		width: 100%;
		height: 1.7rem;
		color: #aaa;
		border: 1px solid #ccc;
		font-size: 0.65rem;
		text-indent: 0.4rem;
	}
	#login div:nth-of-type(3){
		margin-bottom: 0.6rem;
	}
	#login h5{
		color: #DF5000;
		font-size: 0.6rem;
		font-weight: 100;
		text-align: center;
		margin-bottom: 0.4rem;
	}
	#login div:nth-of-type(3) button{
		width: 100%;
		height: 1.7rem;
		color: #fff;
		border: 0;
		background: #17AA52;
		border-radius: 5px;
		font-size: 0.65rem;
		letter-spacing: 0.1rem;
	}
	#login div:nth-of-type(4){
		margin-bottom: 1rem;
		font-size: 0.6rem;
		color: #aaa;
		text-align: center;
	}
	#login div:nth-of-type(5){
		text-align: center;
		font-size: 0.8rem;
		color: #aaa;
	}
</style>
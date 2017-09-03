<template>
	<div id="user">
		<div class="user_title">
			<div class="mask">
				<img :src="login.pic"/>
			</div>
			
		</div>
		<div class="name">
			{{login.name}}
			<div class="logout" @click="logout">
				<img src="./logout.png" />
			</div>
			
		</div>
		<div class="like" v-if="look">
			<div class="ilike">我喜欢</div>
			<ul>
				<li v-for="item in firm"  @click="changeMove(item.id)">
					<img :src="item.images"/>
					<div class="right">
						<h3>{{item.title}}</h3>
						<div class="star">
							<span :class="{'active':item.average>=1}">★</span>
							<span :class="{'active':item.average>=3}">★</span>
							<span :class="{'active':item.average>=5}">★</span>
							<span :class="{'active':item.average>=7}">★</span>
							<span :class="{'active':item.average>=9}">★</span>
							<i>{{item.average}}</i>
							<strong>{{item.like}}</strong>
						</div>
						<div class="editor">导演:{{item.name}}</div>
						<ul class="zhuyan">
							<ol>主演:</ol>
							<ol v-for="item2 in item.casts">{{item2.name}} /</ol>
						</ul>
						<div class="see">{{item.see}}<span>人看过</span></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		created(){
			this.index = this.$store.state.loginnum;
			this.login = this.$store.state.loginmessage[this.index];
			if(JSON.parse(localStorage.getItem('DBlogin'))){
    			this.user = JSON.parse(localStorage.getItem('DBlogin')).name;
    		}
			if(JSON.parse(localStorage.getItem('look'))){
				this.look = JSON.parse(localStorage.getItem('look'))
				console.log(this.user)
				if(this.look.thinklook.length){
					this.look.thinklook.forEach(e=>{
						if(this.user==e.user){
							this.firm1.push(e);
						}
					})
				}
				if(this.look.looked.length){
					this.look.looked.forEach(e=>{
						if(this.user==e.user){
							this.firm2.push(e);
						}
					})
				}
				this.firm = this.firm1.concat(this.firm2)
			}
		},
		data(){
			return {
				login:null,
				index:0,
				firm1:[],
				firm2:[],
				look:null,
				firm:[],
				user:''
			}
		},
		methods:{
			changeMove(id){
				this.$router.push({path: '/movecon/'+id})
			},
			logout(){
				this.$router.push({path: '/login'})
			}
		}	
	}
</script>

<style>
	#user{
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}
	#user .user_title{
		padding-top: 1rem;
		height: 6rem;
		background: url(bg.png) no-repeat 100% 100%;
		position: relative;
	}
	#user .user_title .mask{
		background: rgba(0,0,0,0.3);
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}
	#user .user_title img{
		width: 5rem;
		height: 5rem;
		display: block;
		margin: 1rem auto;
		border-radius: 50%;
	}
	#user .name{
		text-align:center;
		line-height: 1.5rem;
		font-size: 0.8rem;
		border-bottom: 1px solid #ccc;
		position: relative;
	}
	#user .logout{
		position: absolute;
		right: 1rem;
		top: 0rem;
		font-size: 0.6rem;
		font-weight: 900;
	}
	#user .logout img{
		width: 1.5rem;
		vertical-align: middle;
	}
	#user .like .ilike{
		line-height: 1.5rem;
		font-size: 0.8rem;
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
	#user .like ul li{
		padding: 0.5rem;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
		color: #777;
	}
	#user .like ul li img{
		float: left;
		width: 4rem;
		margin-right: 1rem;
		box-shadow: 3px 2px 2px #ccc;
		border-radius: 5px;
	}
	#user .like ul li .right{
		float: left;
	}
	#user .like ul li .right h3{
		font-size: 0.75rem;
		line-height: 1.6rem;
		font-weight: 100;
		color: #000;
	}
	#user .like ul li .right .star{
		line-height: 1rem;
		position: relative;
	}
	#user .like ul li .right .star span{
		color: #ccc;
	}
	#user .like ul li .right .star span.active{
		color:orange;
	}
	#user .like ul li .right .star i{
		color: #777;
	}
	#user .like ul li .right .star strong{
		position: absolute;
		right: 1.5rem;
		top: 0rem;
		font-weight: 100;
		border: 1px solid #0086B3;
		border-radius: 5px;
		font-size: 0.8rem;
		padding: 0.2rem;
	}
	#user .like ul li .right .editor{
		line-height: 1rem;
	}
	#user .like ul li .right .zhuyan{
		overflow: hidden;
		width: 9rem;
		margin-bottom: 0.4rem;
	}
	#user .like ul li .right .zhuyan ol{
		padding:0 0.1rem;
		float: left;
	}
</style>
<template>
	<div id="movecon" v-if="moveList">
		<div class="movecon_title">
			<h2>{{moveList.title}}</h2>
			<div class="movecon_title_con">
				<div class="left">
					<div class="star">
						<span :class="{'active':moveList.rating.average>=1}">★</span>
						<span :class="{'active':moveList.rating.average>=3}">★</span>
						<span :class="{'active':moveList.rating.average>=5}">★</span>
						<span :class="{'active':moveList.rating.average>=7}">★</span>
						<span :class="{'active':moveList.rating.average>=9}">★</span>
						<span>{{moveList.rating.average}}</span>
						<span class="see">{{moveList.ratings_count}}<span>评价</span></span>
					</div>
					<div>
						<span>{{moveList.durations[0]}}</span>
						<span>{{moveList.genres[0]}}/</span>
						<span>{{moveList.genres[1]}}/</span>
						<span>{{moveList.genres[2]}}/</span>
						<span>{{moveList.directors[0].name}}(导演)/</span>
						<span>{{moveList.casts[0].name}}/</span>
						<span>{{moveList.casts[1].name}}/</span>
						<span>{{moveList.casts[2].name}}/</span>
						<span>{{moveList.casts[3].name}}/</span>
						<span>{{moveList.mainland_pubdate}}(中国大陆)上映</span>
					</div>
				</div>
				<img :src="moveList.images.large"/>
			</div>
		</div>
		<div class="movecon_see">
			<div @click="thinklook" :class="{'show':thinklookOnf}">想看</div>
			<div @click="looked" :class="{'show':lookedOnf}">看过</div>
		</div>
		<div class="movecon_thu">
			<div>{{moveList.title}}剧情简介</div>
			<div :class="{'seemore':true}">{{moveList.summary}}</div>
		</div>
		<div class="movecon_actor">
			<div class="movecon_actor_title">影人</div>
			<div class="scroll">
				<ul>
					<li>
						<img :src="moveList.directors[0].avatars.small"/>
						<div>{{moveList.directors[0].name}}</div>
						<div>导演</div>
					</li>
					<li v-for="item in moveList.casts">
						<img :src="item.avatars.small"/>
						<div>{{item.name}}</div>
						<div>演员</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="movecon_biaoqian">
			<h4>查看更多豆瓣高分电视剧</h4>
			<ul>
				<li v-for="item in moveList.tags">{{item}}</li>
			</ul>
		</div>
		<div class="movecon_dp">
			<h4>{{moveList.title}}的短评({{moveList.comments_count}})</h4>
			<ul>
				<li v-for="item in moveList.popular_comments">
					<img :src="item.author.avatar"/>
					<div class="right">
						<div>
							<div>{{item.author.name}}</div>
							<span :class="{'active':item.rating.value>=1}">★</span>
							<span :class="{'active':item.rating.value>=2}">★</span>
							<span :class="{'active':item.rating.value>=3}">★</span>
							<span :class="{'active':item.rating.value>=4}">★</span>
							<span :class="{'active':item.rating.value>=5}">★</span>
						</div>
						<div>{{item.created_at}}</div>
						<div>{{item.content}}</div>
						<div>
							<i class="icon iconfont icon-icon"></i>
							 {{item.useful_count}}
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="movecon_yingping">
			<h4>{{moveList.title}}影评({{moveList.comments_count}})</h4>
			<ul>
				<li v-for="item in moveList.popular_reviews.slice(0,5)">
					<div>{{item.title}}</div>
					<div>
						<div>{{item.author.name}}</div>
						<span :class="{'active':item.rating.value>=1}">★</span>
						<span :class="{'active':item.rating.value>=2}">★</span>
						<span :class="{'active':item.rating.value>=3}">★</span>
						<span :class="{'active':item.rating.value>=4}">★</span>
						<span :class="{'active':item.rating.value>=5}">★</span>
					</div>
					<div>{{item.summary}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
			moveList:null,
			movephoto:null,
			hash:0,
			look:{thinklook:[],looked:[]},
			json:null,
			lookedOnf:false,
			thinklookOnf:false,
			user:''
	      };
	    },
	    created() {
	    	this.init();
	    },
	    methods: {
	    	init(){
	    		this.hash = location.hash.split('/')[2];
				this.$ajax.get('/v2/movie/subject/'+this.hash+'?apikey=0b2bdeda43b5688921839c8ecb20399b').then((response) => {
				  	this.moveList = response.data;
//				  	console.log(this.moveList)
					this.json = {
		    			images:this.moveList.images.large,
		    			title:this.moveList.title,
		    			average:this.moveList.rating.average,
		    			name:this.moveList.directors[0].name,
		    			casts:this.moveList.casts,
		    			see:this.moveList.ratings_count,
		    			like:'',
		    			id:this.hash
		    		}
					if(JSON.parse(localStorage.getItem('DBlogin'))){
		    			this.user = JSON.parse(localStorage.getItem('DBlogin')).name;
		    		}
					if(JSON.parse(localStorage.getItem('look'))){
			    		let lookold = JSON.parse(localStorage.getItem('look'))
			    		let onOff =false;
			    		let onOff2 =false;
			    		if(lookold.thinklook.length){
				    		onOff = lookold.thinklook.some(e=>{
				    			return e.title==this.moveList.title&&this.user==e.user;
				    		})
			    		}
			    		if(lookold.looked.length){
				    		onOff2 = lookold.looked.some(e=>{
				    			return e.title==this.moveList.title&&this.user==e.user;
				    		})
			    		}
			    		onOff?this.thinklookOnf=true:this.thinklookOnf=false;
			    		onOff2?this.lookedOnf=true:this.lookedOnf=false;
			    	}
				})
	    	},
	    	savename(){
	    		if(JSON.parse(localStorage.getItem('DBlogin'))){
	    			this.user = JSON.parse(localStorage.getItem('DBlogin')).name;
	    		}else{
	    			this.$router.push({path: '/login'})
	    		}
	    	},
	    	thinklook(){
	    		this.savename();
	    		if(this.user){
		    		if(!this.thinklookOnf){
			    		if(JSON.parse(localStorage.getItem('look'))){
			    			this.look = JSON.parse(localStorage.getItem('look'))
			    			let thinklook = this.look.thinklook;
			    			this.json.like = '想看'
			    			this.json.user = this.user;
			    			thinklook.push(this.json);
			    			this.look.thinklook = thinklook;
			    			localStorage.setItem('look',JSON.stringify(this.look))
			    		}else{
			    			this.json.user = this.user;
			    			this.json.like = '想看'
			    			this.look.thinklook.push(this.json);
			    			localStorage.setItem('look',JSON.stringify(this.look))
			    		}
		    		}else{
		    			this.look = JSON.parse(localStorage.getItem('look'))
		    			this.look.thinklook = this.look.thinklook.filter((e)=>{
		    				return e.title!==this.moveList.title;
		    			})
		    			localStorage.setItem('look',JSON.stringify(this.look))
		    		}
		    		this.thinklookOnf = !this.thinklookOnf;
	    		}
	    	},
	    	looked(){
	    		this.savename();
	    		if(this.user){
		    		if(!this.lookedOnf){
		    			if(JSON.parse(localStorage.getItem('look'))){
			    			this.look = JSON.parse(localStorage.getItem('look'))
			    			let looked = this.look.looked;
			    			this.json.like = '看过';
			    			this.json.user = this.user;
			    			looked.push(this.json);
			    			this.look.looked = looked;
			    			localStorage.setItem('look',JSON.stringify(this.look))
			    		}else{
			    			this.json.like = '看过';
			    			this.json.user = this.user;
			    			this.look.looked.push(this.json);
			    			localStorage.setItem('look',JSON.stringify(this.look))
			    		}
		    		}else{
		    			this.look = JSON.parse(localStorage.getItem('look'))
		    			this.look.looked = this.look.looked.filter((e)=>{
		    				return e.title!==this.moveList.title;
		    			})
		    			localStorage.setItem('look',JSON.stringify(this.look))
		    		}
		    		this.lookedOnf = !this.lookedOnf;
	    		}
	    	}
	    },
	    components: {
	    }
	  };
</script>

<style>
	#movecon{
		margin-top: 1.5rem;
		padding: 0.7rem;
		font-size: 0.6rem;
		margin-bottom: 1.5rem;
	}
	#movecon .movecon_title h2{
		line-height: 1.5rem;
		font-size: 0.9rem;
		font-weight: 100;
	}
	#movecon .movecon_title .movecon_title_con{
		overflow: hidden;
	}
	#movecon .movecon_title .movecon_title_con .left {
		float: left;
		width: 60%;
		padding-right: 10%;
		font-size: 0.6rem;
		line-height: 0.9rem;
	}
	#movecon .movecon_title .movecon_title_con .left .star{
		padding-bottom: 0.5rem;
		padding-top: 0.1rem;
	}
	#movecon .active{
		color:orange;
	}
	#movecon .movecon_title .movecon_title_con img{
		float: left;
		width: 30%;
	}
	#movecon .movecon_see{
		padding-top: 1rem;
		padding-bottom: 0.4rem;
		overflow: hidden;
	}
	#movecon .movecon_see .show{
		background: #ffb712;
		color: #fff;
	}
	#movecon .movecon_see div{
		line-height: 1.2rem;
		width: 47%;
		float: left;
		text-align: center;
		border: 1px solid #ffb712;
		color: #ffb712;
		border-radius: 3px;
	}
	#movecon .movecon_see div:first-of-type{
		margin-right: 4%;
	}
	#movecon .movecon_thu div:first-of-type{
		line-height: 1.5rem;
		color: #aaa;
	}
	#movecon .movecon_thu div:last-of-type{
		line-height: 0.9rem;
	}
	#movecon .movecon_thu div:last-of-type.seemore{
		white-space: normal;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	#movecon .movecon_actor{
		margin-top: 0.8rem;
	}
	#movecon .movecon_actor .movecon_actor_title{
		margin-bottom: 0.4rem;
		color:#aaa;
	}
	#movecon .movecon_actor .scroll{
		overflow-x: scroll;
	}
	#movecon .movecon_actor ul{
		width: 50rem;
	}
	#movecon .movecon_actor ul li{
		float: left;
		width: 3rem;
		font-size: 0.5rem;
		text-align: center;
	}
	#movecon .movecon_actor ul li div{
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
	}
	#movecon .movecon_biaoqian h4{
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
		line-height: 1.2rem;
		font-weight: 100;
		color:#aaa;
	}
	#movecon .movecon_biaoqian ul{
		overflow: hidden;
	}
	#movecon .movecon_biaoqian ul li{
		float: left;
		background: #f5f5f5;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		line-height: 1.2rem;
		border-radius: 30%;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		margin-bottom: 0.3rem;
	}
	#movecon .movecon_dp{
		
	}
	#movecon .movecon_dp h4{
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
		line-height: 1.2rem;
		font-weight: 100;
		color:#aaa;
	}
	#movecon .movecon_dp ul li{
		overflow: hidden;
		margin-bottom: 0.5rem;
	}
	#movecon .movecon_dp ul li img{
		width: 10%;
		float: left;
		border-radius: 50%;
	}
	#movecon .movecon_dp ul li .right{
		width: 87%;
		float: left;
		padding-left: 3%;
	}
	#movecon .movecon_dp ul li .right div:first-of-type{
		margin-bottom: 0.1rem;
	}
	#movecon .movecon_dp ul li .right div:first-of-type div{
		display: inline-block;
		font-weight: 900;
		margin-right: 0.1rem;
	}
	#movecon .movecon_dp ul li .right div:first-of-type span{
		color: #ccc;
		display: inline-block;
		width: 0.4rem;
	}
	#movecon .movecon_dp ul li .right div:first-of-type span.active{
		color: orange;
	}
	#movecon .movecon_dp ul li .right div:nth-of-type(2){
		margin-bottom: 0.2rem;
		font-size: 0.5rem;
		color: #aaa;
	}
	#movecon .movecon_dp ul li .right div:nth-of-type(3){
		margin-bottom: 0.2rem;
		font-size: 0.55rem;
		line-height: 0.8rem;
	}
	#movecon .movecon_dp ul li .right div:nth-of-type(4){
		margin-bottom: 0.1rem;
		font-size: 0.5rem;
		color: #aaa;
	}
	#movecon .movecon_yingping h4{
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
		line-height: 1.2rem;
		font-weight: 100;
		color:#aaa;
	}
	#movecon .movecon_yingping ul li{
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
	}
	#movecon .movecon_yingping ul li div:first-of-type{
		margin-bottom: 0.3rem;
	}
	#movecon .movecon_yingping ul li div:nth-of-type(2){
		margin-bottom: 0.3rem;
	}
	#movecon .movecon_yingping ul li div:nth-of-type(2) div{
		display: inline-block;
		font-size: 0.45rem;
	}
	#movecon .movecon_yingping ul li div:nth-of-type(2) span{
		color: #ccc;
		display: inline-block;
		width: 0.4rem;
	}
	#movecon .movecon_yingping ul li div:nth-of-type(2) span.active{
		color:orange;
	}
	#movecon .movecon_yingping ul li div:nth-of-type(3){
		margin-bottom: 0.3rem;
		color: #aaa;
		font-size: 0.4rem;
		line-height: 0.6rem;
	}
</style>
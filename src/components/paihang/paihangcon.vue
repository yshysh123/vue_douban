<template>
	<div id="paihangcon" v-if="moveList.length">
		<div class="backtotop" @click="backtotop">
			<img src="static/imgs/backtop.png"/>
		</div>
		<ul>
			<scroller 
				style="top:1.8rem"
				ref="myscroller"
				:on-refresh="refresh"
		        :on-infinite="infinite"
	    	>
				<li v-for="item in moveList" @click="changeMove(item.id)">
					<img :src="item.images.large"/>
					<div class="right">
						<h3>{{item.title}}</h3>
						<div class="star">
							<span :class="{'active':item.rating.average>=1}">★</span>
							<span :class="{'active':item.rating.average>=3}">★</span>
							<span :class="{'active':item.rating.average>=5}">★</span>
							<span :class="{'active':item.rating.average>=7}">★</span>
							<span :class="{'active':item.rating.average>=9}">★</span>
							<i>{{item.rating.average}}</i>
						</div>
						<div class="editor">导演:{{item.directors[0].name}}</div>
						<ul class="zhuyan">
							<ol>主演:</ol>
							<ol v-for="item2 in item.casts">{{item2.name}} /</ol>
						</ul>
						<div class="see">{{item.collect_count}}<span>人看过</span></div>
					</div>
				</li>
			</scroller>
		</ul>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueScroller from 'vue-scroller'
	Vue.use(VueScroller)
	export default {
	    data() {
	      return {
			moveList:[],
			num:0,
			totle:0,
			hash:''
	      };
	    },
	    mounted() {
	    	this.hash = location.hash.split('/')[2];
	    	if(this.hash=='top250'||this.hash=='new_movies'){
	    		this.$ajax.get('/v2/movie/'+this.hash+'?start=0&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b').then((response) => {
					this.num+=5;
					this.totle= response.data.total;
				  	this.moveList = response.data.subjects;
				})
	    	}else{
	    		this.$ajax.get('/v2/movie/'+this.hash+'?start=0&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b').then((response) => {
					this.num+=5;
					this.totle= response.data.total;
			  		response.data.subjects.forEach(e=>{
			  			this.moveList.push(e.subject)
			  		})
				})
	    	}
	    },
	    methods: {
	    	refresh(done) {
		        setTimeout(() => {
					done()
		        }, 1500)
		    },
		    infinite(done){
		    	if(this.hash=='top250'){
			        setTimeout(() => {
			        	if(this.num>=this.totle){
			        		done(true)
			        	}
			        	else{
			        		this.$ajax.get('/v2/movie/'+this.hash+'?start='+this.num+'&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b').then((response)=>{
								this.num+=5;
								for(var i=0;i<response.data.subjects.length;i++){
									this.moveList.push(response.data.subjects[i])
								}
				            done()
				        	})
			        	}
			        }, 1500)
		        }else{
		        	done(true)
		        }
		    },
		    changeMove(id){
		    	this.$router.push({path: '/movecon/'+id})
		    },
		    backtotop(){
		    	let num = document.body.scrollTop;
		    	let timer = setInterval(()=>{
		    		num-=40;
		    		document.getElementsByTagName('body')[0].scrollTop = num;
		    		if(num<=0){
		    			clearInterval(timer)
		    		}
		    	},20)
		    }
	    },
	    components: {
	    }
	};
</script>

<style>
	#paihangcon{
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 0.8rem;
	}
	#paihangcon ul li{
		padding: 0.5rem;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
		color: #777;
	}
	#paihangcon ul li img{
		float: left;
		width: 4rem;
		margin-right: 1rem;
		box-shadow: 3px 2px 2px #ccc;
		border-radius: 5px;
	}
	#paihangcon ul li .right{
		float: left;
	}
	#paihangcon ul li .right h3{
		font-size: 0.75rem;
		line-height: 1.6rem;
		font-weight: 100;
		color: #000;
	}
	#paihangcon ul li .right .star{
		line-height: 1rem;
	}
	#paihangcon ul li .right .star span{
		color: #ccc;
	}
	#paihangcon ul li .right .star span.active{
		color:orange;
	}
	#paihangcon ul li .right .star i{
		color: #777;
	}
	#paihangcon ul li .right .editor{
		line-height: 1rem;
	}
	#paihangcon ul li .right .zhuyan{
		overflow: hidden;
		width: 9rem;
		margin-bottom: 0.4rem;
	}
	#paihangcon ul li .right .zhuyan ol{
		padding:0 0.1rem;
		float: left;
		
	}
	#paihangcon ul li .right .see{
		
	}
</style>
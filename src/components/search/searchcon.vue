<template>
  <div id="searchcon" v-if="moveList.length">
  	<topchange></topchange>
		<ul>
			<scroller
				style="top:1.5rem"
				ref="myscroller"
		        :on-refresh="refresh"
		        :on-infinite="infinite"
		    	>
				<li v-for="item in moveList"  @click="changeMove(item.id)">
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
	import topchange from '../topchange/topchange'
	export default {
    data() {
      return {
				moveList:[],
				num:0,
				totle:0
      };
    },
    mounted() {
			this.$ajax.get('/v2/movie/coming_soon?start=0&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b').then((response) => {
				this.num+=5;
				this.totle= response.data.total;
			  this.moveList = response.data.subjects;
			})
    },
    methods: {
      refresh(done) {
        setTimeout(() => {
	      	this.moveList.sort(()=>{
	      		return Math.random() >= 0.5 ? 1 : -1;
	      	})
					done()
        }, 1500)
	    },
	    infinite(done){
        setTimeout(() => {
        	if(this.num>=this.totle){
        		done(true)
        	}
        	else{
        		this.$ajax.get('/v2/movie/coming_soon?start='+this.num+'&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b').then((response)=>{
					this.num+=5;
					for(var i=0;i<response.data.subjects.length;i++){
						this.moveList.push(response.data.subjects[i])
					}
	            done()
	        	})
        	}
        }, 1500)
	    },
	    changeMove(id){
	    	this.$router.push({path: '/movecon/'+id})
	    }
    },
    components: {
    	topchange
    }
  };
</script>

<style>
	#searchcon ul li{
		padding: 0.5rem;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
		color: #777;
	}
	#searchcon ul li img{
		float: left;
		width: 4rem;
		margin-right: 1rem;
		box-shadow: 3px 2px 2px #ccc;
		border-radius: 5px;
	}
	#searchcon ul li .right{
		float: left;
	}
	#searchcon ul li .right h3{
		font-size: 0.75rem;
		line-height: 1.6rem;
		font-weight: 100;
		color: #000;
	}
	#searchcon ul li .right .star{
		line-height: 1rem;
	}
	#searchcon ul li .right .star span{
		color: #ccc;
	}
	#searchcon ul li .right .star span.active{
		color:orange;
	}
	#searchcon ul li .right .star i{
		color: #777;
	}
	#searchcon ul li .right .editor{
		line-height: 1rem;
	}
	#searchcon ul li .right .zhuyan{
		overflow: hidden;
		width: 9rem;
		margin-bottom: 0.4rem;
	}
	#searchcon ul li .right .zhuyan ol{
		padding:0 0.1rem;
		float: left;
	}
</style>
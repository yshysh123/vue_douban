<template>
	<div id="rank">
		<h2>精选榜单</h2>
		<ul>
			<li v-for="item in list" @click="changerank(item.path)">
				<div class="left">
					<h3>{{item.title}}</h3>
					<p>{{item.news}}</p>
				</div>
				<div class="right">
					<img :src="item2" v-for="item2 in item.imgs"/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	      	list:[
	      		{
	      			title:'豆瓣 Top250',
	      			news:'8分以上好电影',
	      			imgs:[
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p1910813120.jpg',
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p480747492.jpg',
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p511118051.jpg'
	      			],
	      			path:'top250'
	      		},
	      		{
	      			title:'口碑榜',
	      			news:'最受欢迎的好电影',
	      			imgs:[
	      				'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2473041989.jpg',
	      				'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2455368577.jpg',
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2416009294.jpg'
	      			],
	      			path:'weekly'
	      		},
	      		{
	      			title:'新片榜',
	      			news:'最新上映的高分大片',
	      			imgs:[
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2496901482.jpg',
	      				'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2496940327.jpg',
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2497235921.jpg'
	      			],
	      			path:'new_movies'
	      		},
	      		{
	      			title:'北美票房榜',
	      			news:'票房最高排名',
	      			imgs:[
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2492792540.jpg',
	      				'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494647817.jpg',
	      				'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2462744662.jpg'
	      			],
	      			path:'us_box'
	      		}
	      	]
	      };
	    },
	    mounted() {

	    },
	    methods: {
			changerank(path){
				this.$router.push({path:'/paihang/'+path})
			}
	    }
  	};
</script>

<style>
	#rank{
		margin-top: 1rem;
		padding: 0.8rem;
		margin-bottom: 1rem;
	}
	#rank h2{
		line-height: 1.5rem;
		font-weight: 100;
	}
	#rank ul li{
		margin-bottom: 0.6rem;
		overflow: hidden;
		border-radius: 10px;
		height: 5.5rem;
	}
	#rank ul li:first-of-type{
		background:linear-gradient(#e1a708, #efd491);
	}
	#rank ul li:nth-of-type(2){
		background:linear-gradient(#32c05e, #a1e5be);
	}
	#rank ul li:nth-of-type(3){
		background:linear-gradient(#a361c3, #d9b9e8);
	}
	#rank ul li:nth-of-type(4){
		background:linear-gradient(#dd7286, #f3b9c5);
	}
	#rank ul li .left{
		width: 40%;
		height: 100%;
		padding-top: 1.8rem;
	}
	#rank ul li .left h3{
		font-weight: 100;
		font-size: 0.8rem;
		color: #fff;
		text-align: center;
	}
	#rank ul li .left p{
		font-size: 0.5rem;
		color: #fff;
		text-align: center;
	}
	#rank ul li .right{
		width: 60%;
		padding-top: 0.75rem;
	}
	#rank ul li .right img{
		width: 2.5rem;
		height: 3.5rem;
	}
	#rank ul li .right img:nth-of-type(2){
		width: 2.7rem;
		height:3.9rem;
		margin-bottom: -0.15rem;
	}
</style>
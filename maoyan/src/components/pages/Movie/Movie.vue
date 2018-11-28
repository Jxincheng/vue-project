<template>
	<div class="movie">
		<div class="movie_nav">
			<div class="city" @click="toCity">
				<span>{{cityname}}</span>
				<i class="fa fa-caret-down" aria-hidden="true"></i>
			</div>
			<ul>
				<li v-for="(item,index) in navlist" :class='selInit[0]==item.path[0]?"border_color":""' @click="toggle(item.title,item.path)">{{item.title}}</li>

			</ul>
			<div class="search" @click="goPage()"><i class="fa fa-search" aria-hidden="true"></i></div>
		</div>
		<MovieList v-if="name=='正在热映'" :path="selInit"></MovieList>
		<MovieListMore v-if="name=='即将上映'" :path="selInit"></MovieListMore>
	</div>
</template>

<script>
import MovieList from './MovieList.vue'
import MovieListMore from './MovieListMore.vue'
export default{
	name:'Movie',
	components:{
		MovieList,MovieListMore
	},
	data(){
		return{
			navlist:[{title:'正在热映',path:['movieOnInfoList','moreComingList']},{title:'即将上映',path:['mostExpected','comingList','moreComingList']}],
			name:'正在热映',
			selInit:['movieOnInfoList','moreComingList'],
			city:'广州'
		}
	},
	methods:{
		toggle(name,val){
			this.name=name;
			this.selInit=val;
		},
		toCity(){
			// this.$router.push({name:'city-list',params:{path:'/movie'}});
			this.$router.push('/city-list');
		},
		goPage(){            
        	this.$router.push({path:'/toseach',query: { searchtype:'movie' }})       
      	},
		toPath(){
			this.$store.commit('setPaths','/movie');
		},
		setTitle(){
			let storage=window.localStorage;
			storage.setItem("title","猫眼电影");
		}
	},
	computed:{
		cityname(){
			let storage=window.localStorage;
      		this.city=storage.getItem("city");
			return this.city;
		}
	},
	created(){
		this.toPath();
		// this.$emit('content','猫眼电影');
		this.setTitle();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.movie{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	.padding(51.5,0,0,0);
	.movie_nav{
		border-bottom: 1px solid #e6e6e6;
		.h(44);
		display: flex;
		align-items: center;
		justify-content: space-between;
		.city{
			.padding(0,0,0,15);
			.fs(15);
    		color: #666;
		}
		ul{
			.h(44);
			.lh(44);
			display: flex;
			justify-content: center;
			li{
				.w(80);
				// .h(44);
				.fs(15);
				font-weight: 700;
				text-align:center;
				margin: 0 12px;
			}
			.border_color{
				color: red;
				border-bottom: 1px solid red;
			}
		}
		.search{
			.padding(9,15,9,10);
			color: red;
			.fs(20);
		}
	}
}
</style>
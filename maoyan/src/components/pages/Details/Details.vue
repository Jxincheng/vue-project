<template>
	<div class="details">
		<a @click="back()"><i></i></a>
		<div class="movie_det" v-for="(item,index) in detail" :key="index">
			<div class="movie-filter"></div>
			<img class="poster-bg" :src="item.img|getImg3">
			<img class="movie-img" :src="item.img|getImg3">
			<div class="content">
				<p class="title line">{{item.nm}}</p>
				<p class="title-na line">{{item.enm}}</p>
				<div>
					<p class="score line" v-if="item.globalReleased" :class='item.sc==0?"hide":""'>{{item.sc|getSc}} <span class="snum">({{item.snum|getSnum}}万人评)</span></p>
					<p class="score line" v-if="item.globalReleased" :class='item.sc==0?"":"hide"'><span class="snum">暂无评分</span></p>				
					<p class="score line" :class='item.globalReleased?"hide":""'><span style="font-size: 14px;">{{item.wish}}人想看</span></p>
				</div>
				<p class="type line"><span>{{item.cat}} </span><span class="type-group"><img :class='item.version=="v3d imax"?"":"hide"' src="../../../assets/3DIMAX1.png"><img :class='item.version=="v2d imax"?"imgI":"hide"' src="../../../assets/IMAX.png"></span></p>
				<p class="src line">{{item.src}}/{{item.dur}}分钟</p>
				<p class="pubDesc line">{{item.pubDesc}}</p>
			</div>
			<div class="arrow" @click="todetails2"><img src="../../../assets/arrow.png"></div>
		</div>
	</div>
</template>

<script>
export default{
	name:'Details',
	data(){
		return{
			detail:[],
			title:''
		}
	},
	methods:{
		getData(){									
			this.$axios.get('/api/ajax/detailmovie',{params:{
				movieId:this.$route.params.movieId
				}
			})
			.then((res)=>{
				this.detail=res.data;
				this.title=res.data.detailMovie.nm;				
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		back(){
			this.$router.go(-1);
		},
		todetails2(){
			this.$router.push(`/movie/${this.$route.params.movieId}`);
		}
		// setTitle(){
		// 	let storage=window.localStorage;
		// 	storage.setItem("title",this.title);
		// }
	},
	watch:{
		path:function(newVal,oldVal){
			this.detail=[];
			this.getData();
		}
	},
	created(){
		this.getData();
		// this.setTitle();		
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.details{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	margin-top: 51.5px;
	.h(615.5);
	background-color: #fff;
	a{
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		.w(22.5);
		.h(51.5);
		.lh(51.5);
		.padding(0,15,0,15);
		i{
			vertical-align: middle;
			position: relative;
			display: inline-block;
			font-style: normal;
			.w(22.5);
			.h(22.5);
		}
		i:before{
			content: '';
		    display: block;
		    position: absolute;
		    top: 0;
		    .w(16);
		    .h(16);
		    border-bottom: 2px solid #fff;
		    border-left: 2px solid #fff;
		    transform: rotateZ(45deg);
		}
	}
	.movie_det{
		.w(375);
		.h(188);
		.padding(19,30,19,15);
		box-sizing: border-box;
		display: flex;
		position: relative;
		.movie-filter{
			position: absolute;
		    z-index: -1;
		    width: 100%;
		    height: 100%;
		    background-color: #333;
		    top: 0;
		    left: 0;
		}
		.poster-bg{
			width: 100%;
		    height: 100%;
		    z-index: -1;
		    overflow: hidden;
		    position: absolute;
		    filter: blur(1.2rem);
		    background-size: cover;
		    background-repeat: no-repeat;
		    opacity: .55;
		    top: 0;
		    left: 0;
		}
		.movie-img{
			.w(110);
			.h(150);
		}
		.hide{display: none;}
		.content{
			margin-left: 12.5px;
			flex: 1;
			color: #fff;
			line-height: 1;
			overflow-x: hidden;
			.line{
				overflow: hidden;
				text-overflow: ellipsis;
    			white-space: nowrap;
			}
			.title{
				.fs(20);
				margin-top: 2px;
				font-weight: 700;
				overflow: hidden;
			}
			.title-na{
				.fs(12);
				margin-top: 10px;
				opacity: .8;
			}
			.score{
				.fs(18);
				font-weight: 700;
				color: #fc0;
				margin-top: 11px;
				.snum{
					.fs(12);
					color: #fff;
					margin-top: 10px;
				}
			}
			.type,.src,.pubDesc{
				.fs(12);
				margin-top: 10px;
				opacity: .8;
			}
			.type{
				span{vertical-align: top;}
				.type-group{
					display: inline-block;
					.w(42);
					img{.w(42);}
					.imgI{.w(26);}
				}
			}
		}
		.arrow{
			position: absolute;
			.w(10);
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			img{width: 100%;}
		}
	}
}
</style>
<template>
	<ul class="movielist"
	v-infinite-scroll="loadMore"
	infinite-scroll-disabled="loading"
	infinite-scroll-distance="50">
		<li class="li1" v-for="(item,index) in movielist" :key="index" @click="detail(index,item.nm)">
			<img class="img1" :src="item.img|getImg">
			<div class="contain">
				<div class="left">
					<div class="nm line">
						<p class="p1 line">{{item.nm}}</p>
						<p :class='item.version==""?"hide":""'>
							<img :class='item.version=="v3d imax"?"":"hide"' src="../../../assets/3DIMAX.png">
							<img :class='item.version=="v3d"?"imgc":"hide"' src="../../../assets/3D.png">
							<img :class='item.version=="v2d imax"?"":"hide"' src="../../../assets/2DIMAX.png">
						</p>
					</div>
					<div class="sc line">
						<p v-if="item.globalReleased" :class='item.sc==0?"hide":""'>观众评 <span>{{item.sc}}</span></p>
						<p v-if="item.globalReleased" :class='item.sc==0?"":"hide"'>暂无评分</p>
						<p :class='item.globalReleased?"hide":""'><span>{{item.wish}}</span> 人想看</p>
					</div>
					<p class="star line">主演: {{item.star}}</p>
					<p class="info line">{{item.showInfo}}</p>
				</div>
				<div class="right">
					<p :class='item.globalReleased?"":"hide"'>购票</p>
					<p :class='item.globalReleased?"hide":""'>预售</p>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
export default{
	name:'MovieList',
	components:{},
	props:['path'],
	data(){
		return{
			movielist:[],
			movieIds:[],
			loading:false,
			current:0,
			total:12,
			Ids:''
		}
	},
	methods:{
		loadMore(){
			if(this.movielist.length==0){
				this.getData();
			}else{
				this.getData2();
			}
		},					
		getData(){									
			this.$axios.get(`/api/ajax/${this.path[0]}`,{params:{
				token:''
				}
			})
			.then((res)=>{
				this.movielist=res.data.movieList;
				this.movieIds=res.data.movieIds;
				this.current=this.movielist.length;
				this.total=this.movieIds.length;
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		getData2(){
			if(this.current==this.total){
				Toast({
					message:'已经到底了',
					position:'bottom',
					duration:1000
				});
				return false;
			}
			let toast = Toast({
				message: '数据加载ing',
				iconClass: "fa fa-cog fa-spin",
				duration: -1
			});
			this.loading=true
			this.Ids+=this.movieIds[this.current];
			if((this.total-this.current)>10){
				for(let i=1;i<10;i++){
					this.Ids+=","+this.movieIds[this.current+i];
				}
			}else{
				for(let i=1;i<this.total-this.current;i++){
					this.Ids+=","+this.movieIds[this.current+i];
				}
			}			
			this.$axios.get(`/api/ajax/${this.path[1]}`,{params:{
				token:'',
				movieIds:this.Ids
				}
			})
			.then((res)=>{
				this.movielist=this.movielist.concat(res.data.coming);
				toast.close();
				this.loading=false
				this.current=this.movielist.length;
				this.Ids='';
			})
			.catch((err)=>{
				toast.close();
				this.loading=false
				console.log(err);
			})
		},
		detail(id,nm){
			this.$router.push(`/cinema/movie/${this.movieIds[id]}`);
			let storage=window.localStorage;
			storage.setItem("title",nm);
		}
	},
	watch:{
		path:function(newVal,oldVal){
			this.current=0;
			this.movielist=[];
			this.movieIds=[];
			this.getData();
		}
	},
	created(){
		//this.getData();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.movielist{
	.w(375);
	.h(522);
	overflow: auto;
	.li1{
		.w(358);
		.padding(0,0,0,15);
		box-sizing: border-box;
		.img1{
			.w(64);
			.h(90);
			margin-top: 12px;
			float: left;
		}
		.contain{
			.padding(12,12,12,0);
			margin-left: 74px;
			border-bottom: 1px solid #e6e6e6;
			.h(89);
			.left{
				float: left;
				.w(207);
				.padding(0,3,0,0);
				overflow: hidden;
				.nm{
					.fs(17);
					color: #333;
					font-weight: 700;
					margin-bottom: 5px;
					display: flex;
					.p1{
						.padding(0,5,0,0);
					}
					p:nth-child(2){
						.w(43);
						.h(14);
						.fs(12);
						font-weight: normal;
						margin-top: 5px;
						img{
							width: 43px;
							height: 14px;
						}
						.imgc{
							width: 17px;
						}
					}					
				}
				.sc,.star,.info{
					.fs(13);
					color: #666;
				}
				.sc{
					span{
						.fs(15);
						font-weight: 700;
						color: #faaf00;
					}
				}
				.star{
					margin-top: 4px;
				}
				.info{
					margin-top: 4px;
				}
				.line{
					text-overflow: ellipsis;
    				overflow: hidden;
    				white-space: nowrap;
				}				
			}
			.hide{
				display: none;
			}
			.right{
				float: right;
				margin-top: 31px;
				p{
					.w(47);
					.h(27);
					.lh(28);
					text-align: center;
					background-color: #f03d37;
					color: #fff;
					border-radius: 4px;
					.fs(12);
				}
				p:nth-child(2){
					background-color: #3c9fe6;
				}
			}
		}
	}
}
.movielist::-webkit-scrollbar{
	display: none;
}
</style>
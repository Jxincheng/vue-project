<template>
	<div class="movielistmore"
	v-infinite-scroll="loadMore"
	infinite-scroll-disabled="loading" 
	infinite-scroll-distance="50">
	<!--infinite-scroll-disabled  等于true时代表正在执行加载，这时禁用滚动触发 -->
	<!--infinite-scroll-distance  指定滚动条距离底部多高时触发v-infinite-scroll指向的方法 -->
		<div class="list">
			<div class="top_list" >
				<p class="title">近期最受期待</p>
				<div class="most_list"
				v-infinite-scroll="loadMore2"
				>
					<div class="m_item" v-for="(item,index) in toplist" :key="index">
						<div class="img_bg">
							<img :src="item.img|getImg2">
							<span class="wish"><span class="wish_num">{{item.wish}}</span>人想看</span>
							<div class="toggle_wish"><img src="../../../assets/xin.png"></div>
						</div>
						<h5>{{item.nm}}</h5>
						<p>{{item.comingTitle|getDates}}</p>
					</div>				
				</div>
			</div>
			<div class="coming_list">
				<div v-for="(item,index) in cominglist" :key="index">
					<p v-if="item.comingTitle!=Dates[index]" class="days">{{item.comingTitle}}</p>
					<div class="item">
						<img class="img1" :src="item.img|getImg2">
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
									<p><span>{{item.wish}}</span> 人想看</p>
								</div>
								<p class="star line">主演: {{item.star}}</p>
								<p class="info line">{{item.rt}}上映</p>
							</div>
							<div class="right">
								<p v-if="item.showInfo">预售</p>
								<p v-if="!item.showInfo" style="background-color: #faaf00;">想看</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
export default{
	name:'MovieListMore',
	props:['path'],
	data(){
		return{
			toplist:[],
			current:0,
			total:10,
			loading:false,

			cominglist:[],
			movieIds:[],
			Ids:'',			
			current2:0,
			total2:0,
			Dates:[''],			
		}
	},
	methods:{
		loadMore(){
			if(this.cominglist.length==0){
				this.getData2();
			}else{
				this.getMoreData2();
			}
		},
		loadMore2(){
			this.getData();
		},
		getData(){//ci=20&limit=10&offset=0&token=	
			if(this.current==this.total){
				return false;
			}
			this.$axios.get(`/api/ajax/${this.path[0]}`,{params:{
				ci:20,
				limit:10,
				offset:this.current,
				token:''
				}
			})
			.then((res)=>{
				this.toplist=this.toplist.concat(res.data.coming);
				this.current=this.toplist.length;
				this.total=res.data.paging.total;
				if(res.data.coming==''){
					this.current=this.total;
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		getData2(){
			this.$axios.get(`/api/ajax/${this.path[1]}`,{params:{
				ci:20,
				token:'',
				limit:10			
				}
			})
			.then((res)=>{
				this.cominglist=res.data.coming;
				this.movieIds=res.data.movieIds;
				this.current2=this.cominglist.length;
				this.total2=this.movieIds.length;
				this.getDates();
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		getMoreData2(){
			if(this.current2==this.total2){
				Toast({
					message:'已经到底了',
					position:'bottom',
					duration:1000
				});
				return false;
			}
			let toast = Toast({
				message: '数据加载中...',
				iconClass: "fa fa-spinner",
				duration: -1
			});
			this.loading=true
			this.Ids+=this.movieIds[this.current2];
			if((this.total2-this.current2)>10){
				for(let i=1;i<10;i++){
					this.Ids+=","+this.movieIds[this.current2+i];
				}
			}else{
				for(let i=1;i<this.total2-this.current2;i++){
					this.Ids+=","+this.movieIds[this.current2+i];
				}
			}
			this.$axios.get(`/api/ajax/${this.path[2]}`,{params:{
				ci:20,
				token:'',
				limit:10,
				movieIds:this.Ids			
				}
			})
			.then((res)=>{
				this.cominglist=this.cominglist.concat(res.data.coming);
				toast.close();
				this.loading=false				
				this.current2=this.cominglist.length;
				this.Ids='';
				this.getDates();
				if(res.data.coming==''){
					this.current2=this.total2;
				}
			})
			.catch((err)=>{
				toast.close();
				this.loading=false;
				console.log(err);
			})
		},
		getDates(){
			for(let i=0;i<this.cominglist.length;i++){
				this.Dates[i+1]=this.cominglist[i].comingTitle;
			}
		}
	},
	created(){
		//this.getData();
		//this.getData2();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.movielistmore{
	.w(375);
	.h(522);
	overflow: auto;
	.list{
		.w(358);
		.top_list{
			.padding(12,0,12,15);
			margin-bottom: 10px;
			.title{
				margin-bottom: 12px;
				color: #333;
			}
			.most_list{
				overflow-x: auto;
				white-space: nowrap;
				.m_item{
					display: inline-block;
					.w(85);
					margin-right: 15px;
					.img_bg{
						.w(85);
						.h(115);
						position: relative;
						margin-bottom: 6px;
						img{.w(85);.h(115);}
						.wish{
							position:absolute;
							left: 4px;
							bottom: 2px;
							color: #faaf00;
	    					.fs(11);
	    					font-weight: 600;
						}
						.toggle_wish{
							.w(28);
						    .lh(28);
						    background: rgba(61,63,71,.6);
						    text-align: center;
						    border-bottom-right-radius: 10px;
						    position: absolute;
						    top: 0;
						    left: 0;
						    img{.w(10);.h(10);}
						}
					}
					h5{
						.fs(13);
						color: #222;
						margin-bottom: 3px;
						text-overflow: ellipsis;
		    			overflow: hidden;
		    			white-space: nowrap;
					}
					p{
						.fs(12);
						color: #999;
					}
				}
				
			}
			.most_list::-webkit-scrollbar{
				display: none;
			}
		}
		.coming_list{
			// .w(358);
			.days{
				.padding(12,15,0,15);
				color: #333;
			}
			.item{
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
							background-color: #3c9fe6;
							color: #fff;
							border-radius: 4px;
							.fs(12);
						}
					}
				}
			}
		}
	}
}
.movielistmore::-webkit-scrollbar{
	display: none;
}
</style>
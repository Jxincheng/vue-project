<template>
	<div class="citylist">
		<div class="list">
			<div v-for="(item,index) in citylist" :key="index" @click="city(item.nm)">{{item.nm}}</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'CityList',
	data(){
		return{
			citylist:[]
		}
	},
	methods:{
		getData(){	//dianying/cities.json								
			this.$axios.get('/api/dianying/cities.json',{params:{
				}
			})
			.then((res)=>{
				this.citylist=res.data.cts;
			})
			.catch((res)=>{
				console.log(res);
			})
		},
		city(val){
			let storage=window.localStorage;
			storage.setItem("city",val);
			// this.$store.commit('setName',val);
			this.$router.back(-1);  //返回上一页
			// this.$router.push(this.$route.params.path);
		}
	},
	created(){
		this.getData();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.citylist{
	.w(375);
	.h(667);
	position: relative;
	background-color: #ebebeb;
	z-index: 3;
	overflow: auto;
	.list{
		div{
			.h(44);
		    .lh(44);
		    margin-left: 15px;
		    border-bottom: 1px solid #c8c7cc;
		}
	}
}
</style>
<template>
	<div class="cinema">
		这是cinema页面
		{{cityname}}
	</div>
</template>

<script>
export default{
	name:'Cinema',
	methods:{
		toPath(){
			this.$store.commit('setPaths','/cinema');
		},
		setTitle(){
			let storage=window.localStorage;
			storage.setItem("title","影院");
		}
	},
	computed:{
		cityname(){
			let storage=window.localStorage;
      		let city=storage.getItem("city");
			return city;
		}
	},
	created(){
		this.toPath();
		// this.$emit('content','影院');
		this.setTitle();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.cinema{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	.padding(51.5,0,0,0);
}
</style>
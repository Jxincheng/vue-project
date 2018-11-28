<template>
	<div class="header">
		<h1 class="contain">{{name}}</h1>
	</div>
</template>

<script>
export default{
	name:'Header',
	props:['name']
}
</script>

<style lang="less" scoped>
@import url('../../styles/main.less');
.header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	.w(375);
	// .h(50.5);
	height: 50.5px;
	color: #fff;
    background: #e54847;
    border-bottom: 1px solid #e54847;
    .contain{
    	.fs(18);
    	font-weight: 400;
    	text-align: center;
    	.lh(50);
    }
}
</style>
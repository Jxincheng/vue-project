<template>
	<div class="footer">
        <div v-for="(item,index) in navlist" :key="index" v-on:click="goPage(item.path)" :class='selPath==item.path?"red":""'>
            <i :class="item.icon" aria-hidden="true"></i>
            <span>{{item.name}}</span>
        </div>
	</div>
</template>

<script>
export default{
	name:'Footer',
    data(){
        return{
            navlist:[{title:'猫眼电影',name:'电影',path:'/movie',icon:'fa fa-film'},{title:'影院',name:'影院',path:'/cinema',icon:'fa fa-video-camera'},{title:'猫眼电影',name:'我的',path:'/account',icon:'fa fa-user-o'}]
        }
    },
    methods:{
        goPage(path){
            this.$router.push(path)
        }
    },
    computed:{
        selPath(){
            return this.$store.state.paths;
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../styles/main.less');
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
	.w(375);
	// .h(48);
    height: 48px;
    background: #fff;
    border-top: .5px solid #d8d8d8;
    display: flex;
    justify-content: space-around;
    div{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
        .w(25);
        .h(48);
        text-align: center;       
        i{
            .fs(22);
        }       
    }
    .red{
        color: red;
    }
}
</style>
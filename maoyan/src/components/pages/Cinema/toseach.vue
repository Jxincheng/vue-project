<template>
  <div class='toseach'>
    <a @click="back()"><i></i></a>
     <div class="search-wrapper">
        <div class="search-header">
            <div class="input-wrapper">
                <img class="search-icon" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/search.png" alt="">
                <input v-show='this.searchtype=="cinema"?true:false' v-model='searchinput' class="search-input" @input='showdel(searchinput)' type="text" placeholder="搜影院">
                <input v-show='this.searchtype=="movie"?true:false' v-model='searchinput' class="search-input" @input='showdel(searchinput)' type="text" placeholder="搜电影搜影院">
                <img v-show='delshow' class="del-input" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/close.png" alt="">
            </div>
            <div class="cancel" @click='tocinema'>取消</div>
        </div>
        <div v-show='this.searchtype=="movie"?true:false' class="hot-search">
            <h3>热门搜索</h3>
        <div class="hot-movies-wrap">
      </div>
    </div>
     </div>  
  </div>
</template>

<script>
import Vue from 'vue'
export default{
  name:'toSeach',
  components:{},
    computed:{
    },
    data(){
        return {
            delshow:false,
            searchinput:'',
            searchtype:''
        }
  },
    methods:{
        showdel(val){
            //直接用@input来监听input的值的实时变化      
            if(val.length==0){
                this.delshow=false;
            }else{
                this.delshow=true;
            }      
        },
        tocinema(){
            // this.$router.push('/cinema')
            this.$router.go(-1);
        },
        back(){
            this.$router.go(-1);
        },
        setTitle(){
            let storage=window.localStorage;
            storage.setItem("title","猫眼电影");
        }
    },
    created(){
        this.searchtype=this.$route.query.searchtype;
        this.setTitle();
    }
}
    

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.toseach{
    position:fixed;
    .top(0);
    .left(0);
    .right(0);
    z-index: 2;
    .padding(51.5,0,0,0);
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
    .search-wrapper{
        .w(358);
        background-color: #f5f5f5;
        .fs(14);
        height: 100vh;
        .search-header{
            display: flex;
            align-items: center;
            .padding(8,0,8,10);
            background-color: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;
            z-index: 1;
            .input-wrapper{
                .padding(0,10,0,10);
                border: 1px solid #e6e6e6;
                .border-radius(5);
                background-color: #fff;
                flex-grow: 1;
                .search-icon{
                    .w(15);
                    .h(15);
                    .margin(0,6,0,0);
                    float: left;
                    position: relative;
                    .top(6);
                }
                .search-input{
                    flex: 1;
                    border: none;
                    font-size: 13px;
                    color: #333;
                    line-height: 20px;
                    padding: 4px 0;
                    width: calc(100% - 40px);
                }
                .del-input{
                    .w(15);
                    .h(15);
                    float: right;
                    position: relative;
                    .top(6);
                }
            }
            .cancel{
                .h(30);
                .lh(30);
                .padding(0,10,0,10);
                .fs(16);
                color: #f03d37;
            }
        }
        .hot-search {
            .padding(0,0,8,15);
            background-color: #fff;
            position:relative;
            .top(-1);
            h3{
                border-top: 1px solid #e5e5e5;
                .padding(17,0,0,0);
                .fs(15);
                color: #666;
            }
            .hot-movies-wrap {
                margin-top: 15px;
                padding-right: 15px;
                overflow: hidden;
            }
            }
    }
}

</style>
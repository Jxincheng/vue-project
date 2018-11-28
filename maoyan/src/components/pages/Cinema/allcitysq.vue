<template>
  <div id="allcitysq">
    <div class="region-sidenav">
        <div class="district">
            <div class="district-li" v-for='(item,index) in qulist' :key='index' :class='id==item.name?"toggle":""' @click='toggletab(item)'>
                {{item.name}}({{item.count}})  
            </div>
        </div>
    </div>
    <div class="region-list-item">
        <div class="filter-list">
            <div class="bottomlist" v-for='(item,index) in cunlist' >
                <span class="item-name">{{item.name}}</span>
                <span class="item-count">{{item.count}}</span>
            </div>
        </div>
    </div><div class="mark"></div>
  </div>
  
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Allcitysq',
  components: {
  },
  props:['test'],
  data(){
    return {
        qulist:[],
        id:'全部',
        cunlist:[]
        // change:this.test

    }
  },
  methods:{
    getdate(){
        this.$axios.get('/api/ajax/filterCinemas',{params:{ci:20}})
        .then((res)=>{     
            this.qulist=res.data[this.test].subItems;               
        })
        .catch((err)=>{
            console.log(err);
                 
        })
    },
    toggletab(val){
        this.id=val.name;
        this.cunlist=val.subItems;        
    }
  },
  watch: {
    test : function (newQuestion, oldQuestion) {
            console.log(newQuestion, oldQuestion) 
            this.cunlist=[];
            // this.qulist=[];
            this.id='全部';  
            this.getdate();

    }
  },
  created(){
    this.getdate();
  }

}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
#allcitysq{
    .h(402.5);
    .region-sidenav{
        width: 35%;
        height: 100%;
        float: left;
        overflow: scroll;
        background: #f5f5f5;
        .district{
            min-height: 100%;
            background: #fff;
            .w(108);
            .district-li{
                .h(44);
                .padding(0,15,0,10);
                .lh(44);
                .fs(14);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
    .region-list-item{
        background: #f5f5f5;
        width: 65%;
        height: 100%;
        float: right;
        overflow: scroll;
        .filter-list{
            .w(215);
            .bottomlist{
                position: relative;
                .h(45);
                .lh(45);
                .padding(0,0,0,25);
                .item-name{
                    width: 80%;
                    font-size: 14px;
                    color: #333;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .item-count{
                    float: right;
                    width: 20px;
                    margin-right: 10px;
                    color: #8f9296;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
    }
    .mark{
        z-index:-999;
        position: fixed;
        .bottom(0);
        left: 0;
        .h(85);
        width: 100%;
        background: rgba(0,0,0,.3);
    }
}

.toggle{
    color: #f03d37;
    background: #f5f5f5;
}
</style>

<template>
  <div id="tese">
    <div class="region-sidenav">
        <div class="district">
            <div class="district-first">{{qulist.name}}</div>
            <div class="item-list">
                <div class="district-li" v-for='(item,index) in qulist.subItems' :key='index' :class='id==item.name?"toggle":""' @click='toggletab(item)'>
                    <span>{{item.name}}</span>  
                </div>
            </div>
            <div class="district-first">{{cunlist.name}}</div>
            <div class="item-list">
                <div class="district-li" v-for='(item,index) in cunlist.subItems' :key='index' :class='id==item.name?"toggle":""' @click='toggletab(item)'>
                    <span>{{item.name}}</span>  
                </div>
            </div>
        </div>
        <div id="special-btn">
                    <span class="btn" id="cancel-btn">重置</span>
                    <span class="btn" id="confirm-btn">确定</span>
        </div>
    </div>
    <div class="mark"></div> 
  </div>
  
</template>

<script>
import Vue from 'vue'
export default {
  name: 'tese',
  components: {
  },
  // props:['test'],
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
            this.qulist=res.data.service;
            this.cunlist=res.data.hallType;
            // console.log(name)
            console.log(this.qulist)     
            // console.log(this.qulist);
                 
        })
        .catch((err)=>{
            console.log(err);
                 
        })
    },
    // toggletab(val){
    //     this.id=val.name;
    //     this.cunlist=val.subItems;        
    // }
  },
  // watch: {
  //   test : function (newQuestion, oldQuestion) {
  //           console.log(newQuestion, oldQuestion) 
  //           this.cunlist=[];
  //           // this.qulist=[];
  //           this.id='全部';  
  //           this.getdate();

  //   }
  // },
  created(){
    this.getdate();
  }

}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
#tese{
    .h(343);
    .region-sidenav{
        .w(358);
        height: 100%;
        float: left;
        overflow: scroll;
        // background: #f5f5f5;
        .district{
            .h(270);
            overflow-y: scroll;
            // min-height: 100%;
            background: #fff;
            // .w(108);
            .district-first{
                // margin-left: 12px;
                // margin-top: 11px;
                // .margin(11,0,0,12);
                .padding(11,0,0,12);
                // font-size: 15px;
                .fs(15);
            }.item-list{
                .h(48);
                .district-li{
                float: left;
                width: 21.3%;
                // height: 30px;
                .h(30);
                .padding(3,0,3,0);
                .margin(10,10,0,0);
                .lh(30);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 5px;
                .fs(15);
                // .h(44);
                // .padding(0,15,0,10);
                // .lh(44);
                // .fs(14);
                // display:flex;
                // justify-content:space-between;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                // overflow: hidden;
                // // padding: 0 15px 0 26px;
                // .padding(0,15,0,26);
                // border-bottom: 1px solid #e5e5e5;
            }
            }
        }
    }
    #special-btn{
            .h(60);
            width: 100%;
            border-top: 1px solid #e5e5e5;
            .padding(10,0,0,0);
            background: #fafafa;
            display:flex;
            justify-content:space-between;
            // z-index: 10;
            .btn{
                display: inline-block;
                .h(34);
                width: 21.3%;
                .margin(13,11,13,11);
                border: 1px solid #e5e5e5;
                .border-radius(6);
                text-align: center;
                .lh(34);
                .fs(14);
            }
        }
    .mark{
        z-index:-999;
        position: fixed;
        .bottom(0);
        left: 0;
        .h(191);
        width: 100%;
        background: rgba(0,0,0,.3);
    }
}

.toggle{
    color: #f03d37;
    // background: #f5f5f5;
}
</style>

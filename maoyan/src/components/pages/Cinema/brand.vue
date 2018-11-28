<template>
  <div id="brand">
    <div class="region-sidenav">
        <div class="district">
            <div class="district-li" v-for='(item,index) in qulist' :key='index' :class='id==item.name?"toggle":""' @click='toggletab(item)'>
                <span>{{item.name}}</span><span>({{item.count}})</span>  
            </div>
        </div>
    </div>
    <div class="mark"></div>
  </div>
  
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Brand',
  components: {
  },
  // props:['test'],
  data(){
    return {
        qulist:[],
        id:'全部',
        // cunlist:[]
        // change:this.test
    }
  },
  methods:{
    getdate(){
        this.$axios.get('/api/ajax/filterCinemas',{params:{ci:20}})
        .then((res)=>{     
            this.qulist=res.data.brand.subItems;
            console.log(name)
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
#brand{
    .h(402.5);
    .region-sidenav{
        .w(358);
        height: 100%;
        float: left;
        overflow: scroll;
        // background: #f5f5f5;
        .district{
            min-height: 100%;
            background: #fff;
            // .w(108);
            .district-li{
                .h(44);
                .padding(0,15,0,10);
                .lh(44);
                .fs(14);
                display:flex;
                justify-content:space-between;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                // padding: 0 15px 0 26px;
                .padding(0,15,0,26);
                border-bottom: 1px solid #e5e5e5;
            }
        }
    }
    // .region-list-item{
    //     background: #f5f5f5;
    //     width: 65%;
    //     height: 100%;
    //     float: right;
    //     overflow: scroll;
    //     .filter-list{
    //         .w(215);
    //         .bottomlist{
    //             position: relative;
    //             .h(45);
    //             .lh(45);
    //             .padding(0,0,0,25);
    //             .item-name{
    //                 width: 80%;
    //                 font-size: 14px;
    //                 color: #333;
    //                 text-overflow: ellipsis;
    //                 white-space: nowrap;
    //                 overflow: hidden;
    //             }
    //             .item-count{
    //                 float: right;
    //                 width: 20px;
    //                 margin-right: 10px;
    //                 color: #8f9296;
    //                 font-size: 12px;
    //                 text-align: right;
    //             }
    //         }
    //     }
    // }
    .mark{
        z-index:-999;
        position: fixed;
        .bottom(0);
        left: 0;
        .h(129);
        width: 100%;
        background: rgba(0,0,0,.3);
    }
}

.toggle{
    color: #f03d37;
    // background: #f5f5f5;
}
</style>

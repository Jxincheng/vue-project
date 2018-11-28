<template>
  <div class='tab'>
    <div class="tab-list">
        <div class="item1" v-for="(item,index) in tablist" :key="index" @click="toggle(item.tag,item.comName)">
          <span v-show='tgshow==item.tag?false:true'>{{item.desc}}</span>
          <span v-show='tgshow==item.tag?true:false' style="color:red;">{{item.desc}}</span>
          <i class="fa fa-sort-desc city-i" aria-hidden="true" v-show='tgshow==item.tag?false:true'></i>
          <i class="fa fa-sort-asc two" aria-hidden="true" v-show='tgshow==item.tag?true:false'></i>        
        </div>
    </div>
    <!-- <Allcity v-show='zjshow==false?false:true'></Allcity> -->
    <!-- <Brand v-show='zjshow==false?false:true'></Brand> -->
    <!-- <Tese></Tese> -->
    <component v-show='zjshow==false?false:true' :is="this.moudle"></component>
  </div>
</template>
<script>
import Vue from 'vue'
import Allcity from './allcity.vue'
import Brand from './brand.vue'
import Tese from './tese.vue'
Vue.component('Allcity',{
        template:'Allcity'
    })
Vue.component('Brand',{
        template:'Brand'
    })
Vue.component('Tese',{
        template:'Tese'
    })
export default{
  name:'Tab',
  components:{Allcity,Brand,Tese},
  data(){
    return {
      tablist:[{tag:'tag1',desc:'全城',comName : 'Allcity'},{tag:'tag2',desc:'品牌',comName : 'Brand'},{tag:'tag3',desc:'特色',comName : 'Tese'}],
      tgshow:'tag',
      zjshow:false,
      moudle:"Allcity"
    }
  },
    computed:{
      
    },
    methods:{
      toggle(val,val1){
        if(this.tgshow==val){
        this.tgshow='tag';
        this.zjshow=false; 
            
      }else{
        this.tgshow=val;
        this.zjshow=true;
        this.moudle=val1;
      }
    }
}
}

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.tab{
  position:fixed;
  width: 100%;
  .h(40);
  z-index: 10;
  background-color: #fff;
  // .margin(94,0,0,0);
  .top(94);
  .tab-list{
      display: flex;
      border-bottom:1px solid #ccc;
      .item1+.item1:before{
          content: "";
          display: block;
          position: absolute;
          .h(20);
          .top(10);
          .left(0);
          border-left: 1px solid #e8e8e8;
      }
      .item1{
        flex: 1;
        text-align: center;
        .lh(40);
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        .fs(13);
        text-overflow: ellipsis;
        i{
          position: absolute;
          .left(77);
          .top(12);
        }
        .two{
          color:red;
          .top(16);
        }
        .aa{
          color:red;
        }
      }


  }
}

</style>
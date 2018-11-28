<template>
  <div class='seach'>
    <div class="topbar">
      <div class="city" @click="toCity">
        <span class="city-name">{{cityname}}</span>
        <i class="fa fa-sort-desc city-i" aria-hidden="true"></i>
      </div>
      <div class="toseach" @click="goPage()">
        <img src="../../../assets/seach.png" alt="" />
        <span>搜电影</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import toseach from './toseach.vue'
export default{
  name:'Seach',
  components:{toseach},
    computed:{
      cityname(){
        let storage=window.localStorage;
            let city=storage.getItem("city");
        return city;
      }
    },
    methods:{
      goPage(){            
        this.$router.push({path:'/toseach',query: { searchtype:'cinema' }})       
      },
      toCity(){
        this.$router.push('/city-list');
      }
    }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');


.seach{
  .h(44);
  position:fixed;
  // .margin(50,0,0,0);
  // .margin(50,0,0,0);
  .top(50);
  .topbar{
    
    .h(44);
    display:flex;
    align-items: center;
    justify-content: space-between;
    background: #f5f5f5;
    .fs(14);
    .city{
      .padding(0,0,0,15);
      .fs(15);
      display:flex;
      // align-items: center;
      i{
        .margin(0,0,0,4);
      }
    }
    .toseach{
        .w(279);
        .h(28);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #b2b2b2;
        .margin(0,15,0,18);
        .border-radius(5);
        border: .5px solid #e6e6e6;
        background-color: #fff;
        img{
          .w(14);
          .h(14);
        }

    }
  }
}
// .seach{
//   .w(375);
//   .h(44);
//   .fs(15);
//   .topbar{
//     .h(44);
//     // .padding(12,0,0,0);
//     background: #f5f5f5;
//     position: relative;
//     .city{
//       // display: flex;
//       .w(47);
//       .h(20);
//       .top(12);
//       display:inline-block;
//       position: relative;
//       color: #666;
//       .padding(0,0,0,15);
//       .city-name{
//         display:inline-block;
//       }
//       .fa{
//           .w(8);
//           .h(8);
//           position:absolute;
//       }
//     }
//     .toseach{
//       display:flex;
//       justify-content: center;
//       // align-content:center;
//       align-items: center;
//       .w(279);
//       .h(28);
//       .fs(13);
//       position:absolute;
//       display:inline-block;
//       background:#fff;
//       .top(8);
//       .border-radius(5);
//       .margin(0,18,0,15);
//       img{
//         .w(14);
//         .h(14);
//         .margin(3,4,0,0);
//       }
//       span{
//         .w(39);
//         .h(17);
//         color: #b2b2b2;
//       }
//     }
//   }
  
// }



</style>
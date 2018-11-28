<template>
  <div class='list'>
    <div class="list-wrap">
      <div class="list-cin" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
          <div class="box" v-for='(item,index) in cinemalist' :key='index' :data-id="item.id">
            <div class="title line-ellipsis">
              <span>{{item.nm}}</span>
              <span class="price-block">
                  <span class="price">{{item.sellPrice}}</span><span class="q">元起</span>
              </span>
            </div>
            <div class="location-block box-flex">
                <div class="flex line-ellipsis">{{item.addr}}</div>
                <div v-show='item.distance==""?false:true' class="distance">{{item.distance}}m</div>
            </div>
            <div class="label-block">
                  <div v-show="item.tag.allowRefund==1?true:false" class="allowRefund">退</div>
                  <div v-show="item.tag.endorse==1?true:false" class="endorse">改签</div>
                  <div v-show="item.tag.snack==1?true:false" class="snack">小吃</div>
                  <div v-show="item.tag.vipTag==1?true:false" class="vipTag">折扣卡</div>     
            </div>
            <div v-show='Object.keys(item.promotion).length>0?true:false' class="discount-block">
                <div class="discount-label normal card">
                    <img src="../../../assets/card.png" alt="">     
                </div>
                <div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
// http://m.maoyan.com/ajax/cinemaList?day=2018-11-21&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1542764852180&cityId=20
export default{
  name:'List',
  components:{},
    computed:{
    },
    data(){
      return {
        cinemalist:[],
        loading:false,
        offset:-20,
        total:10,
        state:true
       }
    },
    //http://m.maoyan.com/ajax/cinemaList?day=2018-11-21&offset=40&limit=20
    methods:{
      loadMore(){
        if(this.state==true){
          this.getdata()
        }
      },
      gettime(val){
        return val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate();
      },
      getdata(){
        this.$axios.get('/api/ajax/cinemaList',{params:{day:this.gettime(new Date()),
          offset:this.offset+=20,
          limit:20}
        })
            .then((res)=>{
              if(res.data.cinemas.length!==0){
                this.cinemalist=this.cinemalist.concat(res.data.cinemas);
              }else{
                  this.state=false;
                  this.loading=true;
              }
              
            })
            .catch((err)=>{
              console.log(err)
            })
    }
    },
    // filters:{
    //   dateFrm:function(val){
    //     return moment(val).format("YYYY-DD-HH");
    //   }
    // },
    created(){
      // this.getdata();
    },
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.list{
  .list-wrap{
    position:relative;
    .top(84);
    // .h(483);
    background-color: #fff;
    .fs(14);
    .list-cin{
      .h(483);
      .padding(13px,15px,13px,0);
      .margin(0,0,0,15);
      background-color: #fff;
      position: relative;
      overflow-y: scroll;
      .box{
        .padding(13,15,13,0);
        .margin(0,0,0,13);
        background-color: #fff;
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        // border-top: 1px solid #ccc;
        .title{
          .h(23);
          .lh(23);
          .fs(16);
          color: #000;
            .price-block{
              .padding(9,0,0,3);
              .price{
                .fs(18);
                color: #f03d37;
              }
              .q{
                .margin(0,0,0,3);
                .fs(11);
                color: #f03d37;
              }
            }
        }
        .location-block{
          .margin(6,0,0,0);
          .fs(13);
          color: #666;
          display:flex;
          .line-ellipsis{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            flex:1;
          }
          .distance{
            .margin(0,0,0,5);
          }
        }
        .label-block{
          .h(17);
          .lh(17);
          margin-top: 4px;
          margin-bottom: 4px;
          overflow: hidden;
          font-size: 0;
          flex-shrink: 0;
          div{
            position: relative;
            display: inline-block;
            padding: 0 3px;
            height: 15px;
            line-height: 15px;
            border-radius: 2px;
            .fs(11);
            color: #589daf;
            border: 1px solid #589daf;
          }
        }
        .discount-block{
          color: #999;
          .margin(0,0,4,0);
          display:flex;
          .discount-label{
            .w(15);
            .h(14);
            // position: relative;
            // .top(3);
            // display:inline-block;
            .margin(0,4,0,0);
            img{
              width:100%;
            }
          }
          .discount-label-text{
            .fs(11);
          }
        }
      }
    }
  }
}

</style>
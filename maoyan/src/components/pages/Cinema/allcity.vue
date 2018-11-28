<template>
  <div id="allcity">
    <div class="tab-content">
        <div class="region">
            <div class="region-tab">
                <ul class="tab">
                    <li @click='toggle(item.state,item.place)' class="tablist" :class='chose==item.state?"toggle":""' v-for='(item,index) in aclist'>
                        {{item.position}}
                        <div v-show='chose==item.state?true:false' class="border"></div>
                    </li>
                    
                </ul>
            </div>
            <Allcitysq :test='name'></Allcitysq>
        </div>
    </div>
  </div>
</template>

<script>
import Allcitysq from './allcitysq.vue'
export default {
  name: 'Allcity',
  components: {Allcitysq},
  data(){
    return {
        aclist:[{position:'商区',state:'tab1',place:"district"},{position:'地铁站',state:'tab2',place:"subway"}],
        chose:'tab1',
        name:'district'
    }
  },
  methods:{
    toggle(val,val1){
        this.chose=val;
        this.name=val1;
        console.log(this.name);
             

    }

  }
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
#allcity{
    position: relative;
    width: 100%;
    background: #fff;
    z-index: 100;
    overflow: scroll;
    
    .tab-content{
        .fs(15);
        .region{
            background-color: #fff;
            overflow: auto;
            z-index: 999;
            .w(358);
            .region-tab{
                .h(44);
                .tab{
                    display:flex;
                    .tablist{
                        // .fs(15);
                        position: relative;
                        display: inline-block;
                        .padding(0,10,0,10);
                        width: 50%;
                        height: 100%;
                        .lh(44);
                        text-align: center;
                    }
                    .border{
                        // content: "";
                        position: absolute;
                        display: block;
                        .bottom(0);
                        .left(0);
                        width: 90%;
                        border-top: 2px solid #f03d37;
                    }
                }
            }
        }
    }
}
.toggle{
    color: #f03d37;
}
</style>

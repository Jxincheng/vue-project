<template>
  <div class='cinema'>
      <!-- <div class="navbar"></div> -->
      <Seach></Seach>
      <Tab></Tab>
      <List></List>
      <!-- <div class="bottombar"></div> -->
  </div>
</template>

<script>
import  Seach from './seach.vue'
import Tab from './tab.vue'
import List from './cinemaList.vue'

export default{
  name:'Cinema',
  components:{Seach,Tab,List},
  methods:{
    toPath(){
      this.$store.commit('setPaths','/cinema');
    },
    setTitle(){
      let storage=window.localStorage;
      storage.setItem("title","影院");
    }
  },
  computed:{
    cityname(){
      let storage=window.localStorage;
          let city=storage.getItem("city");
      return city;
    }
  },
  created(){
    this.toPath();
    this.setTitle();
  }
} 

</script>
<style lang="less" scoped>
@import url('../../../styles/main.less');
.cinema{
  position:fixed;
  .top(0);
  .left(0);
  .right(0); 
  .padding(51.5,0,0,0);
}

</style>
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    // cityname:'广州',
    // page:'电影',
    paths:'/movie'
  },
  mutations: {
    // setName(state,name){
    // 	state.cityname=name
    // },
    // setPage(state,page){
    //   state.page=page
    // },
    setPaths(state,path){
      state.paths=path
    }
  } 
})
//state 存放所有全局状态值（全局变量） 这里的数据只能通过mutation里的方法修改
//mutations 里面有一堆方法  方法的作用是修改  state 里的值
export default store
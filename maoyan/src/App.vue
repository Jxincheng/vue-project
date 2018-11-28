<template>
  <div id="app">
    <Header :name='name'></Header>
    <!-- <Movie></Movie> -->
    <router-view ></router-view><!-- @content='content' -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/commons/Header.vue'
import Footer from './components/commons/Footer.vue'
// import Movie from './components/pages/Movie/Movie.vue'
export default {
  name: 'App',
  components:{
    Header,Footer//,Movie
  },
  data(){
    return{
      name:''
    }
  },
  methods:{
    // content(val){
    //   this.name=val;
    // },
    setTitle(){
      let storage=window.localStorage;
      this.name=storage.getItem("title");
    }
  },
  created(){
    this.setTitle();
  },
  updated(){
    this.setTitle();
  }
}
</script>

<style>

</style>

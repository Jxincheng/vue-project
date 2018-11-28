import Vue from 'vue'
import Router from 'vue-router'
import Movie from '../components/pages/Movie/Movie.vue'
// import Cinema from '../components/pages/Cinema/Cinema.vue'
import Cinema from '../components/pages/Cinema/cinema.vue'
import Toseach from '../components/pages/Cinema/toseach.vue'
import CityList from '../components/pages/City-list/City-list.vue'
import Account from '../components/pages/My/Account.vue'
import Details from '../components/pages/Details/Details.vue'
import Details2 from '../components/pages/Details/Details2.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{  	path: '/',redirect:'/movie'},//重定向
    {	path: '/movie',name: 'movie',component: Movie},
    {	path: '/movie/:movieId',name: 'movie',component: Details2},
    {	path: '/cinema',name: 'cinema',component: Cinema},
    {	path: '/toseach',name: 'toseach',component: Toseach},
    {	path: '/cinema/movie/:movieId',name: 'cinema/movie',component: Details},
    {	path: '/city-list',name: 'city-list',component: CityList},
    {	path: '/account',name: 'account',component: Account},
  ]
})

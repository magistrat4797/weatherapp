import { createRouter, createWebHashHistory } from 'vue-router'
import Search from '../components/Search.vue'
import Weather from '../components/Weather.vue'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  },
  {
    path: '/detailed-weather',
    name: 'DetailedWeather',
    component: Weather,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

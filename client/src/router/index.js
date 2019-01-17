import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Movies from '@/components/Movies'
import NewMovie from '@/components/NewMovie'
import EditMovie from '@/components/EditMovie'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movies/new',
      name: 'NewMovie',
      component: NewMovie
    },
    {
      path: '/movies/:id',
      name: 'UpdateMovie',
      component: EditMovie
    }
  ]
})

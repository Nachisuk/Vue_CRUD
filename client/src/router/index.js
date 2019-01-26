import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/MoviesList/Movies'
import NewMovie from '@/components/MoviesList/NewMovie'
import EditMovie from '@/components/MoviesList/EditMovie'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
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

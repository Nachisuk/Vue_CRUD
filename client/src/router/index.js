import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/MoviesList/Movies'
import NewMovie from '@/components/MoviesList/NewMovie'
import EditMovie from '@/components/MoviesList/EditMovie'

import GenreList from '@/components/TablesList/GenreList'
import AwardsList from '@/components/TablesList/AwardsList'
import DirectorList from '@/components/TablesList/DirectorList'
import contentRating from '@/components/TablesList/contentRating'

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
    },
    {
      path: '/genres',
      name: 'GenresList',
      component: GenreList
    },
    {
      path: '/awards',
      name: 'AwardsList',
      component: AwardsList
    },
    {
      path: '/directors',
      name: 'DirectorsList',
      component: DirectorList
    },
    {
      path: '/contentrating',
      name: 'ContentRating',
      component: contentRating
    },
  ]
})

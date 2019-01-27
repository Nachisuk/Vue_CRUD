import Vue from 'vue'
import Router from 'vue-router'

import Movies from '@/components/MoviesList/Movies'
import NewMovie from '@/components/MoviesList/NewMovie'
import EditMovie from '@/components/MoviesList/EditMovie'

import GenreList from '@/components/TablesList/GenreComponents/GenreList'
import EditGenre from '@/components/TablesList/GenreComponents/EditGenre'
import NewGenre from '@/components/TablesList/GenreComponents/NewGenre'

import AwardsList from '@/components/TablesList/AwardsComponents/AwardsList'
import EditAward from '@/components/TablesList/AwardsComponents/EditAward'
import NewAward from '@/components/TablesList/AwardsComponents/NewAward'

import DirectorList from '@/components/TablesList/DirectorComponents/DirectorList'
import EditDirector from '@/components/TablesList/DirectorComponents/EditDirector'
import NewDirector from '@/components/TablesList/DirectorComponents/NewDirector'

import contentRating from '@/components/TablesList/ContentComponents/contentRating'
import EditContent from '@/components/TablesList/ContentComponents/EditContent'
import NewContent from '@/components/TablesList/ContentComponents/NewContent'

import Search from '@/components/Searching/Search'


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
    {
      path: '/editAward',
      name: 'EditAward',
      component: EditAward
    },
    {
      path: '/newAward',
      name: 'NewAward',
      component: NewAward
    },
    {
      path: '/newGenre',
      name: 'NewGenre',
      component: NewGenre
    },
    {
      path: '/editGenre',
      name: 'EditGenre',
      component: EditGenre
    },
    {
      path: '/newDirector',
      name: 'NewDirector',
      component: NewDirector
    },
    {
      path: '/editDirector',
      name: 'EditDirector',
      component: EditDirector
    },
    {
      path: '/newContent',
      name: 'NewContent',
      component: NewContent
    },
    {
      path: '/editConent',
      name: 'EditContent',
      component: EditContent
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

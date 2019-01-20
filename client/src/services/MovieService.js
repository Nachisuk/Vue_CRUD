import Api from '@/services/Api'

export default {
  fetchMovies () {
    return Api().get('movies')
  },
  fetchGenres()
  {
    return Api().get('genres')
  },
  fetchDirectors()
  {
    return Api().get('directors')
  },
  fetchAwards()
  {
    return Api().get('awards')
  },
  fetchContent()
  {
    return Api().get('content')
  },
  addGenre(params)
  {
    return Api().post('genres',params)
  },
  addMovie (params)
  {
    return Api().post('movies',params)
  },
  addDirector(params)
  {
    return Api().post('directors',params)
  },
  addContent(params)
  {
    return Api().post('content',params)
  },
  addAward(params)
  {
    return Api().post('awards',params)
  },
  getMovie(params){
    return Api().get('movie/'+params.id)
  },
  updateMovie(params){
    return Api().put('movies/'+params.id,params)
  },
  deleteMovie(id){
    return Api().delete('movies/'+id)
  }

}
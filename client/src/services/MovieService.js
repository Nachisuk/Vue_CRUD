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
  getAward(params){
    return Api().get('awards/'+params.id)
  },
  getGenre(params){
    return Api().get('genres/'+params.id)
  },
  getDirector(params){
    return Api().get('directors/'+params.id)
  },
  getContent(params){
    return Api().get('content/'+params.id)
  },
  updateMovie(params){
    return Api().put('movies/'+params.id,params)
  },
  updateAward(params){
    return Api().put('awards/'+params.id,params)
  },
  updateGenre(params){
    return Api().put('genres/'+params.id,params)
  },
  updateDirector(params){
    return Api().put('directors/'+params.id,params)
  },
  updateContent(params){
    return Api().put('content/'+params.id,params)
  },
  deleteMovie(id){
    return Api().delete('movies/'+id)
  },
  deleteDirector(id){
    return Api().delete('directors/'+id)
  },
  deleteGenre(id){
    return Api().delete('genres/'+id)
  },
  deleteAwards(id){
    return Api().delete('awards/'+id)
  },
  deleteContent(id){
    return Api().delete('content/'+id)
  }


}
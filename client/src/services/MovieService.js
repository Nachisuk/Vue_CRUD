import Api from '@/services/Api'

export default {
  fetchMovies () {
    return Api().get('movies')
  },
  addMovie (params)
  {
    return Api().post('movies',params)
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
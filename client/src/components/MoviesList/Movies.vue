<template>
    <div class= "container">
        <div class="row">
            <div class="col-6" align="left">
                <h1>Movies</h1>
            </div>
            <div class="col-6" align="right">
                <router-link v-bind:to="{ name: 'NewMovie'}">
                    <b-button variant="primary">
                        Dodaj nowy
                    </b-button>
                </router-link>
            </div>
        </div>

        <div v-if="movies.length > 0" class="row ">

            
            <div v-for="movie in movies" :key="movie.id" class="col-md-6 col-lg-4">
                <transition name="fade">
                    <div class = "moviecard">
                        
                        <div v-if=movie.nazwa class="movie-title">
                            {{movie.nazwa}}
                            <span v-if=movie.data_wydania class="movie-year">{{movie.data_wydania | moment("YYYY") }}</span>
                        </div>
                        <div class="movie-details">
                            <span v-if=movie.kategoria_wiekowa class="movie-rating">{{movie.kategoria_wiekowa.nazwa}}</span>
                            <span class="movie-genre" >
                                <a v-for="genre in movie.gatunek" :key="genre.id" >
                                    <a style="text-decoration: underline;">{{genre.nazwa}}</a>
                                    <a>{{" "}}</a>
                                </a>
                            </span>
                            <br><br>
                            <b-img v-if="movie.poster==null" thumbnail fluid-grow src="https://www.flixdetective.com/web/images/poster-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
                            <b-img v-else-if="movie.poster===''" thumbnail fluid-grow src="https://www.flixdetective.com/web/images/poster-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
                            <b-img v-else thumbnail fluid-grow :src="movie.poster" alt="Thumbnail" style="max-width: 270px;" />
                        </div>

                        

                        <div v-if=movie.reżyser class="movie-castcrew">
                            <span class="title">Reżyser</span>
                            <span class="name">{{movie.reżyser.imie + ' ' + movie.reżyser.nazwisko}}</span>
                        </div>
                        <div v-if="movie.nagrody.length>0" class="movie-castcrew">
                            <span class="title">Nagrody</span>
                            <span class="name">
                                <a v-for="award in movie.nagrody" :key="award.id" >{{award.nazwa+" "}}</a>
                            </span>
                        </div>
                        <div v-if=movie.opis class="movie-synopsis">
                            {{movie.opis}}
                        </div>
                        <div >
                            <router-link v-bind:to="{ name: 'UpdateMovie', params: { id: movie._id } }">
                                Edytuj
                            </router-link>
                                 |
                            <a href="#" @click="deleteMovie(movie._id)">
                                Usuń
                            </a>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div v-else class="row">
            <div style="margin-bottom: 20px; margin-top: 20px;">
                Brak tu żadnych filmów... dodajmy jakiś!
            </div>
        </div>
    </div>

</template>

<script>
import MovieService from '@/services/MovieService'


export default{
    name: 'movies',
    data()
    {
        return {
            movies: []
        }
    },
    mounted()
    {
        this.getMovies()
    },
    methods:{
        async getMovies(){
            const response = await MovieService.fetchMovies()
            this.movies = response.data.movies
        },
        async deleteMovie(id){
            await MovieService.deleteMovie(id)
            this.getMovies()
            this.$router.push({name: 'Movies'})
        }
    }
}


</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}







.moviecard {
  font-family: 'Helvetica', sans-serif, 'Ariel';
  position: relative;
  background: #ffffff;
  color: #555555;
  margin: 25px auto;
  width: 100%;
  max-width: 900px;
  min-height: 250px;
  padding: 20px 20px 20px 20px;
  -moz-box-shadow: -5px 5px 15px;
  -webkit-box-shadow: -5px 5px 15px;
  box-shadow: -5px 5px 15px;
  border-radius: 5px;
}
.moviecard #movie-content {
  opacity: 1;
  width: 100%;
  display: table;
  transition: all 500ms ease-out;
  position: relative;
}
.moviecard .movie-title {
  font-size: 30px;
  padding-bottom: 6px;
  color: #333333;
}
.moviecard .movie-title .movie-year {
  margin-left: 6px;
  font-size: 14px;
}
.moviecard .movie-title a {
  color: #333333;
  text-decoration: none;
}
.moviecard .movie-title a:hover {
  color: #858585;
}
.moviecard .movie-details {
  font-size: 10px;
  padding-bottom: 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid #dbdbdb;
}
.moviecard .movie-details span {
  padding: 0px 6px;
  border-right: 1px solid #dbdbdb;
}
.moviecard .movie-details span:last-child {
  border: none;
}
.moviecard .movie-castcrew {
  font-size: 14px;
  padding-top: 12px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.moviecard .movie-castcrew span.title {
  color: #333333;
  display: inline-block;
  width: 80px;
  font-weight: 600;
}
.moviecard .movie-synopsis {
  font-size: 14px;
  margin: 24px 0px;
  padding-top: 24px;
  border-top: 1px solid #dbdbdb;
  word-wrap: break-word;
  overflow-y: hidden;
  width: 100%;
}
.moviecard .movie-ratings {
  position: absolute;
  right: 0px;
}
.moviecard .movie-ratings span.star {
  display: inline-block;
  margin-right: 12px;
  color: #F0DE00;
  font-size: 36px;
}
.moviecard .movie-ratings span.score {
  font-size: 30px;
  color: #333333;
}



</style>
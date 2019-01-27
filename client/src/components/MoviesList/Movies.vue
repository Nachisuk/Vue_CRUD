<template>
    <div>
        <h1>Movies</h1>   
        <div style="float:right"><router-link v-bind:to="{ name: 'NewMovie'}"><b-button variant="primary">Dodaj nowy</b-button></router-link></div>   
        <div v-if="movies.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opis</td>
                    <td>Data Wydania</td>
                    <td>Autor</td>
                    <td>Gatunek</td>
                    <td>Nagrody</td>
                    <td>Kategoria</td>
                    <td>Akcja</td>
                </tr>

                <tr v-for="movie in movies" :key="movie.id">
                     <td><span v-if="movie.nazwa !== null">{{ movie.nazwa }}</span></td>
                     <td><span v-if="movie.opis !== null">{{ movie.opis }}</span></td>
                     <td><span v-if="movie.data_wydania !== null">{{ movie.data_wydania }}</span></td>
                     <td><span v-if="movie.reżyser">{{movie.reżyser.imie}} </span></td>
                     <td><span v-for="genre in movie.gatunek" :key="genre.id">{{genre.nazwa+", "}} </span></td>
                     <td> <span v-for="award in movie.nagrody" :key="award.id">{{award.nazwa+", "}}</span></td>
                     <td><span v-if="movie.kategoria_wiekowa">{{movie.kategoria_wiekowa.nazwa}}</span></td>
                     <td align="center">
                        <router-link v-bind:to="{ name: 'UpdateMovie', params: { id: movie._id } }">Edit</router-link> |
                        <a href="#" @click="deleteMovie(movie._id)">Delete</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            There are no movies.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'NewMovie' }" class="add_post_link">Add Movie</router-link>
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
</style>
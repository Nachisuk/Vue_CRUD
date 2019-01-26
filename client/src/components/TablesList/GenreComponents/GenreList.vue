<template>
<div>
  <h1>Gatunki</h1>
      <div style="float:right"><router-link v-bind:to="{ name: 'NewGenre'}"><b-button variant="primary">Dodaj nowy</b-button></router-link></div>
      <div v-if="genres.length > 0" class="table-wrap">
          <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opis</td>
                    <td>Filmy</td>
                    <td>Akcja</td>
                </tr>

                <tr v-for="genre in genres" :key="genre._id">
                     <td>{{ genre.nazwa }}</td>
                     <td>{{ genre.opis}}</td>                  
                     <td><span v-for="movie in genre.filmy" :key="movie._id">{{movie._id+", "}} </span></td>
                     <td align="center">
                        <router-link v-bind:to="{ name: 'EditGenre', params: { id: genre._id } }">Edit</router-link>|
                        <a href="#" @click="deleteGenre(genre._id)">Delete</a>
                    </td>
                </tr>
            </table>
      </div>
      <div v-else>
            There are no genres.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'NewMovie' }" class="add_post_link">Add Movie</router-link>
        </div>
</div>

</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  
  name: 'GenreList',
  data()
  {
    return {
      genres: []
    }
  },
  mounted()
  {
    this.getGenres()
  },
  methods:{
    async getGenres(){
      const response = await MovieService.fetchGenres()
      this.genres = response.data.genre
    },
     async deleteGenre(id){
      await MovieService.deleteGenre(id)
      this.getGenres()
      this.$router.push({name: 'GenresList'})
    }
  }

}
</script>

<style>
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
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
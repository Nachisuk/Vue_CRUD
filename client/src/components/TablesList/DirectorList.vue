<template>
<div>
  <h1>Reżyserzy</h1>
      <div v-if="directors.length > 0" class="table-wrap">
          <table>
                <tr>
                    <td>Imie</td>
                    <td>Nazwisko</td>
                    <td>Data Urodzenia</td>
                </tr>

                <tr v-for="director in directors" :key="director._id">
                     <td>{{director.imie }}</td>
                     <td>{{ director.nazwisko}}</td>                  
                     <td>{{ director.data_urodzenia}}</td>
                     <td align="center">
                        <a href="#">Edit</a>|
                        <a href="#">Delete</a>
                    </td>
                </tr>
            </table>
      </div>
      <div v-else>
            There are no directors.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'NewMovie' }" class="add_post_link">Add Movie</router-link>
        </div>
</div>

</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  
  name: 'DirectorsList',
  data()
  {
    return {
      directors: []
    }
  },
  mounted()
  {
    this.getDirectors()
  },
  methods:{
    async getDirectors(){
      const response = await MovieService.fetchDirectors()
      this.directors = response.data.director
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
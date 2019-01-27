<template>

<div class="container">
  <div class="row">
    <div class="col-6" align="left">
      <h1>Reżyserzy</h1>
    </div>
    <div class="col-6" align="right">
      <router-link v-bind:to="{ name: 'NewDirector'}">
        <b-button variant="primary">
          Dodaj nowy
        </b-button>
      </router-link>
    </div>
  </div>

  <div v-if="directors.length >0" class="row">
    <div  v-for="director in directors" :key="director._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
      <b-card >
          <h4 slot="header">{{director.imie +' '+director.nazwisko}}</h4>
          <b-card-body>
            <p class="card-text">
                <b>Datan urodzenia: </b>{{ director.data_urodzenia | moment("DD.MM.YYYY r.")}}
            </p>
          </b-card-body>
          <div slot="footer"> 
            <router-link v-bind:to="{ name: 'EditDirector', params: { id: director._id } }">Edytuj</router-link> | <a href="#" @click="deleteDirector(director._id)">Usuń</a>
          </div>
        </b-card>  
    </div>
  </div> 
  
  <div v-else class="row">
    <div style="margin-bottom: 20px; margin-top: 20px;">
        Brak tu żadnych reżyserów... dodajmy jakiś!
    </div>
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
    },
    async deleteDirector(id){
      await MovieService.deleteDirector(id)
      this.getDirectors()
      this.$router.push({name: 'DirectorsList'})
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
<template>

<div class="container">
  <div class="row">
    <div class="col-6" align="left">
      <h1>Nagrody</h1>
    </div>
    <div class="col-6" align="right">
      <router-link v-bind:to="{ name: 'NewAward'}">
        <b-button variant="primary">
          Dodaj nową
        </b-button>
      </router-link>
    </div>
  </div>

  <div v-if="awards.length > 0" class="row">
    <div  v-for="award in awards" :key="award._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
      <b-card >
          <h4 slot="header">{{ award.nazwa }}</h4>
          <b-card-body>
            <p class="card-text">
              <b-img v-if="award.obrazek==null" thumbnail fluid-grow src="https://www.tatahousing.in/images/award-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
              <b-img v-else-if="award.obrazek===''" thumbnail fluid-grow src="https://www.tatahousing.in/images/award-placeholder.png" alt="Thumbnail" style="max-width: 270px; background-color:#E8E8E8;" />
              <b-img v-else thumbnail fluid-grow :src="award.obrazek" alt="Thumbnail" style="max-width: 270px;" />
              <br><br>
              {{ award.opis}}
            </p>
          </b-card-body>
          <div slot="footer"> 
            <router-link v-bind:to="{ name: 'EditAward', params: { id: award._id } }">Edytuj</router-link> | <a href="#" @click="deleteAward(award._id)">Usuń</a>
          </div>
        </b-card>  
    </div>
  </div> 
  
  <div v-else class="row">
    <div style="margin-bottom: 20px; margin-top: 20px;">
        Brak tu żadnych nagród... dodajmy jakieś!
    </div>
  </div>
</div>

</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  
  name: 'AwardsList',
  data()
  {
    return {
      awards: []
    }
  },
  mounted()
  {
    this.getAwards()
  },
  methods:{
    async getAwards(){
      const response = await MovieService.fetchAwards()
      this.awards = response.data.awards
    },
    async deleteAward(id){
      await MovieService.deleteAwards(id)
      this.getAwards()
      this.$router.push({name: 'AwardsList'})
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
<template>
  <div class="posts">
    <h1>Edytuj gatunek</h1>
    <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form>
               <b-form-group style="text-align:left" label="Nazwa gatunku" label-for="titleinput" description="">
                <b-form-input id="titleinput" v-model="nazwa" type="text" placeholder="Gatunek"></b-form-input>
               </b-form-group>  

               <b-form-group style="text-align:left" label="Opis gatunku" label-for="titleinput" description="">
                <b-form-textarea id="titleinput" :rows="3" v-model="opis" type="text" placeholder="Opis"></b-form-textarea>
               </b-form-group> 


          </b-form>
            <div>
                <b-button @click="updateGenre" variant="primary">Edytuj</b-button>
            </div>
        </b-col>
        <b-col></b-col>
    </b-row>
</b-container>
  
  </div>
</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  name: 'NewGenre',
  data () {
    return {
        nazwa: '',
        opis: '',
    }
  },
  mounted () {
      this.getGenre()
  },
  methods: {
   async getGenre () {
      const response = await MovieService.getGenre({
        id: this.$route.params.id
      })
      this.nazwa = response.data.nazwa
      this.opis = response.data.opis
    },
     async updateGenre () {
      await MovieService.updateGenre({
      id: this.$route.params.id,
      nazwa: this.nazwa,
      opis: this.opis,
      })
      this.$router.push({ name: 'GenresList' })
  },
  }
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
</style>
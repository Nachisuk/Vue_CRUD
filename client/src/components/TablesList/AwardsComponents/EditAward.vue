<template>
  <div class="posts">
    <h1>Stwórz nową nagrodę</h1>
    <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form>
               <b-form-group style="text-align:left" label="Nazwa nagrody" label-for="titleinput" description="">
                <b-form-input id="titleinput" v-model="nazwa" type="text" placeholder="Nazwa nagrody"></b-form-input>
               </b-form-group>  

               <b-form-group style="text-align:left" label="Opis" label-for="titleinput" description="">
                <b-form-textarea id="titleinput" :rows="3" v-model="opis" type="text" placeholder="Opis nagrody"></b-form-textarea>
               </b-form-group>  

               <b-form-group style="text-align:left" label="Obrazek nagrody" label-for="titleinput" description="">
                <b-form-input id="titleinput" :rows="3" v-model="obrazek" type="text" placeholder="Link obrazku"></b-form-input>
               </b-form-group> 

          </b-form>
            <div>
                <b-button @click="updateAward" variant="primary">Dodaj</b-button>
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

  name: 'EditAward',
  data () {
    return {
        nazwa: '',
        opis: '',
        obrazek: '',
        opis_2: '',
    }
  },
  mounted () {
      this.getAward()
  },
  methods: {
    async getAward () {
      const response = await MovieService.getAward({
        id: this.$route.params.id
      })
      this.nazwa = response.data.nazwa
      this.opis = response.data.opis
      this.obrazek = response.data.obrazek
    },
    async updateAward () {
      await MovieService.updateAward({
      id: this.$route.params.id,
      nazwa: this.nazwa,
      opis: this.opis,
      obrazek: this.obrazek,
      })
      this.$router.push({ name: 'AwardsList' })
  },
}
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
</style>
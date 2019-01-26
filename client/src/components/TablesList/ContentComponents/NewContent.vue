<template>
  <div class="posts">
    <h1>Stwórz nową kategorię wiekową czy coś</h1>
    <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form>
               <b-form-group style="text-align:left" label="Nazwa kategorii" label-for="titleinput" description="">
                <b-form-input id="titleinput" v-model="nazwa" type="text" placeholder="Nazwa kategorii"></b-form-input>
               </b-form-group>  

               <b-form-group style="text-align:left" label="Opis" label-for="titleinput" description="">
                <b-form-textarea id="titleinput" :rows="3" v-model="opis" type="text" placeholder="Opis"></b-form-textarea>
               </b-form-group>  
          </b-form>
            <div>
                <b-button @click="addContent" variant="primary">Dodaj</b-button>
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

  name: 'NewContent',
  data () {
    return {
        nazwa: '',
        opis: '',
    }
  },
  mounted () {

  },
  methods: {
    async addContent(){
      await MovieService.addContent({
          nazwa: this.nazwa,
          opis: this.opis,
      })
    this.$router.push({ name: 'ContentRating' });
    }

  }
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
</style>
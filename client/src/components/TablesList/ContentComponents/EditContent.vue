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
                <b-button @click="updateContent" variant="primary">Edytuj</b-button>
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
      this.getContent()
  },
  methods: {
   async getContent () {
      const response = await MovieService.getContent({
        id: this.$route.params.id
      })
      this.nazwa = response.data.nazwa
      this.opis = response.data.opis
    },
     async updateContent () {
      await MovieService.updateContent({
      id: this.$route.params.id,
      nazwa: this.nazwa,
      opis: this.opis,
      })
      this.$router.push({ name: 'ContentRating' })
  },

  }
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
</style>
<template>
  <div class="posts">
    <h1>Modyfikuj film {{this.title}}</h1>
    <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form>
              <b-form-group style="text-align:left" label="Nazwa filmu" label-for="titleinput" description="Przykładowa nazwa filmu">
                <b-form-input id="titleinput" v-model="title" type="text" placeholder="Nazwa filmu"></b-form-input>
              </b-form-group>       

              <b-form-group style="text-align:left" label="Opis filmu" label-for="descinput" description="Napisz krótki/długi opis filmu">
                <b-form-textarea id="descinput" :rows="3" v-model="description" placeholder="Nazwa filmu"></b-form-textarea>
              </b-form-group>  

              <b-form-group style="text-align:left" label="Plakat filmu" label-for="posterinput" description="">
                <b-form-input id="posterinput" :rows="3" v-model="poster" type="text" placeholder="Link obrazku"></b-form-input>
               </b-form-group>
              
               <b-form-group style="text-align:left" label="Data produkcji filmu" label-for="datainput" description="Wybierz date">
                  <datepicker v-model="data_wydania"  name="uniquename" bootstrap-styling="true"></datepicker>
              </b-form-group>  

                <hr class="my-4">


              <b-form-group style="text-align:left" label="Reżyser flmu" label-for="directorinput" description="Wybierz reżysera">
                 <multiselect id="directorSelect" v-model="modeldirectors" :multiple="false" deselect-label="Can't remove this value" track-by="imie" :custom-label="customLabel" placeholder="Wybierz reżysera.." :options="directors" :searchable="true" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.imie }} {{option.nazwisko}}</template>
                 </multiselect>
              </b-form-group>
              
                <hr class="my-4">

               <b-form-group style="text-align:left" label="Gatunki filmu" label-for="genrectorinput" description="Wybierz gatunek">
                 <multiselect id="genreSelect" v-model="modelgenres" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz gatunki..." :options="genres" :searchable="false" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.nazwa }}</strong></template>
                </multiselect>
              </b-form-group>

                <hr class="my-4">

              <b-form-group style="text-align:left" label="Nagody filmu" label-for="awardctorinput" description="Wybierz nagrody">
                <multiselect id="conentSelect" v-model="modelawards" :multiple="true" deselect-label="Usuń" track-by="nazwa" label="nazwa" placeholder="Wybierz nagrody filmu.." :options="awards" :allow-empty="true">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.nazwa }}</template>
                </multiselect>
              </b-form-group>

                <hr class="my-4">

              <b-form-group style="text-align:left" label="Kategoria wiekowa filmu" label-for="contentinput" description="Wybierz kategorię wiekową">
                 <multiselect id="awardsSelect" v-model="modelcontent" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz kategorie wiekową..." :options="content" :searchable="false" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.nazwa }}</template>
                 </multiselect>
              </b-form-group>
                <hr class="my-4">

          </b-form>
            <div>
              <button class="app_post_btn" @click="updatePost">Edytuj</button>
            </div>
        </b-col>
        <b-col></b-col>
    </b-row>
</b-container>
  
  </div>
</template>

<script>
import MovieService from '@/services/MovieService'
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'

export default {
   components: { Multiselect, Datepicker },
  name: 'EditMovie',
  data () {
    return {
      title: '',
      description: '',
      poster: '',
      data_wydania: Date.now(),
      modeldirectors: [],
      modelgenres: [],
      modelawards: [],
      modelcontent: [],

      genres: [],
      directors: [],
      awards: [],
      content: []
    }
  },
  mounted () {
    this.getGenres()
    this.getDirectors()
    this.getAwards()
    this.getContent()
    this.getMovie()
  },
  methods: {
    async getMovie () {
      const response = await MovieService.getMovie({
        id: this.$route.params.id
      })
      this.title = response.data.nazwa
      this.description = response.data.opis
      this.poster = response.data.plakat
      this.data_wydania = response.data.data_wydania
      this.modeldirectors = response.data.reżyser
      this.modelgenres = response.data.gatunek
      this.modelawards = response.data.nagrody
      this.modelcontent = response.data.kategoria_wiekowa

    },
    async getGenres()
    {
      const response = await MovieService.fetchGenres();
      this.genres = response.data.genre;
    },
    async getDirectors()
    {
      const response = await MovieService.fetchDirectors();
      this.directors = response.data.director;
    },
    async getAwards()
    {
      const response = await MovieService.fetchAwards();
      this.awards = response.data.awards;
    },
    async getContent()
    {
      const response = await MovieService.fetchContent();
      this.content= response.data.content;
    },
    async updatePost () {
      await MovieService.updateMovie({
        id: this.$route.params.id,
        nazwa: this.title,
        opis: this.description,
        plakat: this.poster,
        kategoria_wiekowa: this.modelcontent,
        reżyser: this.modeldirectors,
        gatunek: this.modelgenres,
        nagrody: this.modelawards,
        data_wydania: this.data_wydania
      })
      this.$router.push({ name: 'Movies' })
    },
     customLabel(option) {
        return `${option.imie}  ${option.nazwisko}`
      },

  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 8px;
  vertical-align: middle;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
.multiselect {
  width: 500px;
  padding: 10px;
  outline: none;
  font-size: 12px;
  display: inline-block;
 vertical-align: middle;
}

</style>
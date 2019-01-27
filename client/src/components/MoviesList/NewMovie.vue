<template>
  <div class="posts">
     <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
              <b-form-group style="text-align:left" label="Nazwa filmu" label-for="titleinput" description="">
                <b-form-input id="titleinput" v-model="title" type="text" placeholder="Nazwa filmu"></b-form-input>
              </b-form-group>       

              <b-form-group style="text-align:left" label="Opis filmu" label-for="descinput" description="Napisz krótki/długi opis filmu">
                <b-form-textarea id="descinput" :rows="3" v-model="description" placeholder="Nazwa filmu"></b-form-textarea>
              </b-form-group>  
              
               <b-form-group style="text-align:left" label="Data produkcji filmu" label-for="datainput" description="Wybierz date">
                  <datepicker v-model="movieDate"  name="uniquenam1e" :bootstrap-styling=true></datepicker>
              </b-form-group>  

                <hr class="my-4">


              <b-form-group style="text-align:left" label="Reżyser flmu" label-for="directorinput" description="" v-show='!toggleDirector'>
                 <multiselect id="directorSelect" v-model="choosenDirectors" :multiple="false" deselect-label="Can't remove this value" track-by="imie" :custom-label="customLabel" placeholder="Wybierz reżysera.." :options="directors" :searchable="true" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.imie }} {{option.nazwisko}}</template>
                 </multiselect>
              </b-form-group>
              

              <div>
              <a @click='toggleDirector = !toggleDirector' v-show='!toggleDirector'> Reżyser filmu nie istnieje w bazie? <strong>Dodaj go</strong></a>
              <div v-show='toggleDirector'>
                  <b-jumbotron>
                    <template slot="header">
                      <span style="font-size:50px">Dodaj reżysera</span>
                    </template>
                  <div>
                  <b-form-group style="text-align:left">
                      <b-form-input id="titleinput" v-model="directorName" type="text" placeholder="Imie reżysera"></b-form-input>
                  </b-form-group>
                  
                </div>
                 <div>
                   <b-form-group style="text-align:left">
                    <b-form-input id="titleinput" v-model="directorSecond" type="text" placeholder="Nazwisko reżysera"></b-form-input>
                   </b-form-group>
                  
                </div>
                <div>
                    <b-form-group style="text-align:left" label="Data urodzenia">
                        <datepicker v-model="directorDate"  :bootstrap-styling=true name="uniquename"></datepicker>
                    </b-form-group>     
                </div>

                <div>
                  <b-button variant="primary" @click="addDirector">Dodaj reżysera!</b-button>
                  <b-button variant="danger" @click='toggleDirector = !toggleDirector'>Wróć</b-button>
                </div>
              </b-jumbotron>
              </div>
              </div>
                <hr class="my-4">

               <b-form-group style="text-align:left" label="Gatunki filmu" label-for="genrectorinput" description="" v-show='!toggleGenre'>
                 <multiselect id="genreSelect" v-model="choosenGenres" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz gatunki..." :options="genres" :searchable="false" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.nazwa }}</strong></template>
                </multiselect>
              </b-form-group>

              <div id="GenreForm">
                  <a @click='toggleGenre = !toggleGenre' v-show='!toggleGenre'> Nie ma twojego gatunku? <strong>Kliknij tutaj</strong></a>
                      <div v-show='toggleGenre'>
                        <b-jumbotron>
                            <template slot="header">
                              <span style="font-size:50px">Dodaj gatunek</span>
                            </template>
                        <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="genreName" type="text" placeholder="Nazwa gatunku"></b-form-input>
                          </b-form-group>
                        </div>
                         <div>
                          <b-form-group style="text-align:left">
                            <b-form-textarea id="titleinput" v-model="genreDesc" type="text" placeholder="Opis gatunku"></b-form-textarea>
                          </b-form-group>
                        </div>

                        <div>
                          <b-button variant="primary" @click="addGenre">Dodaj</b-button>
                          <b-button variant="danger" @click='toggleGenre = !toggleGenre'>Wróć</b-button>
                        </div>
                        </b-jumbotron>
                </div>
              </div>
              <hr class="my-4">

              <b-form-group style="text-align:left" label="Nagody filmu" label-for="awardctorinput" description="" v-show='!toggleAwards'>
                <multiselect id="conentSelect" v-model="choosenAwards" :multiple="false" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz nagrody filmu.." :options="awards" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.nazwa }}</template>
                </multiselect>
              </b-form-group>
                 <div>
            <a @click='toggleAwards = !toggleAwards' v-show='!toggleAwards'> Brakuje odpowiedniej nagrody? <strong>Dodaj!</strong></a>
            <div v-show='toggleAwards'>
               <b-jumbotron>
                        <template slot="header">
                              <span style="font-size:50px">Dodaj nagrodę</span>
                        </template>

                        <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="awardName" type="text" placeholder="Nazwa nagrody"></b-form-input>
                          </b-form-group>
                        </div>

                        <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="awardDesc" type="text" placeholder="Opis nagrody"></b-form-input>
                          </b-form-group>
                        </div>

                         <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="awardPic" type="text" placeholder="Obrazek nagrody"></b-form-input>
                          </b-form-group>
                        </div>

                         <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="awardDesc2" type="text" placeholder="Opis 2 nagrody"></b-form-input>
                          </b-form-group>
                        </div>

                        <div>
                          <b-button variant="primary" @click="addAward">Dodaj</b-button>
                          <b-button variant="danger" @click='toggleAwards = !toggleAwards'>Wróć</b-button>
                        </div>
                        </b-jumbotron>
            </div>
          </div>
                <hr class="my-4">

              <b-form-group style="text-align:left" label="Kategoria wiekowa filmu" label-for="contentinput" description="" v-show='!toggleConent'>
                 <multiselect id="awardsSelect" v-model="choosenConent" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz kategorie wiekową..." :options="content" :searchable="false" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }">{{ option.nazwa }}</template>
                 </multiselect>
              </b-form-group>
              <div>
              <a @click='toggleConent = !toggleConent' v-show='!toggleConent'> Brakuje odpowiedniej kategorii wiekowej? <strong>Dodaj nową</strong></a>
              <div v-show='toggleConent'>

                        <b-jumbotron>
                            <template slot="header">
                              <span style="font-size:50px">Dodaj kategorie</span>
                            </template>
                        <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="contentName" type="text" placeholder="Nazwa kategorii wiekowej"></b-form-input>
                          </b-form-group>
                        </div>

                        <div>
                          <b-form-group style="text-align:left">
                            <b-form-input id="titleinput" v-model="contentDesc" type="text" placeholder="Opis kategorii"></b-form-input>
                          </b-form-group>
                        </div>

                        <div>
                          <b-button variant="primary" @click="addContent">Dodaj</b-button>
                          <b-button variant="danger" @click='toggleConent = !toggleConent'>Wróć</b-button>
                        </div>
                        </b-jumbotron>
             </div>
             </div>
                <hr class="my-4">

            <div>
              <b-button variant="primary " @click="addMovie">Edytuj</b-button>
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
import Datepicker from 'vuejs-datepicker';

export default {
   components: { Multiselect, Datepicker },
  name: 'NewMovie',
  data () {
    return {
      directorDate: Date.now(),
      directorName: '',
      directorSecond: '',

      movieDate: Date.now(),
      toggleGenre: false,
      toggleDirector: false,
      toggleConent: false,
      toggleAwards:false,

      choosenGenres: null,
      choosenDirectors: null,
      choosenAwards: null,
      choosenConent: null,

      contentName: '',
      contentDesc: '',


      awardName: '',
      awardDesc: '',
      awardPic: '',
      awardDesc2: '',

      genreName: '',
      genreDesc: '',
      title: '',
      description: '',

      genres: [],
      directors: [],
      awards: [],
      content: []
    }
  },
  mounted()
  {
    this.getGenres()
    this.getDirectors()
    this.getAwards()
    this.getContent()
  },
  methods: {
    async addMovie () {
      var genresIdArray = []
      this.choosenGenres.forEach(function(item){
          genresIdArray.push(item._id);
          console.log(item._id);
      })

      var awardsIdArray = []
      this.choosenAwards.forEach(function(item){
        awardsIdArray.push(item._id);
      })
      var directorID = this.choosenDirectors._id
      var contentID = this.choosenConent._id
      console.log(directorID)
      await MovieService.addMovie({
        nazwa: this.title,
        opis: this.description,
        nagrody: ['1','2'],
        gatunek: genresIdArray,
        rezyser: directorID,
        nagrody: awardsIdArray,
        kategoria_wiekowa: contentID,
        data_wydania: this.movieDate
      })
    this.$router.push({ name: 'Movies' });
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
    async addGenre()
    {
      await MovieService.addGenre({
        nazwa: this.genreName,
        opis: this.genreDesc
      })
      this.toggleGenre = false;
      this.getGenres();
    },
    async addDirector()
      {
        await MovieService.addDirector({
          imie: this.directorName,
          nazwisko: this.directorSecond,
          data_urodzenia: this.directorDate
        })
        this.toggleDirector = false;
        this.getDirectors();
      },
      customLabel(option) {
        return `${option.imie}  ${option.nazwisko}`
      },
    async addContent()
    {
      await MovieService.addContent({
        nazwa: this.contentName,
        opis: this.contentDesc
      })
      this.toggleConent = false;
      this.getContent()
    },
    async addAward()
    {
      await MovieService.addAward({
        nazwa: this.awardName,
        opis: this.awardDesc,
        obrazek: this.awardPic,
        opis_2: this.awardDesc2
      })
      this.toggleAwards = false;
      this.getAwards()
    },

  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style type="text/css">
.form input, .form textarea{
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}

.multiselect {
  width: 500px;
  padding: 10px;
  outline: none;
  font-size: 12px;
  display: inline-block;
 vertical-align: middle;
}
.datepicker{
  display:inline-block;
  margin:0 auto;
  vertical-align: middle;
}
.form div {
  margin: 10px;
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
 .border{
border:5px outset #454545;

      width:70%;
      display:inline-block;
      vertical-align: middle;
  }
</style>
<template>
  <div class="posts">
    <h1>Add Movie</h1>
      <div class="form">

        <div class="border">
            <div>
              <input type="text" name="title" placeholder="Tytuł filmu" v-model="title">
          </div>
            <div>
              <textarea rows="15" cols="15" placeholder="Opis" v-model="description"></textarea>
            </div>
          <div class="datepicker" style="text-align:left">
                    <label for="" style="text-align:left">Data produkcji</label>
                    <datepicker v-model="movieDate"  name="uniquename"></datepicker>
          </div>
        </div>
        

        <div class="border">
          <div>
               <multiselect id="directorSelect" v-model="choosenDirectors" :multiple="false" deselect-label="Can't remove this value" track-by="imie" :custom-label="customLabel" placeholder="Wybierz reżysera.." :options="directors" :searchable="true" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.imie }} {{option.nazwisko}}</strong></template>
              </multiselect>
          </div>
          <div>
          <a @click='toggleDirector = !toggleDirector'> Reżyser filmu nie istnieje w bazie? Dodaj go</a>
            <div v-show='toggleDirector'>
                <div>
                  <input type="text" name="directorName" placeholder="Imie reżysera" v-model="directorName">
                </div>
                 <div>
                  <input type="text" name="directorSecond" placeholder="Nazwisko reżysera" v-model="directorSecond">
                </div>
                <div class="datepicker" style="text-align:left">
                    <label for="" style="text-align:left">Data urodzenia</label>
                    <datepicker v-model="directorDate"  name="uniquename"></datepicker>
                </div>

                <div>
                  <button class="app_post_btn" @click="addDirector">Dodaj reżysera!</button>
                </div>
            </div>
          </div>
        </div>

        <div class="border">
          <div > 
            <multiselect id="genreSelect" v-model="choosenGenres" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz gatunki..." :options="genres" :searchable="false" :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.nazwa }}</strong></template>
            </multiselect>
       </div>

        <div id="GenreForm">
            <a @click='toggleGenre = !toggleGenre'> Nie ma twojego gatunku? Kliknij tutaj</a>
            <div v-show='toggleGenre'>
                <div>
                  <input type="text" name="genreName" placeholder="Nazwa gatunku" v-model="genreName">
                </div>
                 <div>
                  <input type="text" name="genreDesc" placeholder="Opis gatunku" v-model="genreDesc">
                </div>
                <div>
                  <button class="app_post_btn" @click="addGenre">Dodaj gatunek!</button>
                </div>
            </div>
        </div>
        </div>

        <div class="border">
          <div>
             <multiselect id="conentSelect" v-model="choosenConent" :multiple="false" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz kategorie wiekową.." :options="content" :allow-empty="false">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.nazwa }}</strong></template>
              </multiselect>
          </div>

          <div>
            <a @click='toggleConent = !toggleConent'> Brakuje odpowiedniej kategorii wiekowej? *CLICK*</a>
            <div v-show='toggleConent'>
                <div>
                  <input type="text" name="contentName" placeholder="Kategoria" v-model="contentName">
                </div>
                 <div>
                  <input type="text" name="contentDesc" placeholder="Opis kategorii" v-model="contentDesc">
                </div>
                <div>
                  <button class="app_post_btn" @click="addContent">Dodaj!</button>
                </div>
            </div>
          </div>
        </div>

        <div class="border">
          <div>
             <multiselect id="awardsSelect" v-model="choosenAwards" :multiple="true" deselect-label="Can't remove this value" track-by="nazwa" label="nazwa" placeholder="Wybierz nagrody flimu..." :options="awards" :searchable="false" :allow-empty="false">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.nazwa }}</strong></template>
            </multiselect>
          </div>

          <div>
            <a @click='toggleAwards = !toggleAwards'> Brakuje odpowiedniej nagrody? *CLICK*</a>
            <div v-show='toggleAwards'>
                <div>
                  <input type="text" name="contentName" placeholder="Kategoria" v-model="awardName">
                </div>
                 <div>
                  <input type="text" name="contentDesc" placeholder="Opis kategorii" v-model="awardDesc">
                </div>
                <div>
                  <input type="text" name="contentDesc" placeholder="Zdjecie" v-model="awardPic">
                </div>
                <div>
                  <input type="text" name="contentDesc" placeholder="Opis2 kategorii" v-model="awardDesc2">
                </div>
                <div>
                  <button class="app_post_btn" @click="addAward">Dodaj!</button>
                </div>
            </div>
          </div>
        </div>
        

        

        <div>
          <button class="app_post_btn" @click="addMovie">Add</button>
        </div>
      </div>
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
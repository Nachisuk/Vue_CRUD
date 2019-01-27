<template lang="html">

<div id="app">

  <b-row>
        <b-col></b-col>
        <b-col cols="10">
              <b-form-row>
                  <b-col>
                  <b-form-input id="titleinput" v-model="searchText" type="text" placeholder="Szukaj..."></b-form-input>
                  </b-col>
                <b-col>
                  <b-form-select v-model="firstOption">
                    <option v-for="(item, index) in list">{{ index }}</option>
                  </b-form-select>
                </b-col>
                <b-col>
                   <b-form-select v-model="secondOption" v-if="firstOption">
                      <option v-for="option in list[firstOption]">{{option.pole}}</option>
                  </b-form-select>
                </b-col>
             </b-form-row>
        </b-col>
        <b-col></b-col>
    </b-row>
            <div style="margin-top:20px">
                <b-button @click="Search" variant="primary" :size="lg">Szukaj</b-button>
            </div>
 
<div v-show='searchMovie'>
<div v-if="movies.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opis</td>
                    <td>Data Wydania</td>
                    <td>Autor</td>
                    <td>Gatunek</td>
                    <td>Nagrody</td>
                    <td>Kategoria</td>
                    <td>Akcja</td>
                </tr>

                <tr v-for="movie in movies" :key="movie.id">
                     <td><span v-if="movie.nazwa !== null">{{ movie.nazwa }}</span></td>
                     <td><span v-if="movie.opis !== null">{{ movie.opis }}</span></td>
                     <td><span v-if="movie.data_wydania !== null">{{ movie.data_wydania }}</span></td>
                     <td><span v-if="movie.reżyser">{{movie.reżyser.imie+" "+movie.reżyser.nazwisko}} </span></td>
                     <td><span v-for="genre in movie.gatunek" :key="genre.id">{{genre.nazwa+", "}} </span></td>
                     <td> <span v-for="award in movie.nagrody" :key="award.id">{{award.nazwa+", "}}</span></td>
                     <td><span v-if="movie.kategoria_wiekowa">{{movie.kategoria_wiekowa.nazwa}}</span></td>
                     <td align="center">
                        <router-link v-bind:to="{ name: 'UpdateMovie', params: { id: movie._id } }">Edit</router-link> |
                        <a href="#" @click="deleteMovie(movie._id)">Delete</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
           Brak wyników wyszukiwania <br /><br />
        </div>
</div>
</div>

</div>

</template>

<script lang="js">
import MovieService from '@/services/MovieService'
  export default  {
    name: 'search',
    props: [],
    mounted() {

    },
    data() {
      return {
        searchText: '',
        firstOption: null,
        secondOption: null,
        list: {
          'Filmy': [{size:'Film',pole:'Nazwa'},{size:'Film',pole:'Opis'},{size:'Film',pole:'Reżyser'},
          {size:'Film',pole:'Gatunek'},{size:'Film',pole:'Nagrody'},{size:'Film',pole:'Kategoria wiekowa'},
          {size:'Film',pole:'Data wydania'},],
          'Reżyserzy': [{size:'Reżyser',pole:'Imie'},{size:'Reżyser',pole:'Nazwisko'},{size:'Reżyser',pole:'Data urodzenia'}],
          'Gatunki': [{size:'Gatunek',pole:'Nazwa'},{size:'Gatunek',pole:'Opis'}],
          'Kategorie wiekowe': [{size:'Kategoria',pole:'Nazwa'}],
          'Nagrody': [{size:'Nagroda',pole:'Nazwa'}],
        },
        movies: [],
        searchMovie: false,

      }
    },
    methods: {
      async Search(){
          console.log(this.firstOption+" przerwa "+this.secondOption);
          switch(this.firstOption){
            case "Filmy":
             console.log("1 "+this.secondOption);
             const response = await MovieService.searchMovie({
               tabela: this.secondOption,
               search: this.searchText
             })
             this.movies = response.data.movies
             this.searchMovie = true;
             console.log(this.movies);
            break;
            case "Reżyserzy":
            console.log("2 "+this.secondOption);
            break;
            case "Gatunki":
            console.log("3 "+this.secondOption);
            break;
            case "Kategorie wiekowe":
            console.log("4 "+this.secondOption);
            break;
            case "Nagrody":
            console.log("5 "+this.secondOption);
            break;
            default:
            console.log('omega')
          }
      },
    },
    computed: {

    }
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style >

</style>

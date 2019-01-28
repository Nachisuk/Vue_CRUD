<template lang="html">
	<div id="app" class="container">
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
			<div v-if="movies.length > 0" class="row ">
				<div v-for="movie in movies" :key="movie.id" class="col-md-6 col-lg-4">
					<transition name="fade">
						<div class="moviecard">
							<div v-if=movie.nazwa class="movie-title">
                {{movie.nazwa}}              
								<span v-if=movie.data_wydania class="movie-year">{{movie.data_wydania | moment("YYYY") }}</span>
							</div>
							<div class="movie-details">
								<span v-if=movie.kategoria_wiekowa class="movie-rating">{{movie.kategoria_wiekowa.nazwa}}</span>
								<span class="movie-genre">
									<a v-for="genre in movie.gatunek" :key="genre.id" >
										<a style="text-decoration: underline;">{{genre.nazwa}}</a>
										<a>{{" "}}</a>
									</a>
								</span>
								<br>
								<br>
								<b-img v-if="movie.plakat==null" thumbnail fluid-grow src="https://www.flixdetective.com/web/images/poster-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
								<b-img v-else-if="movie.plakat===''" thumbnail fluid-grow src="https://www.flixdetective.com/web/images/poster-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
								<b-img v-else thumbnail fluid-grow :src="movie.plakat" alt="Thumbnail" style="max-width: 270px;" />
							</div>
							<div v-if=movie.reżyser class="movie-castcrew">
								<span class="title">Reżyser</span>
								<span class="name">{{movie.reżyser.imie + ' ' + movie.reżyser.nazwisko}}</span>
							</div>
							<div v-if="movie.nagrody.length>0" class="movie-castcrew">
								<span class="title">Nagrody</span>
								<span class="name">
									<a v-for="award in movie.nagrody" :key="award.id" >{{award.nazwa+" "}}</a>
								</span>
							</div>
							<div v-if=movie.opis class="movie-synopsis">
                {{movie.opis}}
              </div>
							<div>
								<router-link v-bind:to="{ name: 'UpdateMovie', params: { id: movie._id } }">
                  Edytuj
                </router-link> | <a href="#" @click="deleteMovie(movie._id)">
                  Usuń
                </a>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<div v-else class="row">
				<div style="margin-bottom: 20px; margin-top: 20px;">
          Brak wyników wyszukiwania filmów.
        </div>
			</div>
		</div>
		<div v-show='searchDirectors'>
			<div v-if="directors.length >0" class="row">
				<div v-for="director in directors" :key="director._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
					<b-card>
						<h4 slot="header">{{director.imie +' '+director.nazwisko}}</h4>
						<b-card-body>
							<p class="card-text">
								<b>Datan urodzenia: </b>{{ director.data_urodzenia | moment("DD.MM.YYYY r.")}}          
							</p>
						</b-card-body>
						<div slot="footer">
							<router-link v-bind:to="{ name: 'EditDirector', params: { id: director._id } }">Edytuj</router-link> | 
							<a href="#" @click="deleteDirector(director._id)">Usuń</a>
						</div>
					</b-card>
				</div>
			</div>
			<div v-else class="row">
				<div style="margin-bottom: 20px; margin-top: 20px;">
          Brak wyników wyszukiwania reżyserów
        </div>
			</div>
		</div>

		<div v-show='searchAwards'>
			<div v-if="awards.length > 0" class="row">
				<div v-for="award in awards" :key="award._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
					<b-card>
						<h4 slot="header">{{ award.nazwa }}</h4>
						<b-card-body>
							<p class="card-text">
								<b-img v-if="award.obrazek==null" thumbnail fluid-grow src="https://www.tatahousing.in/images/award-placeholder.png" alt="Thumbnail" style="max-width: 270px;" />
								<b-img v-else-if="award.obrazek===''" thumbnail fluid-grow src="https://www.tatahousing.in/images/award-placeholder.png" alt="Thumbnail" style="max-width: 270px; background-color:#E8E8E8;" />
								<b-img v-else thumbnail fluid-grow :src="award.obrazek" alt="Thumbnail" style="max-width: 270px;" />
								<br>
								<br>
                {{ award.opis}}           
							</p>
						</b-card-body>
						<div slot="footer">
							<router-link v-bind:to="{ name: 'EditAward', params: { id: award._id } }">Edytuj</router-link> | 
							<a href="#" @click="deleteAward(award._id)">Usuń</a>
						</div>
					</b-card>
				</div>
			</div>
			<div v-else class="row">
				<div style="margin-bottom: 20px; margin-top: 20px;">
          Brak wyników wyszukiwania nagrody
        </div>
			</div>
		</div>

		<div v-show='searchGenres'>
			<div v-if="genres.length >0" class="row">
				<div v-for="genre in genres" :key="genre._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
					<b-card>
						<h4 slot="header">{{ genre.nazwa }}</h4>
						<b-card-body>
							<p class="card-text">
                {{ genre.opis}}
              </p>
						</b-card-body>
						<div slot="footer">
							<router-link v-bind:to="{ name: 'EditGenre', params: { id: genre._id } }">Edytuj</router-link> | 
							<a href="#" @click="deleteGenre(genre._id)">Usuń</a>
						</div>
					</b-card>
				</div>
			</div>
			<div v-else class="row">
				<div style="margin-bottom: 20px; margin-top: 20px;">
          Brak wyników wyszukiwania gatunku
        </div>
			</div>
		</div>
		
		<div v-show='searchContent'>
			<div v-if="content.length > 0" class="row">
	      <div v-for="content1 in content" :key="content._id" class="col-md-6 col-lg-4" style="margin-bottom: 20px; margin-top: 20px;">
		      <b-card >
			      <h4 slot="header">{{content1.nazwa }}</h4>
			      <b-card-body>
				      <p class="card-text">
                {{content1.opis}}
              </p>
			      </b-card-body>
			      <div slot="footer">
				      <router-link v-bind:to="{ name: 'EditContent', params: { id: content1._id } }">Edytuj</router-link> | 
				      <a href="#" @click="deleteContent(content1._id)">Usuń</a>
			      </div>
		      </b-card>
	      </div>
      </div>
      <div v-else class="row">
				<div style="margin-bottom: 20px; margin-top: 20px;">
          Brak wyników wyszukiwania kategorii wiekowych.
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
        directors: [],
        awards: [],
        genres: [],
        content: [],
        searchMovie: false,
        searchDirectors: false,
        searchAwards: false,
        searchGenres: false,
        searchContent: false
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
             this.searchAwards = this.searchContent = this.searchDirectors = this.searchGenres = false;
             console.log(this.movies);
            break;
            case "Reżyserzy":
            console.log("2 "+this.secondOption);
             const response1 = await MovieService.searchDirector({
               tabela: this.secondOption,
               search: this.searchText
             })
             this.directors = response1.data.directors
             this.searchDirectors = true;
             this.searchAwards = this.searchContent = this.searchMovie = this.searchGenres = false;
             console.log(this.directors)
            break;
            case "Gatunki":
            const response3 = await MovieService.searchGenre({
               tabela: this.secondOption,
               search: this.searchText
             })
             this.genres = response3.data.genres
             this.searchGenres = true;
             this.searchAwards = this.searchContent = this.searchDirectors = this.searchMovie = false;
            break;
            case "Kategorie wiekowe":
            const response4 = await MovieService.searchContent({
               tabela: this.secondOption,
               search: this.searchText
             })
             this.content = response4.data.content
             this.searchContent = true;
             this.searchAwards = this.searchMovie = this.searchDirectors = this.searchGenres = false;
            break;
            case "Nagrody":
            const response2 = await MovieService.searchAwards({
               tabela: this.secondOption,
               search: this.searchText
             })
             this.awards = response2.data.awards
             this.searchAwards = true;
             this.searchMovie = this.searchContent = this.searchDirectors = this.searchGenres = false;
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
<style>
.moviecard {
  font-family: 'Helvetica', sans-serif, 'Ariel';
  position: relative;
  background: #ffffff;
  color: #555555;
  margin: 25px auto;
  width: 100%;
  max-width: 900px;
  min-height: 250px;
  padding: 20px 20px 20px 20px;
  -moz-box-shadow: -5px 5px 15px;
  -webkit-box-shadow: -5px 5px 15px;
  box-shadow: -5px 5px 15px;
  border-radius: 5px;
}
.moviecard #movie-content {
  opacity: 1;
  width: 100%;
  display: table;
  transition: all 500ms ease-out;
  position: relative;
}
.moviecard .movie-title {
  font-size: 30px;
  padding-bottom: 6px;
  color: #333333;
}
.moviecard .movie-title .movie-year {
  margin-left: 6px;
  font-size: 14px;
}
.moviecard .movie-title a {
  color: #333333;
  text-decoration: none;
}
.moviecard .movie-title a:hover {
  color: #858585;
}
.moviecard .movie-details {
  font-size: 10px;
  padding-bottom: 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid #dbdbdb;
}
.moviecard .movie-details span {
  padding: 0px 6px;
  border-right: 1px solid #dbdbdb;
}
.moviecard .movie-details span:last-child {
  border: none;
}
.moviecard .movie-castcrew {
  font-size: 14px;
  padding-top: 12px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.moviecard .movie-castcrew span.title {
  color: #333333;
  display: inline-block;
  width: 80px;
  font-weight: 600;
}
.moviecard .movie-synopsis {
  font-size: 14px;
  margin: 24px 0px;
  padding-top: 24px;
  border-top: 1px solid #dbdbdb;
  word-wrap: break-word;
  overflow-y: hidden;
  width: 100%;
}
.moviecard .movie-ratings {
  position: absolute;
  right: 0px;
}
.moviecard .movie-ratings span.star {
  display: inline-block;
  margin-right: 12px;
  color: #F0DE00;
  font-size: 36px;
}
.moviecard .movie-ratings span.score {
  font-size: 30px;
  color: #333333;
}

</style>
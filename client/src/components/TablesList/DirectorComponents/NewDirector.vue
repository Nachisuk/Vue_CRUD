<template>
  <div class="posts">
    <h1>Stwórz nową nagrodę</h1>
    <b-container class="">
    <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form>
               <b-form-group style="text-align:left" label="Imie reżysera" label-for="titleinput" description="">
                <b-form-input id="titleinput" v-model="imie" type="text" placeholder="Imie"></b-form-input>
               </b-form-group>  

               <b-form-group style="text-align:left" label="Nazwisko reżysera" label-for="titleinput" description="">
                <b-form-input id="titleinput" :rows="3" v-model="nazwisko" type="text" placeholder="Nazwisko"></b-form-input>
               </b-form-group> 

                <b-form-group style="text-align:left" label="Data urodzenia reżysera" label-for="datainput" description="Wybierz date">
                  <datepicker v-model="data_urodzenia"  name="uniquename" bootstrap-styling="true"></datepicker>
              </b-form-group>  

          </b-form>
            <div>
                <b-button @click="addDirector" variant="primary">Dodaj</b-button>
            </div>
        </b-col>
        <b-col></b-col>
    </b-row>
</b-container>
  
  </div>
</template>

<script>
import MovieService from '@/services/MovieService'
import Datepicker from 'vuejs-datepicker';
export default {
  components: {Datepicker },
  name: 'NewAward',
  data () {
    return {
        imie: '',
        nazwisko: '',
        data_urodzenia: Date.now(),
    }
  },
  mounted () {

  },
  methods: {
    async addDirector(){
      await MovieService.addDirector({
          imie: this.imie,
          nazwisko: this.nazwisko,
          data_urodzenia: this.data_urodzenia,
      })
    this.$router.push({ name: 'DirectorsList' });
    }

  }
}
</script>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style type="text/css">
</style>
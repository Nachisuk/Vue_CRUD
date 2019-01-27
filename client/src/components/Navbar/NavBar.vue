<template>
 <b-navbar toggleable="md" type="dark" variant="primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">MyMoviesList</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
    <router-link  v-bind:to="{name: 'Movies'}"><b-nav-text>Filmy</b-nav-text></router-link>
    <b-nav-item href="#" disabled> </b-nav-item>
    <router-link  v-bind:to="{name: 'GenresList'}"><b-nav-text>Gatunki</b-nav-text></router-link>
    <b-nav-item href="#" disabled> </b-nav-item>
    <router-link  v-bind:to="{name: 'DirectorsList'}"><b-nav-text>Reżyserzy</b-nav-text></router-link>
    <b-nav-item href="#" disabled> </b-nav-item>
    <router-link  v-bind:to="{name: 'AwardsList'}"><b-nav-text>Nagrody</b-nav-text></router-link>
    <b-nav-item href="#" disabled> </b-nav-item>
    <router-link  v-bind:to="{name: 'ContentRating'}"><b-nav-text>Kategorie wiekowe</b-nav-text></router-link>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
          <router-link  v-bind:to="{name: 'Search'}"><b-nav-text>Szukaj</b-nav-text></router-link>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style>
   a {
    text-decoration: none;
    }
</style>


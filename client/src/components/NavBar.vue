<template>
 <b-navbar toggleable="md" type="dark" variant="primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">MyMoviesList</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
    <router-link  v-bind:to="{name: 'Movies'}"><b-nav-text>Filmy</b-nav-text></router-link>
      <b-nav-item href="#">Reżyserzy</b-nav-item>
      <b-nav-item href="#">Gatunki</b-nav-item>
      <b-nav-item href="#">Nagrody</b-nav-item>
      <b-nav-item href="#">Kategorie wiekowe</b-nav-item>
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


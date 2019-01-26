<template>
  
  <div>
    <NavBar></NavBar>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/NavBar'
export default {
  name: 'App',
  components:{
    'NavBar': Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
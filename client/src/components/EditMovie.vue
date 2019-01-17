<template>
  <div class="posts">
    <h1>Edit Movie 1</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="Nazwa" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="Opis" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Edytuj</button>
        </div>
      </div>
  </div>
</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  name: 'EditMovie',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  mounted () {
    this.getMovie()
  },
  methods: {
    async getMovie () {
      const response = await MovieService.getMovie({
        id: this.$route.params.id
      })
      this.title = response.data.nazwa
      this.description = response.data.opis
    },
    async updatePost () {
      await MovieService.updateMovie({
        id: this.$route.params.id,
        nazwa: this.title,
        opis: this.description
      })
      this.$router.push({ name: 'Movies' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
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
</style>
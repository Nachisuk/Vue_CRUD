<template>
<div>
  <h1>Kategorie wiekowe</h1>
      <div v-if="contents.length > 0" class="table-wrap">
          <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opis</td>
                </tr>

                <tr v-for="content in contents" :key="content._id">
                     <td>{{content.nazwa }}</td>
                     <td>{{content.opis}}</td>                  
                     <td align="center">
                        <a href="#">Edit</a>|
                        <a href="#">Delete</a>
                    </td>
                </tr>
            </table>
      </div>
      <div v-else>
            There are no content ratings.. Lets add one now <br /><br />
        <router-link v-bind:to="{ name: 'NewMovie' }" class="add_post_link">Add Movie</router-link>
        </div>
</div>

</template>

<script>
import MovieService from '@/services/MovieService'
export default {
  
  name: 'ContentRating',
  data()
  {
    return {
      contents: []
    }
  },
  mounted()
  {
    this.getContent()
  },
  methods:{
    async getContent(){
      const response = await MovieService.fetchContent()
      this.contents = response.data.content
    }
  }

}
</script>

<style>
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
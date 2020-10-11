<template>
  <v-app id="item">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
  }),
    created: function () {
    axios.interceptors.response.use(null, error => {
      if (error.response.status === 401) {
        this.$store.dispatch("AUTH_LOGOUT")
        .then(()=>{
          window.localStorage.removeItem("vuex")
          this.$router.push('/');
        })
        .catch(()=>{
          this.$router.push('/');
        })
      }
      else if(error.response.status === 403){
        this.$store.dispatch("AUTH_LOGOUT")
        .then(()=>{
          window.localStorage.removeItem("vuex")
          this.$router.push('/');
        })
        .catch(()=>{
          this.$router.push('/');
        })
      }
      return Promise.reject(error);
    });
  },
};
</script>


<style>
 /* @font-face{
    font-family: 'AirbnbCereal';
    src: local('AirbnbCereal'), 
          url(./fonts/AirbnbCerealBook.ttf);
  }   */

  *{
    font-family: 'Roboto', sans-serif;
  }
</style>
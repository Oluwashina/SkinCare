<template>
  <v-app id="item">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
  }),
};
</script>


<style>
@font-face{
    font-family: 'AirbnbCereal';
    src: local('AirbnbCereal'), 
          url(./fonts/AirbnbCerealBook.ttf);
  }  
  *{
    font-family: 'AirbnbCereal';
  }
 
  
</style>
<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
  name: 'mainlayout',
  components: {
    Navbar,
  },
  data: () => ({
    
  }),
   created: function () {
    }
   
};
</script>
<style  scoped>
 
</style>
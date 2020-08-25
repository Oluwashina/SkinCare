<template>
 <div>
    <nav>
      <v-app-bar app height='60px' flat color="white">
        <v-app-bar-nav-icon class="hidden-md-and-up" style="color: #F7941D;" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <h3 class="ma-3">SkinCare</h3> -->
        <img src="/logo.png" class="logo" width="79" height="65"/>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-3" @click="markNotification()">
          <v-badge color="#F7941D" top overlap >
            <template v-slot:badge>3</template>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon class="ma-3">
            <v-icon @click="logout()" color="#F7941D">
              mdi-power-standby
            </v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        app
        style=""
        >
    

        <v-layout column align-center>
          <v-flex class="mt-3">
              <div class="mt-3">
                <v-list-item-avatar  size="100">
                  <v-img src="/casual.png" ></v-img>
                </v-list-item-avatar>
              </div>
            
          </v-flex>
        </v-layout>

        <v-layout column align-center>
          <v-flex class="white--text" dark>
              <v-list-item link class="">
                  <v-list-item-content>
                      <v-list-item-title class="text-center black--text">Welcome,Admin</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-flex>
        </v-layout>
        
        <v-list dense class="mt-4">
          <v-list-item router-link to="/dashboard" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
                Dashboard
            </v-list-item-title> 
          </v-list-item>
          
          <v-list-item router-link to="/" >
            <v-list-item-icon>
              <v-icon color="#F7941D">mdi-stack-overflow</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Products
            </v-list-item-title> 
          </v-list-item>
          <v-list-item router-link to="/" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-alert-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
                Skin Issues
            </v-list-item-title> 
          </v-list-item>
          <v-list-item router-link to="/" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-battlenet</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Bespoke Cosmetics
            </v-list-item-title> 
          </v-list-item> 
           <v-list-item router-link to="/" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-message-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
             Requested Products
            </v-list-item-title> 
          </v-list-item> 
            <v-list-item router-link to="/" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Questionnaires
            </v-list-item-title> 
          </v-list-item> 
            <v-list-item router-link to="/" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-power-standby</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Log Out
            </v-list-item-title> 
          </v-list-item> 
        </v-list>
        <div style="margin-top: 80px;">
            <div class="text-center">
                <button class="btn btn-add">Add New Product</button>
            </div> 
        </div>
       
      </v-navigation-drawer>
  </nav>
 </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data: () => ({
        drawer: null,
        notificationDialog:false,
    }),
    methods:{
      logout(){
        this.$router.push('/')
      },
    },
    created(){
       this.$vuetify.theme.light = true
    }
  }
</script>

<style scoped>
.v-list .v-list-item--active{
  border-right: 5px solid #F7941D;
  background-color: #FFDAAE;
}
.v-list-item{
  text-decoration: none;
}
.theme--light.v-list{
  color: #4E4B46;
}
.btn-add{
  background: #F7941D;
  border-radius: 30px;
  color: white;
  padding: 10px 40px;
  font-size: 15px;
}

</style>

<template>
 <div>
    <nav>
      <v-app-bar app height='60px' flat color="white">
        <v-app-bar-nav-icon class="hidden-md-and-up" style="color: #F7941D;" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <h3 class="ma-3">SkinCare</h3> -->
        <img src="/logo.png" class="logo" width="79" height="65"/>
        <v-spacer></v-spacer>
        <!-- <v-btn icon class="ma-3" @click="markNotification()">
          <v-badge color="#F7941D" top overlap >
            <template v-slot:badge>3</template>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn> -->
         <v-menu  offset-y>
          <template v-slot:activator="{ on }">
             <v-btn icon @click="MarkRead()" v-on="on" class="ma-3">
          <v-badge color="#F7941D" top overlap >
            <template v-slot:badge>{{Count}}</template>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
          </template>
          <v-card
          max-width="400"
          style="overflow: auto; height: 450px;"
          >
          
      
    <v-list
      subheader
      two-line
    >
    <div style="display: flex; justify-content: space-between;">
      <p class="pt-4 pl-4" style="font-weight: bold; font-size: 15px;">RECENT UPDATES</p>
        <router-link to="/notifications" class="pt-4 pr-4" style="text-decoration: none; color: #F7941D;" >View more <i class="mdi mdi-chevron-right"></i></router-link>
    </div>
      

      <v-list-item
        v-for="folder in Notifications"
        :key="folder.id"
      >
        <v-list-item-avatar style="background: #F0F0F0; color: #F7941D;">
            {{folder.messageFromFirstname.charAt(0).toUpperCase()}} {{folder.messageFromLastname.charAt(0).toUpperCase()}}
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="folder.message"></v-list-item-title>

          <!-- time -->
          <v-list-item-subtitle v-text="folder.createdAt"></v-list-item-subtitle>
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action> -->
         <div class="mt-2" v-if="Notifications.length===0" style="width: 400px;">
             <h6 class="text-center" style="font-style: italic;">No new updates yet.</h6>            
          </div>

      </v-list-item>
      
    </v-list>
        
          </v-card>
        </v-menu>
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
                  <v-img src="/avatar.png" ></v-img>
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
          
          <v-list-item router-link to="/products" >
            <v-list-item-icon>
              <v-icon color="#F7941D">mdi-stack-overflow</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Products
            </v-list-item-title> 
          </v-list-item>
          
          <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            prepend-icon="mdi-cart-variant"
            color="#F7941D"
            :append-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link 
              router :to ="child.route"
                
            >
              <v-list-item-action v-if="child.icon">
                <v-icon color="#F7941D">{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"  
            link       
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
          
          <v-list-item router-link to="/skinissues" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-alert-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
                Skin Issues
            </v-list-item-title> 
          </v-list-item>
          <v-list-item router-link to="/bespoke" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-battlenet</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Bespoke Cosmetics
            </v-list-item-title> 
          </v-list-item> 
           <v-list-item router-link to="/requestedproducts" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-message-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
             Requested Products
            </v-list-item-title> 
          </v-list-item> 
            <v-list-item router-link to="/adverts" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-angularjs</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
             Adverts
            </v-list-item-title> 
          </v-list-item> 
           <v-list-item router-link to="/admin" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-account-tie-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
             Admins
            </v-list-item-title> 
          </v-list-item> 
            <v-list-item router-link to="/questionnaire" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Questionnaires
            </v-list-item-title> 
          </v-list-item> 
          <v-list-item router-link to="/faq" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-frequently-asked-questions</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              FAQ
            </v-list-item-title> 
          </v-list-item>
            <v-list-item @click="logout()" >
            <v-list-item-icon>
                <v-icon color="#F7941D">mdi-power-standby</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-size:14px" >
              Log Out
            </v-list-item-title> 
          </v-list-item> 
        </v-list>
        <div style="margin-top: 50px;">
            <div class="text-center">
                 <router-link to="/products/new" class="btn-add" style="text-decoration: none; color:white;">Add New Product</router-link>
            </div> 
        </div>
       
      </v-navigation-drawer>
  </nav>
 </div>
</template>

<script>
import moment from 'moment'
  export default {
    name: 'Navbar',
    data: () => ({
        drawer: null,
        notificationDialog:false,
         items: [
        {
          icon: 'mdi-chevron-down',
          'icon-alt': 'mdi-chevron-down',
          text: 'Orders',
          model: false,
          children: [
            { icon: 'mdi-order-bool-ascending-variant', text: 'New Orders', route: '/neworders' },
            { icon: 'mdi-order-bool-ascending-variant', text: 'Dispatched Orders', route: '/dispatchedorders' },
            { icon: 'mdi-order-bool-ascending-variant', text: 'Completed Orders', route: '/completedorders' },
          ],
        },
      ],
    folders: [
        {
          subtitle: '12:30pm',
          title: 'Ade just submitted a request for a product',
        },
        {
          subtitle: '09:30am',
          title: 'Ayomide John placed an order',
        },
        {
          subtitle: '13:23pm',
          title: 'Yomi Johnson requested for a product',
        },
      ],
   
    }),
    methods:{
      logout(){
         this.$store.dispatch("AUTH_LOGOUT")
        .then(()=>{
            window.localStorage.removeItem("vuex")
             this.$router.push('/')
        })
        .catch(()=>{
        }) 
      },
      MarkRead(){
        this.$store.dispatch("MarkNotification")
        .then(()=>{
           this.$store.dispatch("getNotifications")
        })
        .catch(()=>{

        })
      }
    },
    computed:{
      Notifications(){
         let notify =  this.$store.state.notification.unread
                for(let i=0; i<notify.length; i++){
                    notify[i].createdAt = moment(notify[i].createdAt).fromNow();
                }
            return notify
      },
      Count(){
        return this.$store.state.notification.unreadcount
      }
    },
    created(){
      this.$store.dispatch("getNotifications")
      .then((success)=>{
        console.log(success)
      })
      .catch(()=>{
      })
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
.v-list-item__title{
  color: #4E4B46;
}
.v-icon.v-icon {
  color: #F7941D !important;
}

</style>

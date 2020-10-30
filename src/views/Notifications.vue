<template>
  <v-container>
     <div class="container">   
         <h5 class="heading">Notifications</h5>
         <div class="row">
             <div class="col-lg-12">
                  <v-card
    class=""
    
  >
    <v-toolbar
      color="#F7941D"
      dark
    >
    
      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
      <v-btn icon
       v-bind="attrs"
          v-on="on"
          >
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
       </template>
      <span>Mark as read</span>
    </v-tooltip>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="active"
        multiple
      >
        <template v-for="(item, index) in Notifications">
          <v-list-item :key="item.id">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title> {{item.messageFromFirstname.charAt(0).toUpperCase() + item.messageFromFirstname.slice(1)}} {{item.messageFromLastname.charAt(0).toUpperCase() + item.messageFromLastname.slice(1)}}</v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>{{item.createdAt}}</v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="#F7941D"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>

       <div class="mt-2 mx-auto" v-if="Notifications.length===0">
             <h6 class="text-center" style="font-style: italic;">No new notifications yet.</h6>            
          </div>
          
         </v-list>
  </v-card>
             </div>

         </div>
     </div>
  </v-container>
</template>

<script>
// import moment from 'moment'
export default {
    data(){
        return{
             selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'Scrott Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
        }
    },
    computed: {
    Notifications(){
         let notify =  this.$store.state.notification.unread
            return notify
      },
    },
    created(){
     this.$store.dispatch("getUnreadNotifications")
      .then((success)=>{
        console.log(success)
      })
      .catch(()=>{
      })
    }
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.active{
    color:  rgba(0, 0, 0, 0.87) 
}

</style>
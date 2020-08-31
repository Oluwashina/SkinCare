<template>
  <v-container id="body">
    <div class="container">
      <h5 class="heading">DASHBOARD</h5>
      <div class="row">

        <!-- first column -->
        <div class="col-lg-8">
          <div class="row">

              <!-- first card -->
            <div class="col-lg-4">
              
              <v-card
                class=""
                max-width=""
              >
              
                <div class="pt-4 ml-4">
                  <v-icon color="#F7941D">mdi-stack-overflow</v-icon>
                </div>
                
           <v-card-title class="">Total Products</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">200</h6>
              </v-card-text>
                </v-card>
            </div>

              <!-- second card -->
             <div class="col-lg-4">
                 <v-card
                class=""
                max-width=""
              >
              
                <div class="pt-4 ml-4">
                  <v-icon color="#4DC503">mdi-bookmark-check</v-icon>
                </div>
                
           <v-card-title class="">Completed Orders</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">180</h6>
              </v-card-text>
                </v-card>
            </div>
            
            <!-- third card -->
             <div class="col-lg-4">
                 <v-card
                class=""
                max-width=""
              >
              
                <div class="pt-4 ml-4">
                  <v-icon color="#F7941D">mdi-calendar-clock</v-icon>
                </div>
                
           <v-card-title class="">Pending Orders</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">10</h6>
              </v-card-text>
                </v-card>
            </div>
          </div>

          <!-- new orders table -->
          <v-row justify="center">
          <v-col cols="12" md="12" sm="12">
            <v-card>
              <v-card-title>
                New Orders
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="Orders"
                hide-default-footer=""
                items-per-page = 5
                no-data-text='No new order placed yet'
              >
                <template v-slot:item.img_url="{ item }">
                  <v-img :src="getImageUrl(item.img_url)" height="60" width="80" class="ma-0" contain></v-img>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn text  @click="View(item._id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        
        </div>

        <!-- second column -->
        <div class="col-lg-4">
           <v-card
            max-width=""
            class="mx-auto"
             >
             <div class="pt-4 ml-4">
                  <v-icon color="#4DC503">mdi-account-multiple-outline</v-icon>
                </div>

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item
              v-else
              :key="item.title"
              
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
     </v-card>
        </div>

      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
       headers:[
            {
              text: 'Item Image',
              align: 'start',
              sortable: false,
              value: 'img_url',
            },
            {
              text: 'Name',
              align: 'start',
              sortable: false,
              value: 'name',
            },
            { text: 'Quantity', value: 'quantity' },
            { text: '', value: 'action', sortable: false, },
          ],
          Orders : [
            {
              name: 'Hair Glow Butter',
              quantity: 3,
              img_url: './cream2.png'
            },
             {
              name: 'Hair Glow Butter',
              quantity: 7,
              img_url: './cream.png'
            },
             {
              name: 'Hair Glow Butter',
              quantity: 9,
              img_url: './cream3.png'
            },
             {
              name: 'Hair Glow Butter',
              quantity: 7,
              img_url: './cream.png'
            },
             {
              name: 'Hair Glow Butter',
              quantity: 3,
              img_url: './cream3.png'
            },
        ],
      items: [
        { header: 'Recently Registered Users' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Ade Johnson',
          subtitle: "<span class='text--primary'>aliConnors@gmail.com</span> ",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Tolu Ola',
          subtitle: "<span class='text--primary'>AlexJennifer@gmail.com</span> ",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Tola Yen',
          subtitle: "<span class='text--primary'>sandraadams@yahoo.com</span> ",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ola jacob',
          subtitle: "<span class='text--primary'>TrevorHansen@gmail.com</span>",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Jane Yen',
          subtitle: "<span class='text--primary'>BrittaHolt@yahoo.com</span>",
        },
      ],
    }
  },
 methods:{
    getImageUrl(url){
        if(url){
          return url
        }else{
          return '/logo.png'
        }
  }
 }
}
 
</script>

<style scoped>
#body{
  /* background: #e5e5e5; */
}
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.v-sheet.v-card {
    border-radius: 10px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    /* box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.3); */
}
</style>

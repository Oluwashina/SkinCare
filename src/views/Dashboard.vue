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
                
           <v-card-title class="" style="font-size: 18px">Total Products</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">{{productCount}}</h6>
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
                
           <v-card-title class="" style="font-size: 18px">Completed Orders</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">{{completedOrder}}</h6>
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
                
           <v-card-title class="" style="font-size: 18px">Pending Orders</v-card-title>

              <v-card-text class="text--primary">
                <h6 class="heading" style="font-size: 25px">{{pendingOrder}}</h6>
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
                :items="NewOrders"
               
                no-data-text='No new order placed yet'
              >
                <template v-slot:item.imgUrl="{ item }">
                  <v-img :src="getImageUrl(item.imgUrl)" height="60" width="80" class="ma-0" contain></v-img>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn text  @click="View(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
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
            class="mx-auto mt-3"
             >
             <div class="pt-4 ml-4">
                  <v-icon color="#4DC503">mdi-account-multiple-outline</v-icon>
                </div>

        <v-list three-line>
          <template v-for="(item, index) in users" >
            <v-subheader 
            :key="index" 
              v-if="index === 0"
            class="my-2">Recently Registered Members</v-subheader>
            <v-divider
              :key="index"
                class="my-1"  
            ></v-divider>

            <v-list-item
              :key="item.id"
            >
              <v-list-item-avatar>
                <v-img :src="getImageUrl()"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.firstName+ ' ' + item.lastName"></v-list-item-title>
                <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
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
import moment from 'moment'
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
       headers:[
           { text: 'Order Date', value: 'createdAt' },
           {
              text: 'Customer name',
              align: 'start',
              sortable: false,
              value: 'firstName',
            },
            {
              text: 'Payment Id',
              align: 'start',
              sortable: false,
              value: 'paymentId',
            },
            {
              text: 'Status',
              align: 'start',
              sortable: false,
              value: 'status',
            },
            { text: '', value: 'action', sortable: false, },
          ],
         
      
    }
  },
  computed:{
    users(){
      return this.$store.state.auth.users
    },
    productCount(){
      return this.$store.state.products.productsLength
    },
     completedOrder(){
      return this.$store.state.orders.ordersCount.completedOrder
    },
    pendingOrder(){
      return this.$store.state.orders.ordersCount.pendingOrder
    },
     NewOrders(){
      let newOrder = this.$store.state.orders.neworders
                for(let i=0; i<newOrder.length; i++){
                    newOrder[i].createdAt = moment(newOrder[i].createdAt).format('LL')
                }
        return newOrder
    }
  },
 methods:{
    getImageUrl(url){
    if(url){
      return url
    }else{
      return '/avatar.png'
    }
  },
  View(id){
    this.$store.dispatch("OrderById", id)
      .then((success)=>{
          console.log(success)
          this.$router.push('/orders/'+id)
      })
      .catch(()=>{
      })
  }
 },
  created(){
    this.$store.dispatch("getUsers")
    .then((success)=>{
      console.log(success)
    })
    .catch(()=>{
    })
    this.$store.dispatch("getProductsCount")
    .then(()=>{
    })
    .catch(()=>{
    })
    this.$store.dispatch("ordersCount")
    .then((success)=>{
      console.log(success)
    })
    .catch(()=>{
    })
    this.$store.dispatch("NewOrders")
    .then((success)=>{
      console.log(success)
    })
    .catch(()=>{
    })
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

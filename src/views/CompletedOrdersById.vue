<template>
  <v-container>
      <div class="container">
           <h5 class="heading">Completed Order</h5>
           
            <div class="row">
              <div class="col-lg-12">
                  <v-card class="mt-4">
              <v-card-title>
                Product Ordered
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="Product"
                hide-default-footer
                no-data-text='No new order placed yet'
              >
                <template v-slot:item.productImgUrl="{ item }">
                  <v-img :src="getImageUrl(item.productImgUrl)" height="60" width="80" class="ma-0" contain></v-img>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn text  @click="View(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
                </template>
              </v-data-table>
            </v-card>
              </div>
            </div>


           <div class="row">
               <div class="col-lg-6">
                   <div class="card" style="height:310px">
                    <div class="card-body">
                      
                      <h5 class="card-title mt-3 mb-6" style="font-weight: bold; color: #F7941D;">Buyer Details</h5>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">First Name</span>: <span style="">{{Buyer.firstName}}</span> </h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Last Name</span>: <span>{{Buyer.lastName}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">State</span>: <span>{{Buyer.state}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">Shipping address</span>: <span>{{Buyer.address}}</span></h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Phone Number</span>: <span>{{Buyer.phoneNo}}</span></h6>
                        
                    </div>
                  </div>
               </div>
              
               <div class="col-lg-6">
                    <div class="card" style="height:310px">
                    <div class="card-body dispatch-body">
                          
                      <h5 class="card-title mt-3 mb-6" style="font-weight: bold; color: #F7941D;">Dispatcher Details</h5>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">Full Name</span>: <span style="">{{Dispatch.fullName}}</span> </h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Company</span>: <span>{{Dispatch.companyName}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Phone No</span>: <span>{{Dispatch.phoneNumber}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">ID</span>: <span>{{Dispatch.dispatcherId}}</span></h6>                      
                    </div>
                  </div>
               </div>
           </div>


            <!-- status -->
            <div class="mt-5 status">
                <h6 style="font-weight: bold; color: #4E4B46;" class="pt-5">Current Status</h6>
                <div class="row">
                    <div class="col-6">
                         <p>Order Completed</p>
                        <p class="mt-n3">Date: {{order.updatedAt}}</p>
                    </div>
                    <div class="col-6 text-right">
                        <i class="mdi mdi-check-decagram" style="color: #4DC503; font-size: 30px"></i>
                    </div>
                </div>
                
            </div>
      </div>
  </v-container>

</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
           headers:[
            {
              text: 'Item Image',
              align: 'start',
              sortable: false,
              value: 'productImgUrl',
            },
            {
              text: 'Product Name',
              align: 'start',
              sortable: false,
              value: 'productName',
            },
              {
              text: 'Product Category',
              align: 'start',
              sortable: false,
              value: 'productCategory',
            },
            { text: 'Price', value: 'productPrice' },
            { text: 'Quantity Ordered', value: 'quantitySelected' },
          ],
        }
    },
    methods:{
         getImageUrl(url){
        return url
      },
    },
    computed:{
       Product(){
        let order = this.$store.state.orders.orderById.order.products
        
        return order
      },
      order(){
        let order = this.$store.state.orders.orderById.order
        order.updatedAt = moment(order.updatedAt).format('LL')
        
        return order
      },
       Buyer(){
       let order = this.$store.state.orders.orderById.order.shippinDetails
        
        return order
      },
       Dispatch(){
        let order = this.$store.state.orders.orderById.dispatchDetails
        
        return order
      }
    }

}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.dispatch{
    background: #D9D7D7;
  border-top-left-radius: 10px; 
  border-bottom-left-radius: 10px;
   padding-left: 25px;
  padding-right: 25px; 
   border-right: 5px solid #F7941D;
}
.status{
    background: #D9D7D7;
  border-top-left-radius: 10px; 
  border-bottom-left-radius: 10px;
   padding-left: 25px;
  padding-right: 25px; 
   border-right: 5px solid#4DC503;
}

.card{
    border: 1px solid rgba(207, 203, 199, 0.25);
    border-radius: 10px;
}
.card-body {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(78, 75, 70, 0.25);
}
.dispatch-body{
    background: #D9D7D7;
    box-shadow: 0px 4px 4px rgba(78, 75, 70, 0.25);
}
</style>
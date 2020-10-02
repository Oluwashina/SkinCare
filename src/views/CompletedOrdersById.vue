<template>
  <v-container>
      <div class="container">
           <h5 class="heading">Completed Order</h5>
           <div class="row">
               <div class="col-lg-4">
                   <div class="card" style="height:310px">
                    <div class="card-body">
                        
                      <h5 class="card-title mt-3 mb-6" style="font-weight: bold; color: #F7941D;">Buyer Details</h5>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">First Name</span>: <span style="">{{Buyer.firstName}}</span> </h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Last Name</span>: <span>{{Buyer.lastName}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Email</span>: <span>{{Buyer.email}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">Shipping address</span>: <span>Shipping address: N0 8, oluyole aveue, oseikita Ado Ekiti, </span></h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Phone Number</span>: <span>{{Buyer.phoneNo}}</span></h6>
                        
                    </div>
                  </div>
               </div>
               <div class="col-lg-4">
                    <div class="card" style="height:310px">
                    <div class="card-body">
                        <div class="text-center">
                          <img :src="getImageUrl(Product.imgUrl)" alt="" height="138">
                        </div>
                        <h5 class="card-title mt-6 text-center" style="font-weight: bold; color: #F7941D;">Product Details</h5>
                        <h6 class="card-text mt-3  card-text-col"><span style="font-weight: bold;">Product name</span>: <span>{{Product.name}}</span> </h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Quantity Ordered</span>: <span>{{Product.quantityAvailable}}</span></h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Payment Status</span>: <span>{{order.status}}</span></h6>
                        
                    </div>
                  </div>
               </div>
               <div class="col-lg-4">
                    <div class="card" style="height:310px">
                    <div class="card-body dispatch-body">
                        
                      <h5 class="card-title mt-3 mb-6" style="font-weight: bold; color: #F7941D;">Dispatcher Details</h5>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">Full Name</span>: <span style="">{{Dispatch.fullName}}</span> </h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Company</span>: <span>{{Dispatch.companyName}}</span></h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Phone No</span>: <span>080234223344</span></h6>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">ID</span>: <span>{{Dispatch.phoneNumber}}</span></h6>                    
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

        }
    },
    methods:{
         getImageUrl(url){
        return url
      },
    },
    computed:{
       Product(){
        let order = this.$store.state.orders.orderById.productDetails
        
        return order
      },
      order(){
        let order = this.$store.state.orders.orderById.order
        order.updatedAt = moment(order.updatedAt).format('LL')
        
        return order
      },
       Buyer(){
        let order = this.$store.state.orders.orderById.userDetails
        
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
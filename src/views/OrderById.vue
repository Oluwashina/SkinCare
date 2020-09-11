<template>
 <v-container>
     <div class="container">    
        <h5 class="heading">Order Details</h5>
          <div class="row">
            <div class="col-lg-11">
              <div class="row mt-3">
            
                <div class="col-lg-6 mb-3">
                  <div class="card" style="height:310px">
                    <div class="card-body">
                        
                      <h5 class="card-title mt-3 mb-6 card-text-col" style="font-weight: bold;">Buyer Details</h5>
                      <h6 class="card-text  card-text-col"><span style="font-weight: bold;">First Name</span>: <span style="">{{order.name}}</span> </h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Last Name</span>: <span>{{order.quantity}}</span></h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Email</span>: <span>{{order.status}}</span></h6>
                      <h6 class="card-text  card-text-col"><span style="font-weight: bold;">Shipping address</span>: <span>{{order.status}}</span></h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Phone Number</span>: <span>{{order.status}}</span></h6>
                        
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 mb-3">
                  <div class="card" style="height:310px">
                    <div class="card-body">
                        <div class="text-center">
                          <img :src="getImageUrl(order.imgUrl)" alt="" height="138">
                        </div>
                        <h5 class="card-title  mt-6 card-text-col" style="font-weight: bold;">Product Details</h5>
                        <h6 class="card-text mt-3  card-text-col"><span style="font-weight: bold;">Product name</span>: <span>{{order.name}}</span> </h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Quantity Ordered</span>: <span>{{order.quantity}}</span></h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Payment Status</span>: <span>{{order.status}}</span></h6>
                        
                    </div>
                  </div>
                </div>
                
            </div>
            </div>
              
          </div>
          <div class="text-center mt-7">
            <button class="btn btn-orange"  >Dispatch Order</button>
          </div> 
        
     </div>
 </v-container>
</template>

<script>
export default {
    data(){
        return{
          
        }
    },
    computed:{
      order(){
        let order = this.$store.state.orders.orderById
        
        return order
      }
    },
    methods:{
      getImageUrl(url){
        return url
      },
      
      
    },
    
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.card{
    border: 1px solid rgba(207, 203, 199, 0.25);
}
.card-body {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(78, 75, 70, 0.25);
}
.btn-add{
    background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-orange {
  background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-orange:hover {
  background: #fff;
  box-shadow: 0px -2px 10px rgba(255, 255, 255, 0.14),
    0px 4.5px 10px rgba(255, 255, 255, 0.14);
  color: #F7941D;
  border: 1px solid #F7941D;
}
.btn-green {
  background: #4DC503;
  border-radius: 25px;
  color: #ffffff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #4DC503;
}

.card-text-col{
  color:#4E4B46;
}
</style>
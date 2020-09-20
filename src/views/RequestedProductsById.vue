<template>
 <v-container>
     <div class="container">    
        <h5 class="heading">Requested Product</h5>
          <div class="row">
            <div class="col-lg-10">
              <div class="row">
            
                <div class="col-lg-6 mb-3">
                  <div class="card" style="height:310px; width: 340px;">
                    <div class="card-body">
                        
                      <h5 class="card-title mt-3 mb-6" style="font-weight: bold; color: #F7941D;">Buyer Details</h5>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">First Name</span>: <span style="">Adekalo</span> </h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Last Name</span>: <span>Adenike</span></h6>
                      <h6 class="card-text  card-text-col mb-3"> <span style="font-weight: bold;">Email</span>: <span>adekalo@gmail.com</span></h6>
                      <h6 class="card-text  card-text-col mb-3"><span style="font-weight: bold;">Shipping address</span>: <span>N0 8, oluyole avenue, oseikita Ado Ekiti, </span></h6>
                      <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Phone Number</span>: <span>080123232122</span></h6>
                        
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 mb-3">
                  <div class="card" style="height:310px; width: 340px;">
                    <div class="card-body">
                        <div class="text-center">
                          <img :src="getImageUrl('/cream2.png')" alt="" height="138">
                        </div>
                        <h5 class="card-title mt-6 " style="font-weight: bold; color: #F7941D;">Product Details</h5>
                        <h6 class="card-text mt-3  card-text-col"><span style="font-weight: bold;">Product name</span>: <span>ALOPECIA AREATA</span> </h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Quantity Ordered</span>: <span>4</span></h6>
                        <h6 class="card-text  card-text-col"> <span style="font-weight: bold;">Payment Status</span>: <span>Payed</span></h6>
                        
                    </div>
                  </div>
                </div>
                
            </div>
            </div>
              
          </div>
  
          <div class="row">
            <div class="col-lg-9">

              <div class="form-group">
                <label for="description">Send Feedback</label>
                <textarea class="form-control" id="decription" rows="5"
                 v-model="description"
                  />
                  <div class="invalid-feedback">Please add a description</div>
            </div>
            <div class="text-center mt-6">
                <button class="btn btn-orange">Send</button>
            </div> 
            </div>
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
  padding: 10px 70px;
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
textarea{
   padding: 20px 20px;  
}
textarea:focus{
border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
.input-style {
  padding: 20px 20px;
  /* border-radius: 10px; */
}
.input-style:focus {
  border: none;
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}

.card-text-col{
  color:#4E4B46;
}
</style>
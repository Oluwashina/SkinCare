<template>
 <v-container>
     <div class="container">    
        <h5 class="heading">Order Details</h5>
          <div class="row">

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
            <div class="col-lg-10">
              <div class="row">
            
                <div class="col-lg-6">
                  <div class="card" style="">
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
                
            </div>
            </div>
              
          </div>
  
          <h5 class="heading mt-3">Dispatcher Information</h5>
          <div class="row">
            <div class="col-lg-10">
                  <div class="row">
                <div class="col-lg-6">
                  <form>
                      <div class="form-group">
                        <label for="email">Full Name</label>
                          <input
                            type="text"
                            class="form-control input-style"
                            id="fullname"
                            required
                            v-model="name"
                          v-bind:class="{'form-control' : true, 'is-invalid' : !validName(name) && nameBlured}"
                            v-on:blur="nameBlured = true"
                          
                          />
                           <div class="invalid-feedback">This field is required</div>
                      </div>
                      <div class="form-group">
                        <label for="email">Phone Number</label>
                          <input
                            type="tel"
                            class="form-control input-style"
                            id="phone"
                            required
                            v-model="phone"
                             v-bind:class="{'form-control' : true, 'is-invalid' : !validPhone(phone) && phoneBlured}"
                            v-on:blur="phoneBlured = true"
                          
                          />
                           <div class="invalid-feedback">This field is required</div>
                      </div>
                  </form>
                </div>
                <div class="col-lg-6">
                  <form>
                    <div class="form-group">
                      <label for="email">Dispatcher Company</label>
                        <input
                          type="text"
                          class="form-control input-style"
                          id="company"
                          required
                          v-model="company"
                           v-bind:class="{'form-control' : true, 'is-invalid' : !validCompany(company) && companyBlured}"
                            v-on:blur="companyBlured = true"
                        />
                          <div class="invalid-feedback">Company name is required</div>
                    </div>
                      <div class="form-group">
                      <label for="email">Dispatcher Id</label>
                        <input
                          type="text"
                          class="form-control input-style"
                          id="name"
                          required
                          v-model="dispatchId"
                           v-bind:class="{'form-control' : true, 'is-invalid' : !validId(dispatchId) && dispatchIdBlured}"
                            v-on:blur="dispatchIdBlured = true"
                        />
                          <div class="invalid-feedback">This field is required</div>
                    </div>
                  </form>
                </div>
              </div>
           <div class="text-center mt-5">
            <button :disabled="loading" class="btn btn-green" @click="Dispatch()">
              Dispatch Order
               <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
              </button>
          </div> 
            </div>
          </div>
         

         
        
     </div>
 </v-container>
</template>

<script>
import iziToast from 'izitoast'
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
          name: '',
          nameBlured: false,
          phone: '',
          phoneBlured: false,
          company: '',
          companyBlured: false,
          dispatchId: '',
          dispatchIdBlured: false,
          valid: false,
          valid1: false,
          valid2: false,
          valid3: false,
          loader: false,
          loading: false
          
        }
    },
    computed:{
     Product(){
        let order = this.$store.state.orders.orderById.order.products
        
        return order
      },
      order(){
        let order = this.$store.state.orders.orderById.order
        
        return order
      },
       Buyer(){
        let order = this.$store.state.orders.orderById.order.shippinDetails
        
        return order
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
      validName: function(name){
        return name
      },
      validPhone: function(phone){
        return phone
      },
       validCompany: function(company){
        return company
      },
       validId: function(dispatchId){
        return dispatchId
      },
      validateName: function(){
      this.nameBlured = true;
        if(this.validName(this.name)){
          this.valid = true
        }
      },
       validatePhone: function(){
      this.phoneBlured = true;
        if(this.validPhone(this.phone)){
          this.valid1 = true
        }
      },
       validateCompany: function(){
      this.companyBlured = true;
        if(this.validCompany(this.company)){
          this.valid2 = true
        }
      },
      validateId: function(){
      this.dispatchIdBlured = true;
        if(this.validId(this.dispatchId)){
          this.valid3 = true
        }
      },
      Dispatch(){
      this.validateName()
      this.validateCompany()
      this.validatePhone()
      this.validateId()
      if(this.valid == true && this.valid1 == true && this.valid2 == true && this.valid3 == true){
          this.loader = true
          this.loading = true
          this.$store.dispatch("DispatchOrder", {
            "fullName": this.name,
            "companyName": this.company,
            "phoneNumber":this.phone,
            "orderId":  this.$store.state.orders.orderById.order.id,
            "dispatcherId": this.dispatchId
          })
          .then(()=>{
            this.loader = false
            this.loading = false
            this.name=''
            this.company=''
            this.phone = ''
            this.dispatchId = ''
            this.nameBlured = false
            this.companyBlured = false
            this.dispatchIdBlured = false
            this.phoneBlured = false
              iziToast.success({
            message: 'order dispatched successfully',
            progressBar: false,
            })
            setTimeout(() => { 
              this.$router.push('/dashboard')
             }, 5000);
          })
          .catch((err)=>{
            console.log(err)
            this.loader = false
            this.loading = false
          })  
      }
    }  
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
<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="10000" top color="success">
      <span>Product Added Successfully...</span> 
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="10000" top color="red">
      <span>{{msgErr}}</span> 
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
      <div class="container">
        <h5 class="heading">Add new product</h5>

        <div class="row mt-5">
          <div class="col-lg-8">
            <form>
            <div class="form-group">
              <label for="email">Product Name</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="name"
                  required
                  v-model="name"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validName(name) && nameBlured}"
                     v-on:blur="nameBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
            </div>

               <div class="form-group">
                          <label for="category">Product Category</label>
                          <select class="custom-select my-1 mr-sm-2" v-model="selected" id="category">
                            <option v-for="(cat, index) in category" 
                                  :key="index"
                                :value="cat"
                            >
                              {{ cat }}
                            </option>
                          </select>
                      
                    </div>
             
             <div class="form-group">
               <label for="email">Price</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="price"
                  required
                  v-model="price"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validPrice(price) && priceBlured}"
                   v-on:blur="priceBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
             </div>

              <div class="form-group">
               <label for="email">Quantity Available</label>
                <input
                  type="number"
                  class="form-control input-style"
                  id="quantity"
                  required
                  v-model="quantityAvailable"
                />
             </div>

               <div class="form-group">
                <label for="description">Product Description</label>
                <textarea class="form-control" id="decription" rows="5"
                 v-model="description"
                  v-bind:class="{'form-control' : true, 'is-invalid' : !validDescription(description) && descriptionBlured}"
                    v-on:blur="descriptionBlured = true"
              
                  />
                  <div class="invalid-feedback">Please add a description</div>
            </div>


              <div class="form-group">
                <label for="">Product Image</label>
                  <v-file-input  show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="onFileChange($event)" ref="productUrl"></v-file-input>
                   <p style="color: red; font-size: 13px;" class="mt-n6 pt-0" v-if="imageSelect">This field is required</p>
                   <!-- <p class="black--text mt-n6 pt-0" v-if="disabled">please wait, uploading image...<span class="fa fa-circle-o-notch fa-spin"></span></p> -->
              </div>
              
            

              <div class="text-center mt-5">
                  <button :disabled="loading" @click="AddProduct($event)" class="btn btn-add">Add Product
                    <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                  </button>
                </div>
              
            </form>
          </div>
        </div>
      </div>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
          loading: false,
          loader: false,
          name: '',
          description: '',
          descriptionBlured: false,
          nameBlured: false,
          price: '',
          priceBlured: false,
          quantityAvailable: 0,
           selected: 'Hair',
          category: ['Hair', 'Skin'],
          files:'',
          imageSelect: false,
          snackbar:false,
          snackbar2:false,
          msgErr:'',
          valid: false,
          valid1: false,
          valid2: false
        }
    },
    methods: {
       validName: function(name){
        return name
      },
        validPrice: function(price){
        return price
      },
      validDescription: function(description){
        return description
      },
      validateName: function(){
      this.nameBlured = true;
        if(this.validName(this.name)){
          this.valid = true
        }
      },
       validateDescription: function(){
      this.descriptionBlured = true;
        if(this.validDescription(this.description)){
          this.valid2 = true
        }
      },
       validatePrice: function(){
      this.priceBlured = true;
        if(this.validPrice(this.price)){
          this.valid1 = true
        }
      },
      validateImage: function(){
        if(this.files == ''){
          this.imageSelect = true
        }
      },
      onFileChange(e){
          if(e){
        this.files = e;
        this.imageSelect = false
        }else{
            this.imageSelect = true
        }
      },
      AddProduct(event){
        event.preventDefault();
         this.validateName()
        this.validatePrice()
        this.validateDescription()
        this.validateImage()
         if(this.valid == true && this.valid1 == true && this.valid2 == true && this.imageSelect == false){
            this.loader = true
          this.loading = true
          this.$store.dispatch("AddProduct", {
            "name": this.name,
            "price": this.price,
            "quantityAvailable":this.quantityAvailable,
            "files":this.files,
            "category": this.selected,
            "description": this.description
          })
          .then(()=>{
            this.loader = false
            this.loading = false
            this.snackbar = true
            this.name=''
            this.price=''
            this.description = ''
            this.quantityAvailable=''
            this.nameBlured = false
            this.priceBlured = false
            this.descriptionBlured = false
          })
          .catch((err)=>{
            this.loader = false
            this.loading = false
            this.msgErr = err.response.data.message
            this.snackbar2 = true
          })  
         }
      }
    } 
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.custom-select{
    color: black;
}
.custom-select:focus{
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
.btn-add {
  background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 50px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-add:hover {
  background: #fff;
  box-shadow: 0px -2px 10px rgba(255, 255, 255, 0.14),
    0px 4.5px 10px rgba(255, 255, 255, 0.14);
  color: #F7941D;
  border: 1px solid #F7941D;
}
textarea{
   padding: 20px 20px;  
}
textarea:focus{
border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
</style>
<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="10000" top color="success">
      <span>Product Updated successfully...</span> 
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="10000" top color="red">
      <span>{{msgErr}}</span> 
      <v-btn text color="white" @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>

      <div class="container">
        <h5 class="heading">Edit Product</h5>

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
                />
            </div>
             
             <div class="form-group">
               <label for="email">Price</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="price"
                  required
                  v-model="price"
                />
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


             <!--   Preview product image  -->
             <h6>Product Image</h6>
              <div id="preview" class="mt-5">              
                    <v-img height="400" :src="url" alt=""></v-img>
              </div>

              <div class="form-group mt-3">
                <label for="">Change Product Image</label>
                  <v-file-input  show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="onFileChange($event)" ref="productUrl"></v-file-input>
                   <p class="black--text mt-n6 pt-0" v-if="disabled">please wait, uploading image...<span class="fa fa-circle-o-notch fa-spin"></span></p>
              </div>
            

              <div class="text-center mt-5">
                  <button :disabled="loading" @click="UpdateProduct($event)" class="btn btn-add">Update Product
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
          url: this.$store.state.products.product.imgUrl,
          name: this.$store.state.products.product.name,
          price: this.$store.state.products.product.price,
          quantityAvailable: this.$store.state.products.product.quantityAvailable,
          files: this.$store.state.products.product.imgUrl,
          snackbar:false,
          snackbar2:false,
          msgErr:'',
        }
    },
    computed: {
        
    },
    methods: {
      onFileChange(e){
        this.files = e;
        console.log(this.files)
        this.url = URL.createObjectURL(e);
      },
      UpdateProduct(event){
        event.preventDefault();
          this.loader = true
          this.loading = true
          this.$store.dispatch("UpdateProduct", {
            "name": this.name,
            "price": this.price,
            "quantityAvailable":this.quantityAvailable,
            "files":this.files,
            "id": this.$store.state.products.product.id
          })
          .then(()=>{
            this.loader = false
            this.loading = false
            this.snackbar = true
          })
          .catch((err)=>{
              console.log(err)
            this.loader = false
            this.loading = false
            // this.msgErr = err.response.data.message
            this.snackbar2 = true
          })  
         
      }
    } 
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
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
</style>
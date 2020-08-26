<template>
  <v-container>
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
                  v-model="quantity"
                />
             </div>

              <div class="form-group">
                <label for="">Product Image</label>
                  <v-file-input  show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="imageUrl($event)" ref="profileUrl"></v-file-input>
                   <!-- <p class="black--text mt-n6 pt-0" v-if="disabled">please wait, uploading image...<span class="fa fa-circle-o-notch fa-spin"></span></p> -->
              </div>
            

              <div class="text-center mt-5">
                  <button :disabled="loading" @click="SendMessage($event)" class="btn btn-add">Add Product
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
          price: '',
          quantity: 0
        }
    },
    methods: {
      imageUrl(e){
        console.log(e)
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
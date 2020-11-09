<template>
 <v-container>
     <div class="container">    
          <div class="row">
              <div class="col-lg-6">
                   <h5 class="heading">Products</h5>
              </div>
              <!-- <div class="col-lg-6">
                  <v-text-field
                    label="Search"
                    height="10"
                    solo
                    dense flat 
                    class=""
                    append-icon="mdi-magnify" background-color="#f5f3fc"
                
                    @keyup="search($event)"
                    @change="search($event)"
                ></v-text-field>
              </div> -->
          </div>

            <v-tabs class="" background-color="transparent"
      color="#000000">
         <v-tabs-slider color="#F7941D"></v-tabs-slider>
                <v-tab>Hair Products</v-tab>
                <v-tab>Skin Products</v-tab>

                  <!-- first tab -->
                <v-tab-item>

                   <!-- list of all products -->
             <div class="row mt-4">
            
           <div class="col-lg-4 mb-3"  v-for="n in hairproducts" :key="n.id">
                <div class="card">
                <div class="card-body">
                    <div class="mx-auto">
                      <v-img class="mx-auto" :src="getImageUrl(n.imgUrl)" width="266" height="138"></v-img>
                    </div>
                    <h6 class="card-title text-center mt-4" style="font-weight: bold;">{{n.name}}</h6>
                    <h6 class="card-text text-center text-color">Qty Available: <span>{{n.quantityAvailable}}</span> </h6>
                    <h6 class="card-text text-center text-color">Price NGN: <span>{{n.price}}</span></h6>
                    <div class="text-center mt-4" style="">
                        <button class="btn btn-green"  @click="EditHair(n.id)">Edit</button>
                        <button @click="DeleteHair(n.id)" class="btn-add ml-3">Delete</button>
                    </div> 
                </div>
                </div>
            </div>

          </div>

          <div class="mt-12" v-if="hairproducts.length===0">
              <h6 class="text-center ">No Hair Products added yet!</h6>
               <div class="text-center mt-6">
                 <router-link to="/products/new" class="btn-add" style="text-decoration: none; color:white;">Add New Product</router-link>
            </div> 
          </div>


        <div class="text-center mt-5" v-if="hairCount > 0">
          <v-pagination @input="nextHair" v-model="pagination.page" 
          :length="Math.ceil(hairCount / 5)" color="#F7941D"></v-pagination>
        </div>

                </v-tab-item>

                <!-- second tab -->
                <v-tab-item>

                       <!-- list of all products -->
                    <div class="row mt-4">
            
                    <div class="col-lg-4 mb-3"  v-for="n in skinproducts" :key="n.id">
                          <div class="card">
                          <div class="card-body">
                              <div class="mx-auto">
                                <v-img class="mx-auto" :src="getImageUrl(n.imgUrl)" width="266" height="138"></v-img>
                              </div>
                              <h6 class="card-title text-center mt-4" style="font-weight: bold;">{{n.name}}</h6>
                              <h6 class="card-text text-center text-color">Qty Available: <span>{{n.quantityAvailable}}</span> </h6>
                              <h6 class="card-text text-center text-color">Price NGN: <span>{{n.price}}</span></h6>
                              <div class="text-center mt-4">
                                  <button class="btn btn-green"  @click="EditSkin(n.id)">Edit</button>
                                   <button @click="DeleteSkin(n.id)" class="btn-add ml-3">Delete</button>
                              </div> 
                          </div>
                          </div>
                      </div>

                  </div>

                    <div class="mt-12" v-if="skinproducts.length===0">
                      <h6 class="text-center ">No Skin Products added yet!</h6>
                      <div class="text-center mt-6">
                        <router-link to="/products/new" class="btn-add" style="text-decoration: none; color:white;">Add New Product</router-link>
                    </div> 
                  </div>


                <div class="text-center mt-5" v-if="skinCount > 0">
                  <v-pagination @input="nextSkin" v-model="pagination.page" 
                  :length="Math.ceil(skinCount / 5)" color="#F7941D"></v-pagination>
                </div>


                </v-tab-item>
                
            </v-tabs>


     </div>
 </v-container>
</template>

<script>
import iziToast from 'izitoast'
export default {
    data(){
        return{
          pagination: {
            page: 1,
            total: 0,
            perPage: 0,
            visible: 7
          },
        }
    },
    computed:{
      products(){
        let products = this.$store.state.products.productsLength
        
        return products
      },
      hairCount(){
        let hairCount = this.$store.state.products.HairCount
        
        return hairCount
      },
      skinCount(){
        let skinCount = this.$store.state.products.SkinCount
        
        return skinCount
      },
      hairproducts(){
        let hairproducts = this.$store.state.products.hairproducts
        
        return hairproducts
      },
      skinproducts(){
        let skinproducts = this.$store.state.products.skinproducts
        
        return skinproducts
      }
    },
    methods:{
      getImageUrl(url){
        return url
      },
      search(event){
        let word=event.target.value
        this.$store.dispatch("productFilter", word )
        .then(()=>{
          
        })
        .catch(()=>{
        })
      },
      nextHair(page){
        // const limit=10;      
        // const OffSet = (page * 10) - 10;
        // console.log("OffSet is "+ OffSet, limit); 
        this.$store.dispatch('getHairProducts', {Offset:page,limit:5})
      }, 
      nextSkin(page){ 
      this.$store.dispatch('getSkinProducts', {Offset:page,limit:5})
    }, 
      EditHair(id){
        this.$store.dispatch('editProduct', id) 
        this.$router.push('/products/edit/'+id) 
      },
       EditSkin(id){
        this.$store.dispatch('skinProduct', id) 
        this.$router.push('/products/edit/'+id) 
      },
      DeleteSkin(id){
        console.log(this.pagination.page)
          var confirm_flag = confirm("You are about to delete this product")
        if(confirm_flag){
          this.$store.dispatch('deleteProduct', id)
            .then((success)=>{
                 iziToast.success({
              message: 'Product deleted successfully!',
              progressBar: false,
              })
             this.$store.dispatch("getSkinProducts", {Offset:this.pagination.page,limit:5})
              console.log(success)
            }) 
            .catch(()=>{
            }) 
       }
      },
      DeleteHair(id){
        console.log(this.pagination.page)
          var confirm_flag = confirm("You are about to delete this product")
        if(confirm_flag){
          this.$store.dispatch('deleteProduct', id)
            .then((success)=>{
                 iziToast.success({
              message: 'Product deleted successfully!',
              progressBar: false,
              })
             this.$store.dispatch("getHairProducts", {Offset:this.pagination.page,limit:5})
              console.log(success)
            }) 
            .catch(()=>{
            }) 
       }
      }
    },
    created(){
       this.$store.dispatch("getProductsCount")
      .then(()=>{
      
      })
      .catch(()=>{
      })
      this.$store.dispatch("getHairProducts", {Offset:1,limit:5})
      .then(()=>{
      })
      .catch(()=>{
      })
      this.$store.dispatch("getSkinProducts", {Offset:1,limit:5})
      .then(()=>{
      })
      .catch(()=>{
      })
    } 
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
.btn-green {
  background: #fff;
  border-radius: 25px;
  color: #F7941D;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-green:hover {
  background: #f7941d;
  box-shadow: 0px -2px 10px rgba(255, 255, 255, 0.14),
    0px 4.5px 10px rgba(255, 255, 255, 0.14);
  color: #fff;
  border: 1px solid #F7941D;
}
</style>
<template>
 <v-container>
     <div class="container">    
          <div class="row">
              <div class="col-lg-6">
                   <h5 class="heading">All Products</h5>
              </div>
              <div class="col-lg-6">
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
              </div>
          </div>

          <!-- list of all products -->
             <div class="row mt-4">
            
           <div class="col-lg-4 mb-3"  v-for="n in Products" :key="n.name">
                <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <v-img :src="getImageUrl(n.img_url)"></v-img>
                    </div>
                    <h5 class="card-title text-center" style="font-weight: bold;">{{n.name}}</h5>
                    <h6 class="card-text text-center text-color">Qty Available: <span>{{n.duration}}</span> </h6>
                    <h6 class="card-text text-center text-color">Price NGN: <span>{{n.cost}}</span></h6>
                    <div class="text-center">
                        <button class="btn btn-green"  @click="FundFarm($event, n._id)">Edit</button>
                    </div> 
                </div>
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
            Products: [
                {
                    name: 'HAIR GLOW BUTTER',
                    duration: '4',
                    roi: '4',
                    cost: '40',
                    img_url: '/cream.png'
                },
                  {
                    name: 'HAIR GLOW BUTTER',
                    duration: '4',
                    roi: '4',
                    cost: '40',
                    img_url: '/cream2.png'
                },
                  {
                    name: 'HAIR GLOW BUTTER',
                    duration: '4',
                    roi: '4',
                    cost: '40',
                    img_url: '/cream3.png'
                },
                  {
                    name: 'HAIR GLOW BUTTER',
                    duration: '4',
                    roi: '4',
                    cost: '40',
                    img_url: '/cream.png'
                }
            ]
        }
    },
    methods:{
          getImageUrl(url){
          return url
             }
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
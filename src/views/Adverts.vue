<template>
   <v-container>
      <div class="container">
         <h5 class="heading">Advert Image</h5>
         
          <v-tabs class="mt-4" background-color="transparent"
      color="#000000">
         <v-tabs-slider color="#F7941D"></v-tabs-slider>
                <v-tab>Add advert Image</v-tab>

        <!-- first tab layout -->
        <v-tab-item>
            
             <v-toolbar flat style="background-color:white" height="30">
            <v-spacer></v-spacer>
            <button @click="onImageAdvert"
            v-if="Images.length!==0"
            :disabled="Images.length == 10"
            v-bind:class="{ 'btn-disabled': Images.length == 10}"
             class="btn-add">Add an advert</button>
            <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
            >
        </v-toolbar>

            <div class="row mt-3">
                <div class="col-lg-4" v-for="n in Images" :key="n.id">
                   <v-hover>
                        <template v-slot:default="{ hover }">
                        <v-card>
                            <v-img height="250" :src="getImageUrl(n.imgUrl)"></v-img>

                            <v-fade-transition>
                            <v-overlay
                                v-if="hover"
                                absolute
                                color="#036358"
                            >
                                <button  @click="DeleteAdvert(n.id)" class="btn-add">Delete</button>
                            </v-overlay>
                            </v-fade-transition>
                        </v-card>
                        </template>
                    </v-hover>
                </div>
                             
            </div>

            
              <div class="mt-12" v-if="Images.length===0">
                      <h6 class="text-center ">No Adverts yet!</h6>
                      <div class="text-center mt-6">
                       <button @click="onButtonClick"
                        class="btn-add">Add an advert</button>
                        <input
                            ref="advert1"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onFileChanged"
                        >
                    </div> 
                  </div>

             <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
            </v-overlay>

            
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
            selectedFile: null,
             overlay: false,
        }
    },
    methods:{
        getImageUrl(url){
        return url
      },
     onButtonClick() {
      this.$refs.advert1.click()
    },
    onImageAdvert(){
         this.$refs.uploader.click()
    },
    onFileChanged(e) {
        if(e.target.files[0]){
           this.selectedFile = e.target.files[0]
                    console.log(this.selectedFile)
                    this.overlay = true
            this.$store.dispatch("AddAdvert", {
                    "files":this.selectedFile,
                    "description": "image added"
                })
                .then(()=>{
                    this.overlay = false
                    this.selectedFile = null
                    iziToast.success({
                    message: 'Advert added successfully!',
                    progressBar: false,
                    })
                    this.$store.dispatch('GetAdverts')
                })
                .catch((err)=>{
                    this.overlay = false
                    console.log(err)
                })
        }                      
        else{
            this.overlay = false
        }
    },
    DeleteAdvert(id){
        this.overlay = true 
         this.$store.dispatch("DeleteAdvert", id)
            .then((success)=>{
                this.overlay = false
                 iziToast.success({
              message: 'Advert deleted successfully!',
              progressBar: false,
              })
               this.$store.dispatch('GetAdverts')
                console.log(success)
            })
            .catch(()=>{
                this.overlay = false
            }) 
      }
    },
    computed: {
        Images(){
            return this.$store.state.adverts.adverts
        }
    },
    created(){
         this.$store.dispatch('GetAdverts')
        .then((success)=>{
            console.log(success)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style scoped>
.btn-add{
    background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-disabled{
    color: #fff;
    background-color: #f7941d;
    border-color: #f7941d;
    pointer-events: none;
    opacity: .65;
}
</style>
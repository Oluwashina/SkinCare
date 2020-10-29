<template>
  <v-container>
      <div class="container">
          <h5 class="heading">Edit Skin Issues</h5>

           <div class="row mt-5">
          <div class="col-lg-8">
            <form>
            <div class="form-group">
              <label for="email">Issue Name</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="name"
                  required
                  v-model="name"
                />
            </div>

             <div class="form-group">
                      <label for="category">Category</label>
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
                <label for="description">Description</label>
                <textarea class="form-control" id="decription" rows="5"
                 v-model="description"
                 required
                  />
                  <div class="invalid-feedback">Please add a description</div>
            </div>

            <!-- syymptoms selected -->
              <div class="row mb-n3">
                  <div class="col-10">
                      <div class="form-group">
                    <label for="category">Symptoms</label>
                          <select @change="onChangeSymptom($event)" class="custom-select mr-sm-2" v-model="selectedsymptom" id="category">
                            <option selected disabled value="pick">Add a new symptom</option>
                          <option v-for="(cat, index) in Symptoms" 
                            :key="index" 
                              :value="cat"
                          >
                            {{ cat }}
                          </option>
                      </select>
                      <p style="color: red; font-size: 13px;" class="mt-2 pt-0" v-if="symptompick">Kindly select a symptom and use the add button</p>
                        
                    </div>
                  </div>
                  <div class="col-2">
                    <v-btn @click="addChip()" class="my-8" fab small dark color="#4DC503">
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                  </div>
                </div>

                      <v-chip close v-for="(tag) in selectedChips"
                                              :key="tag" 
                                               class="mt-n2 mb-5 ma-2"  
                                                @click:close="close(tag)"
                                            >
                                          {{tag}}
                                        </v-chip> 


             <!--   Preview product image  -->
             <h6>Issues Image</h6>
              <div id="preview" class="mt-5">              
                    <v-img height="400" :src="url" alt=""></v-img>
              </div>

              <div class="form-group mt-3">
                <label for="">Change Issues Image</label>
                  <v-file-input  show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="imageUrl($event)" ref="skinUrl"></v-file-input>
                   <p style="color: red; font-size: 13px;" class="mt-n6 pt-0" v-if="imageSelect">This field is required</p>
              </div>

              
                  <label>Recommended products for the skin issue</label>
                    <v-autocomplete
                v-model="friends"
                :disabled="isUpdating"
                :items="Products"
                filled
                chips
                color="blue-grey lighten-2"
                label="Select a product"
                :item-text="Products"
                :item-value="Products"
                multiple
                @change="Yes()"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.imgUrl"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.imgUrl">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.category"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>


              <div class="text-center mt-5">
                  <button :disabled="loading" @click="UpdateIssues($event)" class="btn btn-add">Update Skin Issues
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
import iziToast from 'izitoast'
export default {
    data(){
        return{
          loading: false,
          loader: false,
          url: this.$store.state.skin.issue.imgUrl,
          name: this.$store.state.skin.issue.name,
          description: this.$store.state.skin.issue.description,
          msgErr:'',
          selected: this.$store.state.skin.issue.category,
          symptompick: false,
          category: ['Hair', 'Skin'],
          selectedsymptom: 'pick',
          selectedChips: this.$store.state.skin.issue.symptom,
          files: this.$store.state.skin.issue.imgUrl,
          profileUrl: this.$store.state.skin.issue.imgUrl,
          imageSelect: false,
          friends: this.$store.state.skin.issue.recommendedProducts,
          isUpdating: false
        }
    },
     watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },
    methods:{
       remove (item) {
        const index = this.friends.indexOf(item)
        if (index >= 0) this.friends.splice(index, 1)
      },
      imageUrl(e){
      if(e){
       this.files = e;
       this.imageSelect = false
       this.profileUrl = e
       this.url = URL.createObjectURL(e);
      }else{
          this.profileUrl = ''
          this.imageSelect = true
      }
     },
     close(id){
      let i = this.selectedChips.indexOf(id);
      this.selectedChips.splice(i,1);
      if(this.selectedChips.length == 0){
        this.symptompick = true
      } 
    },
      validateImage: function(){
        if(this.profileUrl == ''){
          this.imageSelect = true
        }
      },
      validateSymptomPick: function(){
        if(this.selectedsymptom == 'pick' && this.selectedChips.length == 0){
          this.symptompick = true
        }
      },
     onChangeSymptom(event){
        if(event.target.value !== 'pick' && this.selectedChips.length !== 0){
            this.symptompick = false
        }else{
          this.symptompick = true
        }
      },
     addChip(){
        if(this.selectedsymptom == 'pick'){
          this.symptompick = true
        }
        else{
            this.symptompick = false
             this.selectedChips.push(...this.selectedsymptom.split(","));
        } 
      },
      UpdateIssues(event){
        event.preventDefault()
         this.validateImage();
        this.validateSymptomPick();
         if(this.imageSelect == false && this.symptompick == false){
            this.loader = true
          this.loading = true
          this.$store.dispatch("UpdateSkinIssue",{
              "category": this.selected,
              "symptom": this.selectedChips,
              "name": this.name,
              "files": this.files,
              "description": this.description,
              "id": this.$store.state.skin.issue.id,
              "recommendedProducts": this.friends
            })
            .then(()=>{
              this.loader = false,
              this.loading = false
                  iziToast.success({
              message: 'Skin Issue updated successfully!',
              progressBar: false,
              })
            })
            .catch((err)=>{
              console.log(err)
              this.loader = false,
              this.loading = false
                 iziToast.error({
              message: 'an error occured',
              progressBar: false,
              })
            })
         }
       

      }
    },
    computed: {
      Symptoms(){
        return this.$store.state.skin.symptoms
      },
       Products(){
        return this.$store.state.products.products
      }
    },
     created(){
      this.$store.dispatch("getSymptoms", this.selected)
      .then((success)=>{
        console.log(success)

      })
      .catch((err)=>{
        console.log(err)
      })
       this.$store.dispatch("getProducts")
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
.input-style {
  padding: 20px 10px;
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
.custom-select{
    color: black;
}
.custom-select:focus{
  border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
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
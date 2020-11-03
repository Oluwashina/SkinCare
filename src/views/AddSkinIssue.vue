<template>
  <v-container>
      <div class="container">
         <v-snackbar v-model="snackbar" :timeout="10000" top color="success">
          <span>Symptom added successfully.</span> 
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>

           <v-snackbar v-model="snackbar1" :timeout="10000" top color="success">
          <span>Skin issue successfully added.</span> 
          <v-btn text color="white" @click="snackbar1 = false">Close</v-btn>
        </v-snackbar>

            <h5 class="heading">Add New Skin Issue</h5>

            <v-tabs class="mt-4" background-color="transparent"
      color="#000000">
         <v-tabs-slider color="#F7941D"></v-tabs-slider>
                <v-tab>Add Issue Symptoms</v-tab>
                <v-tab>Add Skin Issue</v-tab>
                
                <!-- first tab -->
                <v-tab-item>
                    <div class="row mt-4">
                        <div class="col-lg-8">
                            <form>
                                <div class="form-group">
                                <label for="category">Select category</label>
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
                                    <label for="symptoms">Symptoms</label>
                                        <input
                                        type="text"
                                        class="form-control input-style"
                                        id="symptoms"
                                        required
                                        v-model="symptoms"
                                        v-bind:class="{'form-control' : true, 'is-invalid' : !validSymptom(symptoms) && symptomBlured}"
                                         v-on:blur="symptomBlured = true"
                                        />
                                         <div class="invalid-feedback">Please add a symptom</div>
                                    </div>

                                     <div class="text-center mt-5">
                                    <button :disabled="loading" @click="AddSymptom($event)" class="btn btn-add">Add Symptom
                                        <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                                    </button>
                                    </div>

                            </form>
                        </div>
                    </div>
                </v-tab-item>

                <!-- second tab -->
                <v-tab-item>
                    <div class="row mt-4">
                        <div class="col-lg-8">
                            <form>
                                <div class="form-group">
                                    <label for="symptoms">Issue Name</label>
                                        <input
                                        type="text"
                                        class="form-control input-style"
                                        id="issueName"
                                        required
                                        v-model="issueName"
                                        v-bind:class="{'form-control' : true, 'is-invalid' : !validIssueName(issueName) && nameBlured}"
                                         v-on:blur="nameBlured = true"
                                        />
                                         <div class="invalid-feedback">Please add a name</div>
                                    </div>

                                     <div class="form-group">
                                        <label for="category">Select category</label>
                                          <select @change="onChange($event)"  class="custom-select my-1 mr-sm-2" v-model="selected1" id="category">
                                              <option v-for="cat in category1" 
                                                :key="cat.id" 
                                                  :value="cat.name"
                                              >
                                                {{ cat.name }}
                                              </option>
                                          </select>
                                        </div>

                                         <div class="form-group">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="decription" rows="5"
                                            v-model="description"
                                             v-bind:class="{'form-control' : true, 'is-invalid' : !validDescription(description) && descriptionBlured}"
                                               v-on:blur="descriptionBlured = true"
                                             />
                                             <div class="invalid-feedback">Please add a description</div>
                                        </div>


                                    <div class="row mb-n3">
                                      <div class="col-10">
                                         <div class="form-group">
                                        <label for="category">Select Symptoms</label>
                                             <select @change="onChangeSymptom($event)" class="custom-select mr-sm-2" v-model="selectedsymptom" id="category">
                                               <option selected disabled value="pick">Pick a symptom</option>
                                              <option v-for="(cat, index) in Symptoms" 
                                                :key="index" 
                                                  :value="cat"
                                              >
                                                {{ cat }}
                                              </option>
                                          </select>
                                          <p style="color: red; font-size: 13px;" class="mt-2 pt-0" v-if="symptompick">Kindly use the add button to add the symptom selected</p>
                                           
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

                                          <div class="form-group">
                                            <label for="">Upload Image</label>
                                            <v-file-input show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="imageUrl($event)" ref="profileUrl"></v-file-input>
                                             <p style="color: red; font-size: 13px;" class="mt-n6 pt-0" v-if="imageSelect">This field is required</p>
                                            <!-- <p class="black--text mt-n6 pt-0" v-if="disabled">please wait, uploading image...<span class="fa fa-circle-o-notch fa-spin"></span></p> -->
                                        </div>

                                         <label>Recommend products for the skin issue</label>
                                           <v-autocomplete
                                        v-model="friends"
                                        :disabled="isUpdating"
                                        :items="Products"
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
                                    <button :disabled="loading1" @click="AddIssue($event)" class="btn btn-add">Add Skin Issue
                                        <span class="fa fa-circle-o-notch fa-spin" v-if="loader1"></span>
                                    </button>
                                    </div>

                            </form>
                        </div>
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
          symptoms: '',
          issueName: '',
          description: '',
          descriptionBlured: false,
          nameBlured: false,
          symptomBlured: false,
          imageSelect: false,
          snackbar: false,
          snackbar1: false,
          symptompick: false,
          valid: false,
          valid1: false,
          valid2: false,
          loader: false,
          loading: false,
          loader1: false,
          loading1: false,
          selected: 'Hair',
          selected1: 'Hair',
          category: ['Hair', 'Skin'],
          category1: [
              {id: 1, name: 'Hair'},
              {id: 2, name: 'Skin'},
          ],
          selectedsymptom: 'pick',
          chip1: true,
          selectedChips: [],
          files: '',
          profileUrl: '',
          autoUpdate: true,
        friends: [],
        isUpdating: false,
        }
    },
    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },
    methods: {
      Yes(){
        console.log(this.friends)
      },
       remove (item) {
        const index = this.friends.indexOf(item)
        if (index >= 0) this.friends.splice(index, 1)

      },
    imageUrl(e){
      if(e){
       this.files = e;
       this.imageSelect = false
       this.profileUrl = e
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
      addChip(){
        if(this.selectedsymptom == 'pick' && this.selectedChips.length == 0){
          this.symptompick = true
        }
        else{
          this.symptompick = false
           this.selectedChips.push(...this.selectedsymptom.split(","))
        }  
      },
      validSymptom: function(symptoms){
        return symptoms
      },
      validIssueName: function(issueName){
        return issueName
      },
      validDescription: function(description){
        return description
      },
      validateSymptom: function(){
      this.symptomBlured = true;
        if(this.validSymptom(this.symptoms)){
          this.valid = true
        }
      },
      validateIssueName: function(){
      this.nameBlured = true;
        if(this.validIssueName(this.issueName)){
          this.valid1 = true
        }
      },
      validateDescription: function(){
      this.descriptionBlured = true;
        if(this.validDescription(this.description)){
          this.valid2 = true
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
      AddSymptom(event){
        event.preventDefault();
        this.validateSymptom()
        if(this.valid == true){
          this.loader = false
          this.loading = true
          this.$store.dispatch("AddSymptom",{
            "category": this.selected,
            "symptom": this.symptoms
          })
          .then(()=>{
            this.symptoms = ''
            this.loader = false,
            this.loading = false
              iziToast.success({
              message: 'Symptom added successfully!',
              progressBar: false,
              })
            this.symptomBlured = false
          })
          .catch((err)=>{
            console.log(err)
            this.loader = false,
            this.loading = false
          })
           
        }
      },
      AddIssue(event){
        event.preventDefault()
        this.validateIssueName();
        this.validateDescription();
        this.validateImage();
        this.validateSymptomPick();
         if(this.valid1 == true && this.valid2 == true && this.imageSelect == false && this.symptompick == false){
           this.loader1 = true
          this.loading1 = true
          this.$store.dispatch("AddSkinIssue",{
            "category": this.selected1,
            "symptom": this.selectedChips,  
             "name": this.issueName,
             "files": this.files,
              "description": this.description,
              "recommendedProducts": this.friends
          })
          .then(()=>{
            this.issueName = ''
            this.description = ''
            this.loader1 = false,
            this.loading1 = false
            this.snackbar1 = true
            this.nameBlured = false
            this.descriptionBlured = false
          })
          .catch((err)=>{
            console.log(err)
            this.loader1 = false,
            this.loading1 = false
          })
         }

      },
      onChange(event) {
          this.$store.dispatch("getSymptoms", event.target.value)
          .then(()=>{
            this.selectedsymptom = 'pick'
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      onChangeSymptom(event){
        if(event.target.value !== 'pick' && this.selectedChips.length !== 0){
            this.symptompick = false
        }else{
          this.symptompick = true
        }
      }
    },
    computed: {
      Symptoms(){
        let symptom = this.$store.state.skin.symptoms
          for(let i=0; i<symptom.length; i++){
                symptom[i] = symptom[i].toString().replace(/,/g , " ");
            }
        return symptom
      },
      Products(){
        return this.$store.state.products.products
      }
    },
    created(){
      this.$store.dispatch("getSymptoms", this.selected1)
      .then(()=>{
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
.v-tab{
    text-transform: initial;
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
.btn-add{
    background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
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
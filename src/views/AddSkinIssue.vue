<template>
  <v-container>
      <div class="container">
         <v-snackbar v-model="snackbar" :timeout="10000" top color="success">
          <span>Symptom added successfully.</span> 
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
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
                                        id="symptoms"
                                        required
                                        v-model="symptoms"
                                        />
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
                                            <textarea class="form-control" id="decription" rows="5"></textarea>
                                        </div>


                                    <div class="row mb-n3">
                                      <div class="col-10">
                                         <div class="form-group">
                                        <label for="category">Select Symptoms</label>
                                             <select class="custom-select mr-sm-2" v-model="selectedsymptom" id="category">
                                               <option selected disabled value="pick">Pick a symptom</option>
                                              <option v-for="cat in Symptoms" 
                                                :key="cat.id" 
                                                  :value="cat.symptom"
                                              >
                                                {{ cat.symptom }}
                                              </option>
                                          </select>
                                           
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
                                            <v-file-input  show-size accept='image/*' label="Choose an image"  color="" background-color="#f5f3fc" solo flat @change="imageUrl($event)" ref="profileUrl"></v-file-input>
                                            <!-- <p class="black--text mt-n6 pt-0" v-if="disabled">please wait, uploading image...<span class="fa fa-circle-o-notch fa-spin"></span></p> -->
                                        </div>

                                     <div class="text-center mt-5">
                                    <button :disabled="loading" @click="SendMessage($event)" class="btn btn-add">Add Skin Issue
                                        <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
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
export default {
    data(){
        return{
          symptoms: '',
          symptomBlured: false,
          snackbar: false,
          valid: false,
          loader: false,
          loading: false,
          selected: 'Hair',
          selected1: 'Hair',
          category: ['Hair', 'Skin'],
          category1: [
              {id: 1, name: 'Hair'},
              {id: 2, name: 'Skin'},
          ],
          selectedsymptom: 'pick',
          chip1: true,
          selectedChips: ['Hitching', 'Dandruff', 'Eczema', 'Duola'],
        }
    },
    methods: {
      close(id){
      let i = this.selectedChips.indexOf(id);
      this.selectedChips.splice(i,1); 
    },
      addChip(){
        // var yes = "Munmi"
        this.selectedChips.push(...this.selectedsymptom.split(","));
      },
      validSymptom: function(symptoms){
        return symptoms
      },
      validateSymptom: function(){
      this.symptomBlured = true;
        if(this.validSymptom(this.symptoms)){
          this.valid = true
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
            this.snackbar = true
            this.symptomBlured = false
          })
          .catch((err)=>{
            console.log(err)
            this.loader = false,
            this.loading = false
          })
           
        }
      },
      onChange(event) {
          this.$store.dispatch("getSymptoms", event.target.value)
          .then(()=>{
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    },
    computed: {
      Symptoms(){
        return this.$store.state.skin.symptoms
      }
    },
    created(){
      this.$store.dispatch("getSymptoms", this.selected1)
      .then(()=>{

      })
      .catch((err)=>{
        console.log(err)
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
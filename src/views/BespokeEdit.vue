<template>
  <v-container>
      <div class="container">
          <h5 class="heading">Bespoke Cosmetics</h5>

          <p class="mt-7">Update this question</p>

          <!-- Question -->
          <div class="row">
              <div class="col-lg-8">
                    <div class="form-group mt-3">
                        <label for="description">Question</label>
                        <textarea class="form-control" id="decription" v-model="message"
                         rows="5"
                        v-bind:class="{'form-control' : true, 'is-invalid' : !validMessage(message) && messageBlured}"
                        v-on:blur="messageBlured = true"
                         ></textarea>
                          <div class="invalid-feedback">This field is required</div>
                    </div>

                     <div class="form-group">
                    <label for="category">Select category</label>
                           <select v-model="selected" class="custom-select my-1 mr-sm-2" @change="Select($event)" id="category">
                                <option selected value="noOption">Without Option</option>
                                <option value="withOption">With Options</option>
                            </select>
                    </div>

                    
                   

                      <!-- options chip -->
                                    <div v-if="chipShow">
                                        <v-chip close v-for="(tag) in selectedChips"
                                          :key="tag" 
                                            class="mt-n1 ma-2"  
                                            @click:close="close(tag)"
                                        >
                                      {{tag}}
                                    </v-chip>
                                    </div>

                                     <!-- options design -->
                    
                          <div class="row mb-n3" v-if="optionShow">
                            <div class="col-10">
                                <div class="form-group">
                              <label for="category">Add more options</label>
                                      <input
                                  type="text"
                                  class="form-control input-style"
                                  id="optionsName"
                                  required
                                  v-model="optionsName"
                                  v-bind:class="{'form-control' : true, 'is-invalid' : !validOption(optionsName) && optionsBlured}"
                                  v-on:blur="optionsBlured = true"
                                    />
                  
                                <div class="invalid-feedback">Please add at least an option</div>    
                              </div>
                              
                            </div>
                            <div class="col-2">
                              <v-btn @click="addChip()" class="my-8" fab small dark color="#4DC503">
                                    <v-icon dark>mdi-plus</v-icon>
                                  </v-btn>
                            </div>
                          </div>


                     <div class="text-center mt-8 mb-3">
                        <button :disabled="loading" @click="Update($event)" class="btn btn-add">Update
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
             message: this.$store.state.bespoke.question.question,
             selected: this.$store.state.bespoke.question.type,
             selectedChips:  this.$store.state.bespoke.question.options,
             chipShow: this.$store.state.bespoke.question.type == "withOption" ? true : false,
             optionShow:  this.$store.state.bespoke.question.type == "withOption" ? true : false,
             messageBlured: false,
             optionsBlured: false,
             valid: false,
             valid1: false,
             loader: false,
             loading: false,
             noOptions: "",
             optionsName: ''
        }
    },
    methods:{
       validMessage: function(message){
        return message
      },
      validOption: function(optionsName){
        return optionsName
      },
       validateOptions: function(){
      this.optionsBlured = true;
        if(this.validOption(this.optionsName)){
          this.valid1 = true
        }
      },
      validateMessage: function(){
      this.messageBlured = true;
        if(this.validMessage(this.message)){
          this.valid = true
        }
      },
      Select(e){
        if(e.target.value == "withOption"){
          this.optionShow = true
          this.chipShow = true
        }
        else{
          this.optionShow = false
          this.chipShow = false 
        }
      },
       addChip(){
         this.validateOptions()
         if(this.valid1 == true){
           this.selectedChips.push(...this.optionsName.split(","));
         }       
      },
      close(id){
        let i = this.selectedChips.indexOf(id);
        this.selectedChips.splice(i,1);
        if(this.selectedChips.length == 0){
          this.optionsBlured = true
        } 
      },
      Update(event){
        event.preventDefault()
        if(this.selected == "noOption"){
         this.validateMessage()
          if(this.valid == true){
            this.loader = true
            this.loading = true
            this.$store.dispatch("EditBespoke", {
              "question": this.message,
              "type": this.selected,
              "options":this.noOptions,
              "id": this.$store.state.bespoke.question.id
            })
              .then(()=>{
                this.loader = false
                this.loading = false
                this.snackbar = true
                this.messageBlured = false
                iziToast.success({
                  message: 'Question updated successfully!',
                  progressBar: false,
                  })
              })
              .catch((err)=>{
                console.log(err)
                this.loader = false
                this.loading = false
              })  
              }
          }
          else if(this.selected == "withOption"){
              this.validateMessage()
              // this.validateOptions()
                  if(this.valid == true && this.selectedChips.length !== 0){
                      this.loader = true
                        this.loading = true
                        this.$store.dispatch("EditBespoke", {
                          "question": this.message,
                          "type": this.selected,
                          "options":this.selectedChips,
                           "id": this.$store.state.bespoke.question.id
                        })
                      .then(()=>{
                        this.loader = false
                        this.loading = false
                        this.messageBlured = false
                        this.optionsBlured = false
                        iziToast.success({
                          message: 'Question updated successfully!',
                          progressBar: false,
                          })
                      })
                      .catch((err)=>{
                        console.log(err)
                        this.loader = false
                        this.loading = false
                      }) 
                  }
                  else if(this.valid == true && this.selectedChips.length == 0){
                    alert("please add an option")
                  }
          }

      }
    },
    computed:{
      Question(){
        let question =  this.$store.state.bespoke.question
        console.log(question)
        return question
      }
    }
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
textarea{
   padding: 20px 20px;  
}
textarea:focus{
border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
.custom-select{
    color: black
}
.custom-select:focus{
  border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
.btn-add{
    background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 70px;
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
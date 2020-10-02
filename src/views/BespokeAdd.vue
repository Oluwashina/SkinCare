<template>
  <v-container>
      <div class="container">
          <h5 class="heading">Bespoke Cosmetics</h5>

          <p class="mt-7">Add a question</p>

            <!-- Question -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="form-group mt-3">
                        <label for="description">Question</label>
                        <textarea class="form-control" id="decription" 
                        rows="5" v-model="message"
                         v-bind:class="{'form-control' : true, 'is-invalid' : !validMessage(message) && messageBlured}"
                        v-on:blur="messageBlured = true"
                        ></textarea>
                        <div class="invalid-feedback">This field is required</div>
                    </div>

                    <!-- category select -->  
                    <div class="form-group">
                    <label for="category">Select category</label>
                        <select v-model="selected" class="custom-select my-1 mr-sm-2" @change="Select($event)" id="category">
                                <option value="noOption">Without Option</option>
                                <option value="withOption">With Options</option>
                            </select>
                    </div>

                    <!-- options design -->
                    
                                    <div class="row mb-n3" v-if="optionShow">
                                      <div class="col-10">
                                         <div class="form-group">
                                        <label for="category">Add Options</label>
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

                     <div class="text-center mt-8 mb-3">
                        <button :disabled="loader" @click="Add($event)" class="btn btn-add">Add Question
                            <span class="fa fa-circle-o-notch fa-spin" v-if="loading"></span>
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
          message: '',
          messageBlured: false,
          valid: false,
          valid1: false,
          selected: 'noOption',
          loader: false,
          loading: false,
          options: [],
          noOptions: '',
          optionsName: '',
          optionsBlured: false,
          optionShow: false,
          chipShow: false,
          selectedChips: []
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
       close(id){
        let i = this.selectedChips.indexOf(id);
        this.selectedChips.splice(i,1);
        if(this.selectedChips.length == 0){
          this.optionsBlured = true
        } 
      },
       addChip(){
         this.validateOptions()
         if(this.valid1 == true){
           this.selectedChips.push(...this.optionsName.split(","));
         }       
      },
      Add(){
        if(this.selected == "noOption"){
         this.validateMessage()
          if(this.valid == true){
            this.loader = true
            this.loading = true
            this.$store.dispatch("AddBespoke", {
              "question": this.message,
              "type": this.selected,
              "options":this.noOptions,
            })
            .then(()=>{
              this.loader = false
              this.loading = false
              this.snackbar = true
              this.message=''
              this.messageBlured = false
              iziToast.success({
                message: 'Question added successfully!',
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
            this.validateOptions()
                if(this.valid == true && this.selectedChips.length !== 0){
                     this.loader = true
                      this.loading = true
                      this.$store.dispatch("AddBespoke", {
                        "question": this.message,
                        "type": this.selected,
                        "options":this.selectedChips,
                      })
                    .then(()=>{
                      this.loader = false
                      this.loading = false
                      this.message=''
                      this.messageBlured = false
                      this.optionsBlured = false
                      iziToast.success({
                        message: 'Question added successfully!',
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
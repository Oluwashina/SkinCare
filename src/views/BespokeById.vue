<template>
  <v-container>
      <div class="container">
          <h5 class="heading">Bespoke Cosmetics</h5>

          <div style="display: flex;" class="mt-5">
            <div>
             <v-list-item-avatar  size="70">
                  <v-img src="/jane.png" ></v-img>
                </v-list-item-avatar>
            </div>
                <div>
                <p class="ml-2 mt-2">Entry code: {{Entries.entryCode}}</p>
                <p class="ml-2">Submitted by: {{Entries.firstName}} {{Entries.lastName}}</p>
                <p class="ml-2">Email: {{Entries.email}}</p>
                <p class="ml-2">Date: {{Entries.createdAt}}</p>
                </div> 


          </div>

          <!-- Question & Answer Section -->
             <!-- Qeustion part -->
             <div v-for="(question, index) in Questions" :key="question.id">
              <div class="mt-3 question">
                <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question {{index + 1}}</h6>
                <p class="pb-3">{{question.Question}}</p>
              </div>

              <!-- Answer Part -->
              <div class="mt-2 answer">
                <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Answer</h6>
                <p class="pb-3">{{question.Answer}}</p>
              </div>
             </div>

          <!-- message reply section -->
          <div class="form-group mt-5">
              <label for="description">Send a reply</label>
              <textarea class="form-control" v-model="replyMessage" 
              v-bind:class="{'form-control' : true, 'is-invalid' : !validMessage(replyMessage) && messageBlured}"
                v-on:blur="messageBlured = true"
              id="decription" rows="5"></textarea>
                <div class="invalid-feedback">This field is required</div>
          </div>

          <!-- send messsage -->
            <div class="text-center mt-5 mb-3">
                <button :disabled="loading" @click="UpdateBespoke($event)" class="btn btn-add">Send
                      <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                  </button>
           </div>

      </div>
  </v-container>
</template>

<script>
import iziToast from 'izitoast'
import moment from 'moment'
export default {
  data(){
    return{
      replyMessage: this.$store.state.bespoke.entry.reply ? this.$store.state.bespoke.entry.reply : '',
      loader: false,
      loading: false,
      messageBlured: false,
      valid: false,
      
    }
  },
  methods:{
     validMessage: function(replyMessage){
        return replyMessage
      },
      validateMessage: function(){
      this.messageBlured = true;
        if(this.validMessage(this.replyMessage)){
          this.valid = true
        }
      },
    UpdateBespoke(event){
      event.preventDefault()
      this.validateMessage()
      alert('ddd')
      var id = this.$route.params.id
        if(this.valid == true){
          this.loader =  true
          this.loading = true
            this.$store.dispatch('replyBespoke', {
                "reply": this.replyMessage,
                "id": id
            })
            .then((success)=>{
                this.loader = false
                 this.loading = false
                 this.messageBlured= false
                 iziToast.success({
                    message: 'Reply has been sent successfully!',
                    progressBar: false,
                    })
                console.log(success)
            })
            .catch((err)=>{
                console.log(err)
                this.loader = false
                this.loading = false
            })
        }
    }
  },
  computed:{
    Entries(){
        let entry = this.$store.state.bespoke.entry
          entry.createdAt = moment(entry.createdAt).format('LL')          
          return entry
    },
    Questions(){
      return this.$store.state.bespoke.entry.questionAndAnswer
    }
  }
}
</script>

<style scoped>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.question{
  background: #D9D7D7;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
}
.answer{
   background: #e1e2df;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: 80px;
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
textarea{
   padding: 20px 20px;  
}
textarea:focus{
border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
</style>
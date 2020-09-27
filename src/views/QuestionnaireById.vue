<template>
  <v-container>
      <div class="container">
          <h5 class="heading">Questionnaire</h5>

          <div style="display: flex;" class="mt-5">
            <div>
             <v-list-item-avatar  size="70">
                  <v-img src="/Ajayi.png" ></v-img>
                </v-list-item-avatar>
            </div>
                <div>
                <p class="ml-2 mt-2">Entry code: 112121</p>
                <p class="ml-2">Submitted by: Ajayi Ekpetim</p>
                <p class="ml-2">Email: AjayiEkpe@gmail.com</p>
                <p class="ml-2">Date: 21/08/2020</p>
                </div>      
          </div>

          <!-- Question & Answer Section -->
             <!-- Qeustion part -->
          <div class="mt-3 question">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 1</h6>
            <p class="pb-3">WHAT IS THE MAIN CONCERN YOU ARE HAVING TODAY CONCERNING YOUR HAIR OR SKIN?</p>
          </div>

          <!-- Answer Part -->
           <div class="mt-2 answer">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Answer</h6>
            <p class="pb-3">Skin</p>
          </div>

          <!-- Question 2 -->
           <div class="mt-2 question">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 2</h6>
            <p class="pb-3">DO YOU ALWAYS HAVE PIMPLES?</p>
          </div>

          <!-- Answer 2 -->
           <div class="mt-2 answer">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Answer</h6>
            <p class="pb-3">Very Often</p>
          </div>

          <!-- message reply section -->
          <div class="form-group mt-5">
              <label for="description">Send a reply</label>
              <textarea class="form-control" id="decription" rows="5"></textarea>
          </div>

          <!-- send messsage -->
            <div class="text-center mt-5 mb-3">
                <button :disabled="isDisabled" @click="Login($event)" class="btn btn-add">Send
                      <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                  </button>
           </div>

      </div>
  </v-container>
</template>

<script>
export default {

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
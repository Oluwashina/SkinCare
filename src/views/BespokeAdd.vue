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
                        <textarea class="form-control" id="decription" rows="5"></textarea>
                    </div>

                    <!-- category select -->  
                    <div class="form-group">
                    <label for="category">Select category</label>
                        <select class="custom-select my-1 mr-sm-2" id="category">
                                <option selected>Without Option</option>
                                <option value="1">With Options</option>
                            </select>
                    </div>

                     <div class="text-center mt-8 mb-3">
                        <button :disabled="isDisabled" @click="Login($event)" class="btn btn-add">Add Question
                            <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                        </button>
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
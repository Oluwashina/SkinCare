<template>
  <v-container>
      <div class="container">
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
                                     <select class="custom-select my-1 mr-sm-2" id="category">
                                            <option selected>Hair</option>
                                            <option value="1">Skin</option>
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
                                        />
                                    </div>

                                     <div class="text-center mt-5">
                                    <button :disabled="loading" @click="SendMessage($event)" class="btn btn-add">Add Symptom
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
                                            <select class="custom-select my-1 mr-sm-2" id="category">
                                                    <option selected>Hair</option>
                                                    <option value="1">Skin</option>
                                                </select>
                                        </div>

                                         <div class="form-group">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="decription" rows="5"></textarea>
                                        </div>

                                          <div class="form-group">
                                        <label for="category">Select Symptoms</label>
                                            <select class="custom-select my-1 mr-sm-2" id="category">
                                                    <option selected>Hair</option>
                                                    <option value="1">Skin</option>
                                                </select>
                                        </div>

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

        }
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
    color: black
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
<template>
  <v-container>
      <div class="container">
        <h5 class="heading">Create Admin</h5>

        <div class="row mt-5">
          <div class="col-lg-6">
            <form>
            <div class="form-group">
              <label for="email">First Name</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="name"
                  required
                  v-model="firstname"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validFirstName(firstname) && firstnameBlured}"
                     v-on:blur="firstnameBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
            </div>

            <div class="form-group">
                <label for="email">Last Name</label>
                    <input
                    type="text"
                    class="form-control input-style"
                    id="name"
                    required
                    v-model="lastname"
                    v-bind:class="{'form-control' : true, 'is-invalid' : !validLastName(lastname) && lastnameBlured}"
                        v-on:blur="lastnameBlured = true"
                    />
                    <div class="invalid-feedback">This field is required</div>
                </div>

             
             <div class="form-group">
               <label for="email">Phone number</label>
                <input
                  type="text"
                  class="form-control input-style"
                  id="price"
                  required
                  v-model="PhoneNo"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validPhoneNo(PhoneNo) && PhoneNoBlured}"
                   v-on:blur="PhoneNoBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
             </div>

              <div class="form-group">
               <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control input-style"
                  id="quantity"
                  required
                  v-model="email"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validEmail(email) && emailBlured}"
                   v-on:blur="emailBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
             </div>

              <div class="form-group">
               <label for="email">Password</label>
                <input
                  type="password"
                  class="form-control input-style"
                  id="quantity"
                  required
                  v-model="password"
                   v-bind:class="{'form-control' : true, 'is-invalid' : !validPassword(password) && passwordBlured}"
                   v-on:blur="passwordBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
             </div>

              <div class="form-group">
               <label for="email">Confirm Password</label>
                <input
                  type="password"
                  class="form-control input-style"
                  id="quantity"
                  required
                  v-model="confirmPassword"
                    v-bind:class="{'form-control' : true, 'is-invalid' : !validConfirmPassword(confirmPassword) & confirmPasswordBlured}"
                   v-on:blur="confirmPasswordBlured = true"
                />
                  <div class="invalid-feedback">This field is required</div>
             </div>


              <div class="text-center mt-5">
                  <button :disabled="loading" @click="AddAdmin($event)" class="btn btn-add">Create Admin
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
          firstname: '',
          PhoneNo: '', 
          description: '',
          descriptionBlured: false,
          firstnameBlured: false,
          lastnameBlured: false,
          PhoneNoBlured: false,
          emailBlured: false,
          passwordBlured: false,
          confirmPasswordBlured: false,
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          valid: false,
          valid1: false,
          valid2: false,
          valid3: false,
          valid4: false,
          valid5: false,
        }
    },
    methods: {
       validFirstName: function(firstname){
        return firstname
      },
      validLastName: function(lastname){
          return lastname;
      },
     validPhoneNo: function(PhoneNo){
        return PhoneNo
      },
       validEmail: function(email){
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        return re.test(email.toLowerCase())
      },
      validPassword: function(password){
          return password
      },
    validConfirmPassword: function(confirmPassword){
        return confirmPassword
    },
      validateFirstName: function(){
      this.firstnameBlured = true;
        if(this.validFirstName(this.firstname)){
          this.valid = true
        }
      },
       validateLastName: function(){
      this.lastnameBlured = true;
        if(this.validLastName(this.lastname)){
          this.valid1 = true
        }
      },
       validatePhone: function(){
      this.PhoneNoBlured = true;
        if(this.validPhoneNo(this.PhoneNo)){
          this.valid2 = true
        }
      },
      validateEmail: function(){
        this.emailBlured = true;
        if(this.validEmail(this.email)){
          this.valid3 = true
        }
      },  
     validatePassword: function(){
      this.passwordBlured = true;
        if(this.validPassword(this.password)){
          this.valid4 = true
        }
      }, 
      validateConfirmPassword: function(){
      this.confirmPasswordBlured = true;
        if(this.validConfirmPassword(this.confirmPassword)){
          this.valid5 = true
        }
      },  
      AddAdmin(event){
        event.preventDefault();
         this.validateFirstName()
         this.validateLastName()
         this.validatePhone()
         this.validateEmail()
         this.validatePassword()
         this.validateConfirmPassword()
         if(this.valid == true && this.valid1 == true && this.valid2 == true && this.valid3 == true && this.valid4 == true && this.valid5 == true){
            this.loader = true
           this.loading = true
          this.$store.dispatch("AddAdmin", {
            "firstName": this.firstname,
            "lastName": this.lastname,
            "phoneNo":this.PhoneNo,
            "email":this.email,
            "password": this.password,
          })
          .then(()=>{
            this.loader = false
            this.loading = false
            iziToast.success({
            message: 'Admin created successfully!',
            progressBar: false,
            })
            this.firstname=''
            this.lastname=''
            this.PhoneNo = ''
            this.email=''
            this.password= ''
            this.confirmPassword = ''
            this.firstnameBlured = false
            this.lastnameBlured = false
            this.PhoneNoBlured = false
            this.emailBlured = false,
            this.passwordBlured = false
            this.confirmPasswordBlured = false
          })
          .catch((err)=>{
            this.loader = false
            this.loading = false
            var message = err.response.data.message
             iziToast.error({
            message: `${message}`,
            progressBar: false,
            })
          })  
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
.custom-select{
    color: black;
}
.custom-select:focus{
  border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
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
textarea{
   padding: 20px 20px;  
}
textarea:focus{
border-color: rgba(50, 54, 67, 0.2);
  box-shadow: 0px 5px 30px rgba(50, 54, 67, 0.2);
  outline: 0 none;
}
</style>
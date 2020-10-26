<template>
  <div class="container">
      <div class="row justify-content-center mt-12">
        <div class="col-lg-6">

          <!-- alert deiplay -->
          <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="invalid">
            Invalid Credentials
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
             </button>
        </div>
        <div class="alert alert-success" role="alert" v-if="success">
          Login Successful!
        </div>

        <!-- end of alert display -->

          <div class="card">
              <div class="text-center">
                  <img src="/logo.png" class="logo" width="79" height="65"/>
                  <h5 class="card-title">Admin Login</h5>
              </div>
              <p class="card-text text-center">Hello, Welcome back!</p>
              <div class="card-body">

                  <form>
                 <div class="form-group">
                    <label for="email">Email</label>
                        <input
                        type="email"
                        class="form-control input-style"
                        id="email"
                        required
                        v-model="email"
                         v-bind:class="{'form-control' : true, 'is-invalid' : !validEmail(email) && emailBlured}"
                        v-on:blur="emailBlured = true"
                        />
                        <div class="invalid-feedback">A valid email is required</div>
                    </div>

                    <div class="form-group">
                    <label for="email">Password</label>
                        <input
                        type="password"
                        class="form-control input-style"
                        id="password"
                        required
                        v-model="password"
                         v-bind:class="{'form-control' : true, 'is-invalid' : !validPassword(password) && passwordBlured}"
                        v-on:blur="passwordBlured = true"
                        />
                        <div class="invalid-feedback">This field is required</div>
                    </div>
                      
                    <div class="text-right">
                       <router-link to="/changepassword" style="text-decoration: none; color: #4E4B46;" >Change Password?</router-link>
                    </div>
                   

                    <div class="text-center mt-3 mb-3">
                        <button :disabled="signOk" @click="Login($event)" class="btn btn-add">Sign In
                              <span class="fa fa-circle-o-notch fa-spin" v-if="loader"></span>
                          </button>
                    </div>
              </form>


              </div>
            


          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
           snackbar: true,
          text: 'Hello, I\'m a snackbar',
          email: '',
          emailBlured: false,
          passwordBlured: false,
          valid: false,
          valid1: false,
          password: '',
          loader: false,
          signOk: false,
          invalid: false,
          success: false
        }
    },
    methods:{
     validate: function(){
        this.emailBlured = true;
        if(this.validEmail(this.email)){
          this.valid = true
        }
      },
      validatePassword: function(){
      this.passwordBlured = true;
        if(this.validPassword(this.password)){
          this.valid1 = true
        }
      },
      validEmail: function(email){
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        return re.test(email.toLowerCase())
      },
      validPassword: function(password){
        return password
      },
      Login(event){
        event.preventDefault();
        this.validate()
        this.validatePassword()
        if(this.valid == true && this.valid1 == true){
           this.loader = true
           this.signOk = true
          this.$store.dispatch("Login", {
            "email": this.email,
            "password": this.password
          })
          .then(()=>{
            this.loader = false
            this.signOk = false
            this.success = true
            this.$router.push('/dashboard')
          })
          .catch((err)=>{
            this.loader = false
            this.signOk = false
            this.invalid = true
            console.log(err)
          })  
        } 
      }
    },
     computed:{

  }
}
</script>

<style scoped>
.input-style {
  padding: 20px 20px;
  /* border-radius: 10px; */
}
.input-style:focus {
  border: none;
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
</style>
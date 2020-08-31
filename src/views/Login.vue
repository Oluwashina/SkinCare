<template>
  <div class="container">
      <div class="row justify-content-center mt-12">
        <div class="col-lg-6">
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
                        />
                    </div>
                      
                    <div class="text-right">
                       <router-link to="/" style="text-decoration: none; color: #4E4B46;" >Forgot Password</router-link>
                    </div>
                   

                    <div class="text-center mt-3 mb-3">
                        <button :disabled="isDisabled" @click="Login($event)" class="btn btn-add">Sign In
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
          email: '',
          emailBlured: false,
          valid: false,
          password: '',
          loader: false
        }
    },
    methods:{
     validate: function(){
        this.emailBlured = true;
        if(this.validEmail(this.email)){
          this.valid = true
        }
      },
      validEmail: function(email){
        var re = /(.+)@(.+){2,}\.(.+){2,}/;
        return re.test(email.toLowerCase())
      },
      Login(event){
        event.preventDefault();
        this.validate()
        if(this.valid){
           this.loader = true
           this.$router.push('/dashboard')
        }
      }
    },
     computed:{
     isDisabled: function(){
      return this.email.length == "" || this.password.length == "";
    }
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
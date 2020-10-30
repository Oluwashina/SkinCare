<template>
  <v-container>
      <div class="container">
           <div class="row">
              <div class="col-lg-6">
                   <h5 class="heading">SKIN ISSUES</h5>
              </div>
              <div class="col-lg-6">
                  <v-text-field
                    label="Search"
                    height="10"
                    solo
                    dense flat 
                    class=""
                    append-icon="mdi-magnify" background-color="#f5f3fc"
                
                    @keyup="search($event)"
                    @change="search($event)"
                ></v-text-field>
              </div>
          </div>

          <v-toolbar flat style="background-color:white" height="30">
            <v-spacer></v-spacer>
            <router-link to='/skinissues/add' class="btn-add" style="text-decoration:none"><span style="">Add New Skin Issue</span></router-link>
        </v-toolbar>

          <!-- list of skin issues -->
            <div class="row mt-5">
            
           <div class="col-lg-4 mb-3"  v-for="n in Issues" :key="n.id">
                <div class="card">
                     <img :src="getImageUrl(n.imgUrl)" class="card-img-top" alt="Images" style="background-repeat: no-repeat; height: 172.14px;" />
                <div class="card-body">
                    <h5 class="card-title text-center" style="font-weight: bold;">{{n.name}}</h5>
                    <h6 class="card-text text-center text-color">Category: <span>{{n.category}}</span> </h6>
                    <div class="text-center mt-5">
                        <button class="btn btn-green"  @click="Edit(n.id)">Edit</button>
                          <button @click="DeleteSkin(n.id)" class="btn-add ml-3">Delete</button>
                    </div> 
                </div>
                </div>
            </div>

          </div>

           <div class="text-center mt-5">
          <v-pagination @input="next" v-model="pagination.page" 
          :length="Math.ceil(IssuesLength / 5)" color="#F7941D"></v-pagination>
        </div>

      </div>
  </v-container>
</template>

<script>
import iziToast from 'izitoast'
export default {
    data(){
        return{
            pagination: {
            page: 1,
            total: 0,
            perPage: 0,
            visible: 7,
          },
        }
    },
    methods:{
         getImageUrl(url){
          return url
             },
          next(page){
            this.$store.dispatch('GetSkinIssuesLimit', {Offset:page,limit:5})
      },
       Edit(id){
        this.$store.dispatch('editSkinIssues', id) 
        this.$router.push('/skinissues/edit/'+id) 
      }, 
      DeleteSkin(id){
        console.log(this.pagination.page)
       var confirm_flag = confirm("You are about to delete this skin isssue")
        if(confirm_flag){
          this.$store.dispatch('deleteSkinIssue', id)
            .then((success)=>{
                 iziToast.success({
              message: 'Skin issue deleted successfully!',
              progressBar: false,
              })
             this.$store.dispatch("GetSkinIssuesLimit", {Offset:this.pagination.page,limit:5})
              console.log(success)
            }) 
            .catch(()=>{
            }) 
       }
      }
    },
    computed: {
      Issues(){
        return this.$store.state.skin.issues
      },
      IssuesLength(){
         return this.$store.state.skin.issuesLength
      }
    },
    created(){
      this.$store.dispatch("GetSkinIssuesLimit", {Offset:1,limit:5})
      .then(()=>{
        
      })
      .catch((err)=>{
        console.log(err)
      }),
       this.$store.dispatch("GetSkinIssues")
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
.btn-add{
    background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-green {
  background: #fff;
  border-radius: 25px;
  color: #F7941D;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.btn-green:hover {
  background: #f7941d;
  box-shadow: 0px -2px 10px rgba(255, 255, 255, 0.14),
    0px 4.5px 10px rgba(255, 255, 255, 0.14);
  color: #fff;
  border: 1px solid #F7941D;
}
.card{
  border: 1px solid rgba(207, 203, 199, 0.25);
}
.card-body {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(78, 75, 70, 0.25);
}

</style>
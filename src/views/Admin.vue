<template>
  <v-container>
        <div class="container">
                <h5 class="heading">Admin</h5>

                <v-toolbar flat style="background-color:white" height="30">
                    <v-spacer></v-spacer>
                    <router-link to='/admin/create' class="btn-add" style="text-decoration:none"><span style="">Create Admin</span></router-link>
                </v-toolbar>
        
                <v-row class="mt-5">
                <v-col cols="12" md="12" sm="12">
                    <v-card>
                        <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            color='#F7941D'
                            
                        ></v-text-field>
                        </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="Admin"
                        hide-default-footer
                        no-data-text='No admin added yet'
                        :search="search"
                    >
                        
                        <template v-slot:item.action="{ item }">
                            <v-btn text  @click="Delete(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>Delete</v-btn>
                        </template>
                    </v-data-table>
                    </v-card>
                </v-col>
                </v-row>
            
        </div>
  </v-container>
</template>

<script>
import iziToast from 'izitoast'
export default {
    data(){
        return{
            headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
            },
            { text: 'Email', value: 'email' },
            { text: 'Phone Number', value: 'phoneNo' },
            { text: '', value: 'action', sortable: false, },
            ],
            search:''
        }
    },
    methods: {
        Delete(id){
            var confirm_flag = confirm("You are about to delete an admin, Do you want to continue?")
                if(confirm_flag){
                this.$store.dispatch('DeleteAdmin', id)
                    .then(()=>{
                        iziToast.success({
                    message: 'Admin deleted successfully!',
                    progressBar: false,
                    })
                     this.$store.dispatch('GetAdmin')
                    }) 
                .catch(()=>{
                }) 
            }
        },
        
    },
     computed:{
        Admin(){
             let admin =  this.$store.state.admin.admin
            return admin
        },
    },
    created(){
         this.$store.dispatch('GetAdmin')
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
  padding: 10px 50px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}

</style>
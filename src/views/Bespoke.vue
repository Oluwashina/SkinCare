<template>
  <v-container>

  <!--DELETE Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Question</h5>
      
      </div>
      <div class="modal-body">
        You are about to delete a question. Would you like to continue?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary white--text" data-dismiss="modal">NO</button>
        <button type="button" class="btn btn-primary white--text">DELETE</button>
      </div>
    </div>
  </div>
</div>
<!-- end of delete modal -->

      <div class="container">
         <h5 class="heading">Bespoke Cosmetics</h5>

          <v-tabs class="mt-4" background-color="transparent"
      color="#000000">
         <v-tabs-slider color="#F7941D"></v-tabs-slider>
                <v-tab>All Entries</v-tab>
        <!-- <v-tab>Update Questions</v-tab> -->

        <!-- first tab layout -->
        <v-tab-item>
             <v-card class="mt-5">
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
            :items="Entries"
            :items-per-page="10"
            class="elevation-1 mt-5"
           
            no-data-text='No Entries made yet!!!'
            :search="search"
        >
        <template v-slot:item.action="{ item }">
                    <v-btn text  @click="View(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
         </template>
        
        </v-data-table>
             </v-card>

        </v-tab-item>

        <!-- second tab layout -->
        <!-- <v-tab-item>
          <v-toolbar class="mt-6" flat style="background-color:white" height="30">
            <v-spacer></v-spacer>
            <router-link to='/addbespoke' class="btn-add" style="text-decoration:none; color: white"><span style="">Add a question</span></router-link>
        </v-toolbar>

         Questions ------
        <div class="mt-7 mb-3 question" v-for="(question, index) in Questions" :key="question.id">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question {{index + 1}}</h6>
            
                <div style="">
                    <p class="">{{question.question}}</p>
                    <div class="mt-n4">
                        <span @click="Edit(question.id)"><i class="mdi mdi-pencil-circle-outline" style="color: #4DC503; font-size: 30px; cursor: pointer;"></i></span>
                        <span class="ml-2" @click="Delete(question.id)"><i class="mdi mdi-delete-circle-outline" style="color: #F7941D; font-size: 30px; cursor: pointer;"></i></span>
                    </div>
                </div>
          </div>



        </v-tab-item> --> 
        
             

          </v-tabs>
      </div>
  </v-container>
</template>

<script>
import iziToast from 'izitoast'
import moment from 'moment'
export default {
    data(){
        return{
            headers: [
            
            { text: 'Firstname', value: 'firstName' },
             { text: 'Lastname', value: 'lastName' },
            { text: 'Email', value: 'email' },
            { text: 'Date', value: 'createdAt' },
            { text: '', value: 'action', sortable: false, },
            ],
            search: '',
           
        }
    },
    methods: {
        View(id){
             this.$store.dispatch('viewEntry', id) 
            this.$router.push('/bespoke/'+ id)
        },
        Edit(id){
               this.$store.dispatch('editQuestion', id) 
             this.$router.push('/editbespoke/'+ id)
        },
        Delete(id){
             this.$store.dispatch('DeleteQuestions', id)
            .then((success)=>{
                console.log(success)
                 iziToast.success({
                message: 'Question deleted successfully!',
                progressBar: false,
                })
                this.$store.dispatch('BespokeQuestions')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    computed:{
        Entries(){
           let entries = this.$store.state.bespoke.entries
                for(let i=0; i<entries.length; i++){
                    entries[i].createdAt = moment(entries[i].createdAt).format('LL')
                }
            return entries
        },
        Questions(){
            return this.$store.state.bespoke.questions
        }
    },
    created(){
        this.$store.dispatch('BespokeQuestions')
        .then((success)=>{
            console.log(success)
        })
        .catch((err)=>{
            console.log(err)
        })
         this.$store.dispatch('BespokeEntries')
        .then((success)=>{
            console.log(success)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style>
.heading{
  color: #4E4B46;
  font-weight: bold;
}
.v-tab{
    text-transform: initial;
}
.btn-add{
background: #F7941D;
  border-radius: 25px;
  color: #fff;
  padding: 10px 30px;
  transition: all 0.5s;
  border: 1px solid #f7941d;
}
.question{
  background: #D9D7D7;
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
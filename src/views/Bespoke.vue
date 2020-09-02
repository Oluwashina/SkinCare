<template>
  <v-container>
      <div class="container">
         <h5 class="heading">Bespoke Cosmetics</h5>

          <v-tabs class="mt-4" background-color="transparent"
      color="#000000">
         <v-tabs-slider color="#F7941D"></v-tabs-slider>
                <v-tab>All Entries</v-tab>
        <v-tab>Update Questions</v-tab>

        <!-- first tab layout -->
        <v-tab-item>
            <v-data-table
            :headers="headers"
            :items="Entries"
            :items-per-page="5"
            class="elevation-1 mt-5"
            hide-default-footer
            no-data-text='No Entries made yet!!!'
        >
        <template v-slot:item.action="{ item }">
                    <v-btn text  @click="View(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
         </template>
        
        </v-data-table>

        </v-tab-item>

        <!-- second tab layout -->
        <v-tab-item>
          <v-toolbar class="mt-6" flat style="background-color:white" height="30">
            <v-spacer></v-spacer>
            <router-link to='/addbespoke' class="btn-add" style="text-decoration:none; color: white"><span style="">Add a question</span></router-link>
        </v-toolbar>

        <!-- Questions -->
        <div class="mt-7 mb-3 question">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 1</h6>
            
                <div style="">
                    <p class="">WHAT IS THE MAIN CONCERN YOU ARE HAVING TODAY CONCERNING YOUR HAIR OR SKIN?</p>
                    <div class="mt-n4">
                        <span @click="Edit()"><i class="mdi mdi-pencil-circle-outline" style="color: #4DC503; font-size: 30px; cursor: pointer;"></i></span>
                        <span @click="Delete()" class="ml-2"><i class="mdi mdi-delete-circle-outline" style="color: #F7941D; font-size: 30px; cursor: pointer;"></i></span>
                    </div>
                </div>
          </div>

          <div class="question mb-3">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 2</h6>
            
                <div style="">
                    <p class="">WHAT IS THE MAIN CONCERN YOU ARE HAVING TODAY CONCERNING YOUR HAIR OR SKIN?</p>
                    <div class="mt-n4">
                        <span @click="Edit()"><i class="mdi mdi-pencil-circle-outline" style="color: #4DC503; font-size: 30px; cursor: pointer;"></i></span>
                        <span @click="Delete()" class="ml-2"><i class="mdi mdi-delete-circle-outline" style="color: #F7941D; font-size: 30px; cursor: pointer;"></i></span>
                    </div>
                </div>
          </div>

          <div class="question mb-3">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 3</h6>
            
                <div style="">
                    <p class="">WHAT IS THE MAIN CONCERN YOU ARE HAVING TODAY CONCERNING YOUR HAIR OR SKIN?</p>
                    <div class="mt-n4">
                        <span @click="Edit()"><i class="mdi mdi-pencil-circle-outline" style="color: #4DC503; font-size: 30px; cursor: pointer;"></i></span>
                        <span @click="Delete()" class="ml-2"><i class="mdi mdi-delete-circle-outline" style="color: #F7941D; font-size: 30px; cursor: pointer;"></i></span>
                    </div>
                </div>
          </div>

          <div class="question">
            <h6 style="font-weight: bold; color: #4E4B46;" class="pt-3">Question 4</h6>
            
                <div style="">
                    <p class="">WHAT IS THE MAIN CONCERN YOU ARE HAVING TODAY CONCERNING YOUR HAIR OR SKIN?</p>
                    <div class="mt-n4">
                        <span @click="Edit()"><i class="mdi mdi-pencil-circle-outline" style="color: #4DC503; font-size: 30px; cursor: pointer;"></i></span>
                        <span @click="Delete()" class="ml-2"><i class="mdi mdi-delete-circle-outline" style="color: #F7941D; font-size: 30px; cursor: pointer;"></i></span>
                    </div>
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
            headers: [
            {
                text: 'User Name',
                align: 'start',
                sortable: false,
                value: 'username',
            },
            { text: 'Full Name', value: 'fullname' },
            { text: 'Email', value: 'email' },
            { text: 'Date', value: 'date' },
            { text: '', value: 'action', sortable: false, },
            ],
            Entries: [
                {
                    username: 'JaneCooper',
                    fullname: 'Jane Cooper',
                    email: 'janecooper@gmail.com',
                    date: '21/08/2020',
                    id: 1
                },
                 {
                    username: 'JaneCooper',
                    fullname: 'Jane Cooper',
                    email: 'janecooper@gmail.com',
                    date: '21/08/2020',
                    id: 2
                },
                 {
                    username: 'JaneCooper',
                    fullname: 'Jane Cooper',
                    email: 'janecooper@gmail.com',
                    date: '21/08/2020',
                    id: 3
                },
                 {
                    username: 'Codydan',
                    fullname: 'Jane Cooper',
                    email: 'janecoope12r@gmail.com',
                    date: '21/08/2020',
                    id: 4
                },
                 {
                    username: 'JaneCooper',
                    fullname: 'Jane Cooper',
                    email: 'janecooper@gmail.com',
                    date: '21/08/2020',
                    id: 5
                }
            ]
        }
    },
    methods: {
        View(id){
            this.$router.push('/bespoke/'+ id)
        },
        Edit(){
            this.$router.push('/editbespoke/2')
        },
        Delete(){
            alert("Deleted successfully!")
        }
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
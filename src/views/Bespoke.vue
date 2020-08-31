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
</style>
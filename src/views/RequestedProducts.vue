<template>
  <v-container>
        <div class="container">
                <h5 class="heading">Requested Products</h5>
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
                        :items="Requested"
                        hide-default-footer
                        no-data-text='No requested products yet'
                        :search="search"
                    >
                        
                        <template v-slot:item.action="{ item }">
                            <v-btn text  @click="View(item.id)" style="border: 1px solid #F7941D; color:#F7941D; border-radius: 25px;" class="text-none" small>View</v-btn>
                        </template>
                    </v-data-table>
                    </v-card>
                </v-col>
                </v-row>
            
        </div>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            headers: [
            {
                text: 'Firstname',
                align: 'start',
                sortable: false,
                value: 'firstName',
            },
             { text: 'Lastname', value: 'lastName' },
            { text: 'Email', value: 'email' },
            { text: 'Quantity', value: 'quantitySelected' },
            { text: 'Date', value: 'createdAt' },
            { text: '', value: 'action', sortable: false, },
            ],
          
            search:''
        }
    },
    methods: {
        View(id){
             this.$store.dispatch('viewRequested', id) 
            this.$router.push('/requestedproducts/'+id)
        },
        
    },
     computed:{
        Requested(){
             let requested =  this.$store.state.requested.requested
                for(let i=0; i<requested.length; i++){
                    requested[i].createdAt = moment(requested[i].createdAt).format('LL')
                }
            return requested
        },
    },
    created(){
         this.$store.dispatch('RequestedProducts')
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
.searchbk{
    background-color: #F0F0F0 !important;
}
</style>
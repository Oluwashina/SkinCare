<template>
  <v-container>
        <div class="container">
                <h5 class="heading">Dispatched Orders</h5>
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
                        :items="DispatchedOrders"
                        
                        no-data-text='No dispatched products yet'
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
export default {
    data(){
        return{
           headers: [
            {
                text: 'Customer Name',
                align: 'start',
                sortable: false,
                value: 'firstName',
            },
            { text: 'Payment Id', value: 'paymentId' },
            { text: 'Status', value: 'status' },
             { text: 'Total Price', value: 'totalPrice' },
            { text: 'Dispatched Date', value: 'updatedAt'},
            { text: '', value: 'action', sortable: false, },
            ],
            products: [
                {
                    name: 'JaneCooper',
                    product: 'Epiderm',
                    qty: '23',
                    date: '21/08/2020',
                    id: 1
                },
                {
                    name: 'JaneCooper',
                    product: 'Caro white',
                    qty: '23',
                    date: '21/08/2020',
                    id: 2
                },
                {
                    name: 'JaneCooper',
                    product: 'Tydineal',
                    qty: '2',
                    date: '21/08/2020',
                    id: 3
                },
                 
                 
            ],
            search:''
        }
    },
    methods: {
        View(id){
             this.$store.dispatch("OrderById", id)
            .then((success)=>{
                console.log(success)
                  this.$router.push('/pendingorders/'+id)
            })
            .catch(()=>{
            })
          
        },     
    },
     computed:{
         DispatchedOrders(){
      return this.$store.state.orders.dispatcheddata
        }
    },
    created(){
        this.$store.dispatch('DispatchedOrders')
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
.searchbk{
    background-color: #F0F0F0 !important;
}
</style>
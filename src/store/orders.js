import axios from 'axios';

export const orders = {
    state: {
        neworders: [],
        ordersCount: {},
        orderById:{}
    },
    mutations: {
        NewOrders(state, data){
          state.neworders = data 
        },
        ordersCount(state, data){
            state.ordersCount = data.countOfAllOrder
        },
        OrderById(state, item){
          state.orderById = item
        }
        
    },
    actions:{
        NewOrders: ({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/orders')
          .then(({data, status})=>{
            if(status === 200){
              commit('NewOrders', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })
      },
      ordersCount: ({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/orders/count')
          .then(({data, status})=>{
            if(status === 200){
              commit('ordersCount', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })
      },
      OrderById: ({commit}, item) => {
        commit('OrderById', item)
            
    }   
        
    },
   
}
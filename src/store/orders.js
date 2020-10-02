import axios from 'axios';
import moment from 'moment'

export const orders = {
    state: {
        neworders: [],
        dispatcheddata: [],
        completedOrders: [],
        ordersCount: {},
        orderById:{}
    },
    mutations: {
        NewOrders(state, data){
          state.neworders = data 
        },
        DispatchedOrders(state, data){
          let dispatched = data
          for(let i=0; i<dispatched.length; i++){
              dispatched[i].updatedAt = moment(dispatched[i].updatedAt).format('LL')
          }
          state.dispatcheddata = dispatched
        },
       CompletedOrders(state, data){
          let completed = data
          for(let i=0; i<completed.length; i++){
              completed[i].updatedAt = moment(completed[i].updatedAt).format('LL')
          }
          state.completedOrders = completed
       },
        ordersCount(state, data){
            state.ordersCount = data.countOfAllOrder
        },
        OrderById(state, data){
          state.orderById = data
        }
        
    },
    actions:{
        NewOrders: ({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/orders/Pending')
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
      DispatchedOrders :({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/orders/Dispatched')
          .then(({data, status})=>{
            if(status === 200){
              commit('DispatchedOrders', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })
      },
      CompletedOrders : ({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/orders/Completed')
          .then(({data, status})=>{
            if(status === 200){
              commit('CompletedOrders', data)
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
          axios.get('/count/orders')
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
      OrderById: ({commit},payload) => {
        return new Promise((resolve, reject)=>{
          axios.get('/order/'+payload)
          .then(({data, status})=>{
            if(status === 200){
              commit('OrderById', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })  
      } ,
      DispatchOrder: ({commit}, payload) =>{
        return new Promise((resolve, reject)=>{
          axios.post("/dispatchorder", payload)
          .then(({status, data})=>{
              if(status === 201){
              resolve(data);
              commit()
              }
          })
          .catch((error)=>{
              reject(error);
          });
          })
      }  
        
    },
   
}
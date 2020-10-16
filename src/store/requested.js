import axios from 'axios';

export const requested = {
    state: {
     requested: [],
     request: {}
    },
    mutations: {
        Requested(state, data){
           state.requested = data 
        },
        ViewRequested(state, id){
             var entries = state.requested.find(pro => pro.id === id)
             state.request = entries
        }
    },
    actions:{
        RequestedProducts: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/requestproduct")
            .then(({data, status})=>{
              if(status === 200){
                commit('Requested', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        viewRequested: ({commit}, payload)=>{
            commit('ViewRequested', payload)
        },
        replyRequest: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            let send = {
              "reply": payload.reply,
          }
            axios.put("/reply/"+payload.id, send)
            .then(({status, data})=>{
                if(status === 200){
                resolve(data);
                commit()
                }
            })
            .catch((error)=>{
                reject(error);
            });
            })
        },
        
   } 
}
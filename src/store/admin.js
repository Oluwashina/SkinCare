import axios from 'axios';

export const admin = {
    state: {
     admin: [],
    },
    mutations: {
        Admin(state, data){
           state.admin = data 
        },
    },
    actions:{
       GetAdmin: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/admin/member")
            .then(({data, status})=>{
              if(status === 200){
                commit('Admin', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        DeleteAdmin: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.delete("/admin/member/"+payload)
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
        AddAdmin:  ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
                axios.post("/admin/member", payload)
              .then(({data, status})=>{
                if(status === 201){
                  resolve(data)
                  commit()
                }
              })
              .catch((error)=>{
                reject(error)
              })
            })
        }
               
    } 
}
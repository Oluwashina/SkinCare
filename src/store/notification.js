import axios from 'axios';

export const notification = {
    state: {
     unread: [],
     unreadcount: 0
    },
    mutations: {
      UnreadNotfications(state, data){
           state.unread = data.allNotification 
        },
        Unreadcount(state, data){
          state.unreadcount = data.countunread
        }
    },
    actions:{
      getUnreadNotifications: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/allnotifications")
            .then(({data, status})=>{
              if(status === 200){
                commit('UnreadNotfications', data)
                commit('Unreadcount', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        MarkNotification:  ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            axios.post("/markread", payload)
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
        }
               
    } 
}
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
            var bodyFormData = new FormData();
            bodyFormData.append('files', payload.files);
            bodyFormData.set('description', payload.description);
            return new Promise((resolve, reject)=>{
              axios({
                method: 'post',
                url: '/adverts',
                data: bodyFormData,
                config: { }
                    })
                .then(({data, status}) => {
                    if(status===201){
                        resolve(data)
                        commit()
                    }
                  
                })
                .catch((error)=>{
                    reject(error)
                 });
            })
        }
               
    } 
}
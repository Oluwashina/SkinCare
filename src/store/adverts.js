import axios from 'axios';

export const adverts = {
    state: {
     adverts: [],
     request: {}
    },
    mutations: {
        Images(state, data){
           state.adverts = data 
        },
    },
    actions:{
        GetAdverts: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/adverts")
            .then(({data, status})=>{
              if(status === 200){
                commit('Images', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        DeleteAdvert: ({commit}, payload)=>{
            return new Promise((resolve, reject)=>{
                axios.delete("/adverts/"+payload)
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
        AddAdvert:  ({commit},payload)=>{
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
import axios from 'axios';

export const skin = {
    state: {        
        issues: [],
        symptoms: [],
        issuesLength: 0   
    },
    mutations: {
        Products(state, data){
          state.products = data 
        },
        Symptoms(state, data){
          state.symptoms = data.symptom
        },
        Issues(state, data){
          state.issues = data
        },
        IssuesLength(state, data){
          state.issuesLength = data.length
        }
     
    },
    actions:{
      getSymptoms: ({commit},payload)=>{
        return new Promise((resolve, reject)=>{
          axios.get('/symptom/'+payload)
          .then(({data, status})=>{
            if(status === 200){
              commit('Symptoms', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })
      },
      AddSymptom: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
              axios.post("/symptom", payload)
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
        },
        AddSkinIssue: ({commit}, payload)=>{
          var bodyFormData = new FormData();
          bodyFormData.set('name', payload.name);
          bodyFormData.set('description', payload.description);
          bodyFormData.set('symptom', JSON.stringify(payload.symptom));
          bodyFormData.set('category', payload.category);
          bodyFormData.append('files', payload.files);
          return new Promise((resolve, reject)=>{
            axios({
              method: 'post',
              url: '/skinissue',
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
        },
        editSkinIssues: ({commit}, payload) =>{
            commit('EditProduct', payload)
        },
        GetSkinIssues: ({commit})=>{
          return new Promise((resolve, reject)=>{
            axios.get(`/skinissue`)
            .then(({data, status})=>{
              if(status === 200){
                commit('IssuesLength', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        GetSkinIssuesLimit: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            axios.get(`/skinissue?limit=${payload.limit}&offset=${payload.Offset}`)
            .then(({data, status})=>{
              if(status === 200){
                commit('Issues', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        }

    },
   
}
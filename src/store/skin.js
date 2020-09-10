import axios from 'axios';

export const skin = {
    state: {        
        issues: [],
        symptoms: []   
    },
    mutations: {
        Products(state, data){
          state.products = data 
        },
        Symptoms(state, data){
          state.symptoms = data
        },
        Issues(state, data){
          state.issues = data
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
        UpdateProduct: ({commit}, payload)=>{
          var bodyFormData = new FormData();
          bodyFormData.set('name', payload.name);
          bodyFormData.set('price', payload.price);
          bodyFormData.set('quantityAvailable', payload.quantityAvailable);
          bodyFormData.append('files', payload.files);
          return new Promise((resolve, reject)=>{
            axios({
              method: 'put',
              url: '/products/'+payload.id,
              data: bodyFormData,
              config: { }
                  })
              .then(({data, status}) => {
                  if(status===200){
                      resolve(data)
                      commit()
                  }
                
              })
              .catch((error)=>{
                  reject(error)
               });
          })
        },
        editProduct: ({commit}, payload) =>{
            commit('EditProduct', payload)
        },
        GetSkinIssues: ({commit})=>{
          return new Promise((resolve, reject)=>{
            axios.get("/skinissue")
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
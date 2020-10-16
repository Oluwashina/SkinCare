import axios from 'axios';

export const questionnaire = {
    state: {
     questionnaire: [],
     question: {}
    },
    mutations: {
        Questionnaire(state, data){
           state.questionnaire = data 
        },
        ViewQuestions(state, id){
             var entries = state.questionnaire.find(pro => pro.id === id)
             state.question = entries
        }
    },
    actions:{
        Questionnaire: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/questioniareentry")
            .then(({data, status})=>{
              if(status === 200){
                commit('Questionnaire', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        ViewQuestions: ({commit}, payload)=>{
            commit('ViewQuestions', payload)
        },
        replyQuestions: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            let send = {
              "reply": payload.reply,
          }
            axios.put("/questioniareentry/"+payload.id, send)
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
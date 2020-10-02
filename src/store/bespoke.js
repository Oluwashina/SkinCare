import axios from 'axios';

export const bespoke = {
    state: {
      questions: [],
      question: {},
      entries: [],
      entry: {}
    },
    mutations: {
        Questions(state, data){
            state.questions = data
        },
        Entries(state, data){
           state.entries = data 
        },
        ViewEntry(state, id){
             var entries = state.entries.find(pro => pro.id === id)
             state.entry = entries
        },
        EditQuestion(state, id){
            var questions = state.questions.find(pro => pro.id === id)
            state.question = questions
            console.log(questions, "d")
        }
    },
    actions:{
        BespokeQuestions: ({commit})=>{
          return new Promise((resolve, reject)=>{
            axios.get("/questions")
            .then(({data, status})=>{
              if(status === 200){
                commit('Questions', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        BespokeEntries: ({commit})=>{
            return new Promise((resolve, reject)=>{
            axios.get("/entry")
            .then(({data, status})=>{
              if(status === 200){
                commit('Entries', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        viewEntry: ({commit}, payload)=>{
            commit('ViewEntry', payload)
        },
        editQuestion: ({commit}, payload)=>{
            commit('EditQuestion', payload)
        },
        AddBespoke: ({commit},payload)=>{
         return new Promise((resolve, reject)=>{
          axios.post("/question", payload)
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
        },
        EditBespoke: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
                let send = {
                    "question": payload.question,
                    "type": payload.type,
                    "options": payload.options 
                }
          axios.put("/questions/"+payload.id, send)
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
        DeleteQuestions: ({commit}, payload)=>{
         return new Promise((resolve, reject)=>{
          axios.delete("/questions/"+payload)
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
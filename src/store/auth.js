import axios from 'axios';

export const auth = {
    state: {
        token: localStorage.getItem("token") || '',
        logindetails: {},
        isLogged:false,
        users: []
    },
    mutations: {
        Token(state,token){
            state.token = token
            state.isLogged = true
            },
        LoginDetails(state, data){
            state.logindetails = data
        },
          Users(state, data){
            state.users = data
          },
        Logout(state){
          state.isLogged = false
        }
    },
    actions:{
        // login here
        Login: ({commit}, payload) => {
            return new Promise((resolve, reject)=>{
              axios.post("/authenticate",payload)
              .then(({data, status})=>{
                if(status === 200){
                  const token = data.token
                  localStorage.setItem("token", token)
                  axios.defaults.headers.common['Authorization'] = token
                  commit('Token', token)
                  commit('LoginDetails', data.profile)
                  resolve(data);
                }
              })
              .catch((error)=>{
                reject(error);
              });
            })
          },
          ChangePassword: ({commit},payload)=>{
            return new Promise((resolve, reject)=>{
              axios.post("/changeadminpassword",payload)
              .then(({data, status})=>{
                if(status === 201){
                  resolve(data)
                  commit()
                }
              })
              .catch((error)=>{
                reject(error);
              });
            })
          },
        getUsers: ({commit})=>{
          return new Promise((resolve, reject)=>{
            axios.get("/members?limit=5")
            .then(({data, status})=>{
              if(status === 200){
                commit('Users', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        AUTH_LOGOUT: ({commit})=>{
          return new Promise((resolve) => {
            localStorage.removeItem("token")
            window.localStorage.removeItem("vuex")  
            commit('Logout')        
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            if(localStorage.getItem("vuex")){
              resolve()
            }else{
              resolve()
             
            }
            
          })
        },
    },
   
}
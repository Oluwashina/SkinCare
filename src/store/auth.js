import axios from 'axios';

export const auth = {
    state: {
        token: localStorage.getItem("token") || '',
        logindetails: {},
        isLogged:false,
    },
    mutatons: {
        Login(state,token){
            state.token = token
            state.isLogged = true
            },
        LoginDetails(state, data){
            state.logindetails = data
        },
    },
    actions:{
        // login here
        Login: ({commit}, payload) => {
            return new Promise((resolve, reject)=>{
              axios.post("/user_auth",payload)
              .then(({data, status})=>{
                if(status === 200){
                  const token = data.data.tokens
                  localStorage.setItem("token", token)
                  axios.defaults.headers.common['Authorization'] = token
                  commit('Login', token)
                  commit('LoginDetails', data)
                  resolve(data);
                }
              })
              .catch((error)=>{
                reject(error);
              });
            })
          },
    }
}
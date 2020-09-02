import axios from 'axios';

export const products = {
    state: {
        
        products: [],
        productsOriginal: [],
        productsLength:0,
        product: {}
    },
    mutations: {
        Products(state, data){
          state.products = data
          state.productsOriginal = data
          state.productsLength = data.length
        },
        ProductFilter(state,word){
            word=word.toLowerCase()
            state.products = state.productsOriginal.filter(function (item) {
                return item.name.toLowerCase().includes(word.toLowerCase());
            });
        },
        EditProduct(state, id){
          var product = state.products.find(pro => pro.id === id)
          state.product = product
        }
    },
    actions:{
        getProducts: ({commit})=>{
          return new Promise((resolve, reject)=>{
            axios.get("/products")
            .then(({data, status})=>{
              if(status === 200){
                commit('Products', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        productFilter: ({commit}, word) => {
            commit('ProductFilter', word)
                
        },
        AddProduct: ({commit},payload)=>{
            var bodyFormData = new FormData();
            bodyFormData.set('name', payload.name);
            bodyFormData.set('price', payload.price);
            bodyFormData.set('quantityAvailable', payload.quantityAvailable);
            bodyFormData.append('files', payload.files);
            return new Promise((resolve, reject)=>{
              axios({
                method: 'post',
                url: '/product',
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
        editProduct: ({commit}, payload) =>{
            commit('EditProduct', payload)
        }

    },
   
}
import axios from 'axios';

export const products = {
    state: {
        
        products: [],
        pageproducts: [],
        productsOriginal: [],
        productsLength:0,
        product: {}
    },
    mutations: {
        Products(state, data){
          state.products = data 
        },
        ProductsCount(state, data){
          state.productsLength = data.countOfAllProduct
        },
        PageProducts(state, data){
          state.pageproducts = data
          state.productsOriginal = data
        },
        ProductFilter(state,word){
            word=word.toLowerCase()
            state.pageproducts = state.productsOriginal.filter(function (item) {
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
          axios.get('/products')
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
      getProductsCount: ({commit})=>{
        return new Promise((resolve, reject)=>{
          axios.get('/products/count')
          .then(({data, status})=>{
            if(status === 200){
              commit('ProductsCount', data)
              resolve(data)
            }
          })
          .catch((error)=>{
            reject(error)
          })
        })
      },
        getPageProducts: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            axios.get(`/products?limit=${payload.limit}&offset=${payload.Offset}`)
            .then(({data, status})=>{
              if(status === 200){
                commit('PageProducts', data)
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
        offsetProduct: ({commit})=>{
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
        }

    },
   
}
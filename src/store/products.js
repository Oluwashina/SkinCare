import axios from 'axios';

export const products = {
    state: {
        
        products: [],
        hairproducts: [],
        skinproducts: [],
        productsOriginal: [],
        productsLength:0,
        HairCount: 0,
        SkinCount: 0,
        product: {}
    },
    mutations: {
        Products(state, data){
          state.products = data 
        },
        ProductsCount(state, data){
          state.productsLength = data.countOfAllProduct
          state.HairCount = data.countHair
          state.SkinCount = data.counSkin
        },
        HairProducts(state, data){
          state.hairproducts = data
          state.productsOriginal = data
        },
        SkinProducts(state, data){
          state.skinproducts = data
        },
        ProductFilter(state,word){
            word=word.toLowerCase()
            state.pageproducts = state.productsOriginal.filter(function (item) {
                return item.name.toLowerCase().includes(word.toLowerCase());
            });
        },
        EditProduct(state, id){
          var product = state.hairproducts.find(pro => pro.id === id)
          state.product = product
        },
        SkinProduct(state, id){
          var product = state.skinproducts.find(pro => pro.id === id)
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
        getHairProducts: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            axios.get(`/products/Hair?limit=${payload.limit}&offset=${payload.Offset}`)
            .then(({data, status})=>{
              if(status === 200){
                commit('HairProducts', data)
                resolve(data)
              }
            })
            .catch((error)=>{
              reject(error)
            })
          })
        },
        getSkinProducts: ({commit},payload)=>{
          return new Promise((resolve, reject)=>{
            axios.get(`/products/Skin?limit=${payload.limit}&offset=${payload.Offset}`)
            .then(({data, status})=>{
              if(status === 200){
                commit('SkinProducts', data)
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
            bodyFormData.set('category', payload.category);
            bodyFormData.set('description', payload.description);
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
          bodyFormData.set('category', payload.category);
          bodyFormData.set('description', payload.description);
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
        skinProduct: ({commit}, payload) =>{
          commit('SkinProduct', payload)
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
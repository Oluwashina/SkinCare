import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import {auth} from './auth'
import {products} from './products'
import {orders} from './orders'
import {skin} from './skin'
import {bespoke} from './bespoke'
import {requested} from './requested'
import {questionnaire} from './questionnaire'
import {adverts} from './adverts'
import {notification} from './notification'

Vue.use(Vuex)


const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => state,
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    auth: auth,
    products: products,
    orders: orders,
    skin: skin,
    bespoke: bespoke,
    requested: requested,
    questionnaire: questionnaire,
    adverts: adverts,
    notification: notification
  }
})

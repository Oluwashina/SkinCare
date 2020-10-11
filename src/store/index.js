import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth'
import {products} from './products'
import {orders} from './orders'
import {skin} from './skin'
import {bespoke} from './bespoke'
import {requested} from './requested'
import {questionnaire} from './questionnaire'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    products: products,
    orders: orders,
    skin: skin,
    bespoke: bespoke,
    requested: requested,
    questionnaire: questionnaire
  }
})

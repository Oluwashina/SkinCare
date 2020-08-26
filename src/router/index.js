import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import SkinIssues from '../views/SkinIssues.vue'
import AdminNav from '../Layouts/AdminLayout.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  
  // admin here
  {
    path: '/dashboard',
    redirect: 'dashboard',
    component: AdminNav,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/newproduct',
        name: 'NewProduct',
        component: NewProduct
      },
      {
        path: '/skinissues',
        name: 'SkinIssues',
        component: SkinIssues
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

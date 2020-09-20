import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import RequestedProducts from '../views/RequestedProducts.vue'
import NewOrders from '../views/NewOrders.vue'
import OrderById from '../views/OrderById.vue'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import SkinIssues from '../views/SkinIssues.vue'
import AdminNav from '../Layouts/AdminLayout.vue'
import AddSkinIssue from '../views/AddSkinIssue.vue'
import Bespoke from '../views/Bespoke.vue';
import BespokeById from '../views/BespokeById.vue'
import BespokeAdd from '../views/BespokeAdd.vue'
import BespokeEdit from '../views/BespokeEdit.vue'
import EditProduct from '../views/EditProduct.vue'
import PendingOrders from '../views/PendingOrders.vue'
import PendingOrderById from '../views/PendingOrderById'
import CompletedOrders from '../views/CompletedOrders.vue'
import CompletedOrdersById from '../views/CompletedOrdersById.vue'

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
        path: '/neworders',
        name: 'NewOrders',
        component: NewOrders
      },
      {
        path: '/orders/:id',
        name: 'OrderById',
        component: OrderById
      },
      {
        path: '/pendingorders',
        name: 'PendingOrders',
        component: PendingOrders
      },
      {
        path: '/pendingorders/:id',
        name: 'PendingOrderById',
        component: PendingOrderById
      },
      {
        path: '/completedorders',
        name: 'CompletedOrders',
        component: CompletedOrders
      },
      {
        path: '/completedorders/:id',
        name: 'CompletedOrdersById',
        component: CompletedOrdersById
      },
      {
        path: '/requestedproducts',
        name: 'RequestedProducts',
        component: RequestedProducts
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/products/new',
        name: 'NewProduct',
        component: NewProduct
      },
       {
        path: '/product/edit/:id',
        name: 'EditProduct',
        component: EditProduct
      },
      {
        path: '/skinissues',
        name: 'SkinIssues',
        component: SkinIssues
      },
      {
        path: '/skinissues/add',
        name: 'AddSkinIssue',
        component: AddSkinIssue
      },
      {
        path: '/bespoke',
        name: 'Bespoke',
        component: Bespoke
      },
      {
        path: '/bespoke/:id',
        name: 'BespokeById',
        component: BespokeById
      },
      {
        path: '/addbespoke',
        name: 'BespokeAdd',
        component: BespokeAdd
      },
      {
        path: '/editbespoke/:id',
        name: 'BespokeEdit',
        component: BespokeEdit
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

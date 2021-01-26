import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Dashboard from '../views/Dashboard.vue'
import RequestedProducts from '../views/RequestedProducts.vue'
import RequestedProductsById from '../views/RequestedProductsById.vue'
import NewOrders from '../views/NewOrders.vue'
import OrderById from '../views/OrderById.vue'
import Products from '../views/Products.vue'
import NewProduct from '../views/NewProduct.vue'
import SkinIssues from '../views/SkinIssues.vue'
import EditSkinIssues from '../views/EditSkinIssues.vue'
import AdminNav from '../Layouts/AdminLayout.vue'
import AddSkinIssue from '../views/AddSkinIssue.vue'
import Bespoke from '../views/Bespoke.vue';
import BespokeById from '../views/BespokeById.vue'
import BespokeAdd from '../views/BespokeAdd.vue'
import BespokeEdit from '../views/BespokeEdit.vue'
import EditProduct from '../views/EditProduct.vue'
import DispatchedOrders from '../views/Dispatched.vue'
import PendingOrderById from '../views/PendingOrderById'
import CompletedOrders from '../views/CompletedOrders.vue'
import CompletedOrdersById from '../views/CompletedOrdersById.vue'
import Questionnaire from '../views/Questionnaire.vue'
import QuestionnaireById from '../views/QuestionnaireById.vue'
import QuestionnaireAdd from '../views/QuestionnaireAdd.vue'
import QuestionnaireEdit from '../views/QuestionnaireEdit.vue'
import Adverts from '../views/Adverts.vue'
import Notifications from '../views/Notifications.vue'
import FAQ from '../views/FAQ.vue'
import Admin from '../views/Admin.vue'
import NewAdmin from '../views/NewAdmin.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
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
        component: Dashboard,
        meta: {
          reload: true
        }
      },
      {
        path: '/neworders',
        name: 'NewOrders',
        component: NewOrders,
      },
      {
        path: '/orders/:id',
        name: 'OrderById',
        component: OrderById
      },
      {
        path: '/dispatchedorders',
        name: 'DispatchedOrders',
        component: DispatchedOrders
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
        path: '/requestedproducts/:id',
        name: 'RequestedProductsById',
        component: RequestedProductsById
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
        path: '/products/edit/:id',
        name: 'EditProduct',
        component: EditProduct
      },
      {
        path: '/skinissues',
        name: 'SkinIssues',
        component: SkinIssues
      },
      {
        path: '/skinissues/edit/:id',
        name: 'EditSkinIssues',
        component: EditSkinIssues
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
      },
      {
        path: '/questionnaire',
        name: 'Questionnaire',
        component: Questionnaire
      },
      {
        path: '/questionnaire/:id',
        name: 'QuestionnaireById',
        component: QuestionnaireById
      },
      {
        path: '/addquestionnaire',
        name: 'QuestionnaireAdd',
        component: QuestionnaireAdd
      },
      {
        path: '/editquestionnaire/:id',
        name: 'QuestionnaireEdit',
        component: QuestionnaireEdit
      },
      {
        path: '/adverts',
        name: 'Adverts',
        component: Adverts
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin
      },
      {
        path: '/admin/create',
        name: 'New Admin',
        component: NewAdmin
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

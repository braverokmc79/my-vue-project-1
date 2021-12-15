import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductCreate from '../views/ProductCreate.vue'
import SalesList from '../views/SalesList.vue'
import ImageInsert from '../views/ImageInsert.vue'
import ProductUpdate from '../views/ProductUpdate.vue'



const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/about',
    name: 'About',
    component: About
  }
  ,
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/detail',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/create',
    name: 'ProductCreate',
    component: ProductCreate
  }

  ,
  {
    path: '/salesList',
    name: 'salesList',
    component: SalesList
  },

  {
    path: '/image_insert',
    name: 'ImageInsert',
    component: ImageInsert
  }

  ,

  {
    path: '/update',
    name: 'ProductUpdate',
    component: ProductUpdate
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import DatePickerView from '../views/DatePicker.vue'
import ListView from '../views/ListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FormView
    },
    {
      path:'/test',
      component:DatePickerView
    },
    {
      path:'/list',
      name:'list',
      component:ListView
    },
    {
      path:'/login'
      ,name:'login',
      component: ()=>import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

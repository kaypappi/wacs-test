import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue';
import Main from '../components/Main-template/Main.vue';
import UserSetup from '../views/UserSetup';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'user-setup',
        component: UserSetup
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

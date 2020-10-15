import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TelaInicial from '../views/telainicial/TelaInicial.vue'
import Login from '../views/login/Login.vue'
import Cadastro from '../views/cadastro/Cadastro.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/",
  //   redirect: {
  //     name: "Login"
  //   }
  // },
  {
    path: '/telainicial',
    name: 'telainicial',
    component: TelaInicial
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '*',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // beforeEnter: (to, from, next) => {
    //   console.log('chamando a rota');
    //   if (store.getters.logged == false) {
    //     next("/login");
    //   } else {
    //     next();
    //   }
    // }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

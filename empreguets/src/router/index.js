import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import axios from 'axios'
import Home from '../views/Home.vue'
import TelaInicial from '../views/telainicial/TelaInicial.vue'
import Login from '../views/login/Login.vue'
import Cadastro from '../views/cadastro/Cadastro.vue'
import homeScreen from '../views/homeScreen/homeScreen.vue'
import Perfil from '../views/perfil/perfil.vue'
import Localizacao from '../views/localizacao/localizacao.vue'
import Grafico from '../views/grafico/Pie.vue'
import Historico from '../views/historico/Historico.vue'
import meuPerfil from '../views/meuPerfil/meuPerfil.vue'

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
    path: '/Home',
    name: 'homeScreen',
    component: homeScreen
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
    name: 'telainicial',
    component: TelaInicial
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
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
  },
  {
    path: '/localizacao',
    name: 'Localizacao',
    component: Localizacao,
  },
  {
    path: '/grafico',
    name: 'Grafico',
    component: Grafico,
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
  },
  {
    path: '/meuperfil',
    name: 'meuPefil',
    component: meuPerfil,
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
router.beforeEach((to, from, next) => {
  if (from.path == '/login' && to.path == '/home') {
        next()
      } else if(to.path == '/login'){
        store.commit('SET_RENDER_APP', false)
        next()
      } else if(to.path == '/cadastro'){
        store.commit('SET_RENDER_APP', false)
        next()
      } else if(from.path == '/cadastro'){
        next('/login')
      }
      else{
        axios.get(`${process.env.VUE_APP_BASEURL}/profile`, {headers: {
          authorization: localStorage.getItem('token')
        }
      }).then(response =>{
        store.commit("SET_USER_DATA", response.data.data[0]);
        store.commit("SET_RENDER_APP", true);
          next();
        }).catch(err => {
          if (err.response.status == 403) {
            store.commit("SET_AUTHENTICATED", false)
            next('/login')
          }
        })
      }
})
export default router

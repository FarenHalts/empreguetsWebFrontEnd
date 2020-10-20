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
// router.beforeEach((to, from, next) => {
//   console.log(from.path);
//   console.log(to.path);
//   if (from.path == '/login') {
//     console.log('if 1');
//     next()
//   } else if(to.path == '/login'){
//     console.log('if 2');
//     next()
//   } else if(to.path == '/cadastro'){
//     console.log('if 3');
//     next()
//   } else if(from.path == '/cadastro'){
//     console.log('if 4');
//     next()
//   }
//   else {
//     console.log('bucetinha');
//     axios.get('https://hom.roit.ai/roit-people-analytics/api/v1/reports/closing-register/202008',
//     {
//       headers: {
//         Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJVMkZzZEdWa1gxOFA5YlMwcFFFSkNKSFk2V2ZCdUFUdmZBdVAwWjF2dUU2Vi9WNE5xRTlINmU0TGhtVlRYbjAzbHZQTWc5TVhYWm5VTDVWOElqUkZ5cDJ2ck10a0o5dnZ2SVZjWWx1ZStFQ3NkTWtjblJ5eEVkV1ZFWkkwVWRSWjNwQzA5K1NGZDlSa09pZkZqSlVMaUhEWGZHelZGRFpjRlZVTEFiVlN1UHFjQS9UUVdGQVJ6d3dOZjVMcTBMaVRhTFlIVTFNWXBQQXRYUFlEbExCL1ZDN2wxblJsV3hsMm80STFwM0JTOFVadGVjSjNJVVVlUjROK0xTWkJqZGplN3drNXZQdFpIbmQ1T1JjeGlVcEFZOFcwQ1JkOTVtSE0zZTdlV3FkU1U3ekU4aHl0OHdieFNNRW1ETEk2UlRMeWNLYnRveERNQWdGTFhLNHdvWG5KUU9BRUlSNG45YzhrVDRDMldINDBXOGNVemlrakZmUFFoT1oySGRFMkVKTWRjMTVtUG1BRHEzVFlGT2c1enpvbXh2TmxoTVhtVEZ3dFhDUVZ3SUZRZzBjSVhjZUZEcnp5Vmllc2J3aFIyci84MkVPWHE3WmFPS1hlbEpaZ3RVS2VveUYvZHlGWDcvT083TXJlV1dzZ3hGUWFHSXl6VG1YYy9yNzY0aGJCYUFoSSIsInByb3BhZ2F0ZUNhY2hlQ2xlYW51cCI6ZmFsc2V9LCJpYXQiOjE2MDI3MjgxNzAsImV4cCI6MTYwMjkwMDk3MH0.-kDW3fH0D_fm5rBaeYxejj6u77t0HfyV2FRB_f2BqAI',
//         CustomerId: 'fCdCRhpbsjgUYN5zSlaShwKFlQeqUaleqUal'
//       }
//     }).then(res => {
//       let asd = res.data.data;
//       console.log(asd);
//       next()
//       console.log('aaaaaaa');
//     }).catch(err => {
//       next('/login')
//       console.log(err);
//     })

//   }
// })
export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/styles/css/estilo.css";


//importação Element
import locale from "element-ui/lib/locale/lang/pt-br";

import "element-ui/lib/theme-chalk/index.css";

import ElementUI from "element-ui";
import { Loading } from "element-ui";

Vue.use(ElementUI, {locale});

//fim importação Element

//Import Bootstrap

import "bootstrap/dist/css/bootstrap.css";

//fim import bootstrap


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

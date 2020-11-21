import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/styles/css/estilo.css";

//Importação Prime Vue (Calendar)
import Calendar from 'primevue/calendar';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

Vue.component('Calendar', Calendar);
//Fim Importação Prime Vue (Calendar)


//importação Element
import locale from "element-ui/lib/locale/lang/pt-br";

import "element-ui/lib/theme-chalk/index.css";

import { Pie } from 'vue-chartjs'
import ElementUI from "element-ui";
import { Loading } from "element-ui";

import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_KEY_MAPS,
    libraries: 'places',
  },
})

Vue.use(ElementUI, {locale});

//fim importação Element

//Import Bootstrap

import "bootstrap/dist/css/bootstrap.css";

import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask)
let loadingInstance = Loading.service({
  lock: true,
  fullscreen: true
});
//fim import bootstrap


Vue.config.productionTip = false

new Vue({
  router,
  store,

  created(){
    this.logMain()
  },

methods:{
  logMain(){
    console.log('carregando a main');
  }
},
mounted() {
  loadingInstance.close();
},

  render: h => h(App)
}).$mount('#app')

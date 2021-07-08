import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { BootstrapVue, BootstrapVueIcons, SkeletonPlugin } from "bootstrap-vue";
import Vue2Filters from "vue2-filters";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles/main.css';

import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";


// IBM Plex should either be imported in your project by using Carbon
// or consumed manually through an import
//import "../ibm-plex-font.css";

Vue.use(chartsVue);


Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(SkeletonPlugin)
Vue.use(Vue2Filters);

Vue.config.devtools = true;

require('./interceptors');
require('@/store/subscriber');

/* axios.defaults.baseURL ='https://testapi.wacs.ng:4433/api/v1' */
axios.defaults.baseURL = 'https://wacs-refactor.herokuapp.com/api/v1';
/* axios.defaults.baseURL = 'https://wacs2.herokuapp.com/api/v1'; */
//axios.defaults.baseURL = 'http://wacs.test/api/v1';
/* axios.defaults.baseURL = "http://wacs.parkwayprojects.xyz/";
 */
Vue.config.productionTip = false;

store.dispatch('Auth/attempt', localStorage.getItem('access_token')).then(() => {
  require('@/services/roles');
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});





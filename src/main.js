import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles/main.css';

Vue.use(BootstrapVue);

Vue.config.devtools = true;

require('./interceptors');
require('@/store/subscriber');

axios.defaults.baseURL = 'https://wacs2.herokuapp.com/api/v1';

Vue.config.productionTip = false;

store.dispatch('auth/attempt', localStorage.getItem('access_token')).then(() => {
  require('@/services/roles');
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});





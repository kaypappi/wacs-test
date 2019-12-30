import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.devtools = true;

require('@/store/subscriber');

axios.defaults.baseURL = 'http://wacs.test/api/v1';

Vue.config.productionTip = false;

store.dispatch('auth/attempt', localStorage.getItem('access_token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});





import Vue from 'vue';
import App from './App.vue';

import router from './router/index';
import axios from 'axios';
// import store from './store/index';

import vuetify from './plugins/vuetify';

Vue.prototype.$axios = axios; // axios를 전역으로 설정
Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: (h) => h(App),
    router,
    // store,
}).$mount('#app');

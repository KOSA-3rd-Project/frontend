import Vue from 'vue';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import router from './router/index';

import App from './App.vue';
import './assets/style.css';

// import store from './store/index';


Vue.prototype.$axios = axios; // axios를 전역으로 설정
Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: (h) => h(App),
    router,
    // store,
}).$mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import mixins from '@/mixins/callAPI.js'
import mixins from './mixins'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

createApp(App)
    .use(router)
    .mixin(mixins)
    .use(store)
    .use(VueSweetalert2, options)
    .mount('#app')

window.Kakao.init("5b7dcd53656ab44ed757e119bea344fa");


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ant from 'ant-design-vue'
import store from './components/store'
import axios from 'axios'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  ant,
  axios
}).$mount('#app')

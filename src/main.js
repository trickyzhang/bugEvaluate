import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ant from 'ant-design-vue'
import store from './components/store'
import axios from 'axios'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
echarts.use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);
Vue.component('v-chart', VChart);
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  ant,
  axios
}).$mount('#app')

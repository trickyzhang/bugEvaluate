<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :width="200" :style="{ minHeight: '100vh', backgroundColor: '#313A43' }">
      <Aside />
    </a-layout-sider>

    <a-layout>
      <a-layout-header :style="{ background: '#26649D', padding: 0 }">
        <Header />
      </a-layout-header>

      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '@/components/Layout/Header.vue';
import Aside from '@/components/Layout/Aside.vue';
import { Layout } from 'ant-design-vue';

export default {
  name: 'BasicLayout',
  components: {
    Header,
    Aside,
    'a-layout': Layout,
    'a-layout-sider': Layout.Sider,
    'a-layout-content': Layout.Content,
    'a-layout-header': Layout.Header,
   },

  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

/* 根据规范，全局字体设置为微软雅黑 [cite: 32] */
body {
  font-family: "Microsoft YaHei",-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}
</style>
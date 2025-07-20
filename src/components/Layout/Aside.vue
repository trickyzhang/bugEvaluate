<template>
  <div>
    <div style="height: 64px; line-height: 64px; text-align: center;">
      <h1 style="color: white; font-size: 20px;">安全管理控制平台</h1>
    </div>
    <a-menu
      :selected-keys="[$route.path]"
      :open-keys.sync="openKeys"
      mode="inline"
      theme="dark"
    >
      <a-sub-menu key="sub_oneexpert">
        <span slot="title">
          <a-icon type="user" />
          <span>单专家管理</span>
        </span>
        <a-menu-item key="/oneexpert">
          <span><router-link to="/oneexpert">单专家任务</router-link></span>
        </a-menu-item>
        <a-menu-item key="/oneexpert/detail">
          <span><router-link to="/oneexpert/detail">漏洞详情</router-link></span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub_multiexpert">
        <span slot="title">
          <a-icon type="team" />
          <span>群体商评管理</span>
        </span>
        <a-menu-item key="/multiexpert">
          <span><router-link to="/multiexpert">群体任务</router-link></span>
        </a-menu-item>
        <a-menu-item key="/multiexpert/detail">
          <span><router-link to="/multiexpert/detail">群体商评详情</router-link></span>
        </a-menu-item>
        <a-menu-item key="/multiexpert/host">
          <span><router-link to="/multiexpert/host">群体商评主持详情</router-link></span>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub_chat">
        <span slot="title">
          <a-icon type="robot" />
          <span>大模型助手</span>
        </span>
        <a-menu-item key="/chat">
          <span><router-link to="/chat">对话</router-link></span>
        </a-menu-item>
        <!--<a-menu-item key="/chat/database">
          <span><router-link to="/chat/database">知识库管理</router-link></span>
        </a-menu-item>-->
      </a-sub-menu>
      <a-menu-item key="/editConfig">
        <span><router-link to="/editConfig"><a-icon type="setting" />大模型参数配置</router-link></span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>

import { Menu, Icon } from 'ant-design-vue';
export default {
  name: 'AsideComponent',
  components: {
    'a-menu': Menu,
    'a-sub-menu': Menu.SubMenu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
  data() {
    return {
      openKeys: [],
    };
  },
  watch: {
    '$route'(to) {
      const parentKey = this.getParentKey(to.path);
      if (parentKey && !this.openKeys.includes(parentKey)) {
        this.openKeys = [parentKey];
      }
    }
  },
  created() {
    const parentKey = this.getParentKey(this.$route.path);
    if (parentKey) {
      this.openKeys = [parentKey];
    }
  },
  methods: {
    getParentKey(path) {
      if (path.startsWith('/oneexpert')) return 'sub_oneexpert';
      if (path.startsWith('/multiexpert')) return 'sub_multiexpert';
      if (path.startsWith('/chat')) return 'sub_chat';
      if (path.startsWith('/editConfig')) return null;
      return null;
    }
  }
};
</script>

<style>
/* 根据规范，侧边栏导航文字大小为16px */
.ant-menu-inline .ant-menu-item,
.ant-menu-inline .ant-menu-submenu-title {
    font-size: 16px;
}

/* 新增样式: 
  覆盖 antd dark 主题默认的灰色文字 (rgba(255,255,255,0.65))，
  将其和图标统一设置为纯白色。
*/
.ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    color: #FFFFFF;
}
.ant-menu-dark .ant-menu-item > a,
.ant-menu-dark .ant-menu-item > span > a {
    color: #FFFFFF;
}
.ant-menu-dark .ant-menu-item .anticon,
.ant-menu-dark .ant-menu-submenu-title .anticon {
    color: #FFFFFF;
}
</style>
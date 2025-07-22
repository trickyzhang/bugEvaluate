<template>
  <div class="header-content">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in breadcrumbs" :key="item">
        {{ item }}
      </a-breadcrumb-item>
    </a-breadcrumb>

    <div class="header-right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          欢迎, {{ user.username }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
              <a href="javascript:;" @click="exit">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, Dropdown, Menu, Icon } from 'ant-design-vue';

export default {
  name: 'HeaderComponent',
  components: {
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
  data() {
    return {
      user: {
        username: '',
      }
    };
  },
  created() {
    this.user.username = this.$store.getters['auth/userInfo'].account;
  },
  computed: {
    breadcrumbs() {
      const crumbs = [];
      if (this.$route.meta.parent) {
        crumbs.push(this.$route.meta.parent);
      }
      if (this.$route.meta.title) {
        crumbs.push(this.$route.meta.title);
      }
      return crumbs;
    }
  },
  methods: {
    exit() {
      this.$router.push('/login');
      this.$message.success('Successfully logged out');
    },
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

/* 根据规范，头部标题文字为14px 。*/
.header-content,
.ant-dropdown-link {
    font-size: 14px;
    color: #FFFFFF;
}

/* 修改面包屑分隔符颜色 */
.header-content .ant-breadcrumb-separator {
    color: #FFFFFF;
}

/* 修改面包屑最后一项的颜色 */
.header-content .ant-breadcrumb > span:last-child {
    color: #FFFFFF;
}

.header-right {
  display: flex;
  align-items: center;
}
</style>
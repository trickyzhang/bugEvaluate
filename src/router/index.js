import Vue from "vue";
import VueRouter from "vue-router";


// 导入组件
import Login from '../components/Login.vue';
import Layout from '../components/Layout/Layout.vue'; // 修正路径
import OneExpertInit from '../components/OneExpert/OneExpertInit.vue';
import OneExpertDetail from '../components/OneExpert/OneExpertDetail.vue';
import MultiExpertInit from '../components/MultiExpert/MultiExpertInit.vue';
import MultiExpertDetail from '../components/MultiExpert/MultiExpertDetail.vue';
import MultiExpertHost from '../components/MultiExpert/MultiExpertHost.vue';
import ChatDetail from '../components/Chat/ChatDetail.vue';
import KnowledgeDatabase from '../components/Chat/KnowledgeDatabase.vue';
import EditConfig from '../components/ModelConfig/EditConfig.vue';

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login', // 将登录页路由明确为 /login
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/login',
      children: [
        {
          path: 'oneexpert',
          name: 'OneExpertInit',
          component: OneExpertInit,
          meta: { title: '单专家任务', parent: '单专家管理' }
        },
        {
          path: 'oneexpert/detail',
          name: 'OneExpertDetail',
          component: OneExpertDetail,
          meta: { title: '漏洞详情', parent: '单专家管理' }
        },
        {
          path: 'multiexpert',
          name: 'MultiExpertInit',
          component: MultiExpertInit,
          meta: { title: '群体任务', parent: '群体商评管理' }
        },
        {
          path: 'multiexpert/detail',
          name: 'MultiExpertDetail',
          component: MultiExpertDetail,
          meta: { title: '群体商评详情', parent: '群体商评管理' }
        },
        {
          path: 'multiexpert/host',
          name: 'MultiExpertHost',
          component: MultiExpertHost,
          meta: { title: '群体商评主持详情', parent: '群体商评管理' }
        },
        {
          path: 'chat',
          name: 'ChatDetail',
          component: ChatDetail,
          meta: { title: '对话', parent: '大模型助手' }
        },
        {
          path: 'chat/database',
          name: 'KnowledgeDatabase',
          component: KnowledgeDatabase,
          meta: { title: '知识库管理', parent: '大模型助手' }
        },
        {
          path: 'editConfig',
          name: 'EditConfig',
          component: EditConfig,
          meta: { title: '大模型参数配置' }
        }
      ]
    },
    // 添加一个重定向，如果用户直接访问 /，则跳转到登录页或主页
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth_token');
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

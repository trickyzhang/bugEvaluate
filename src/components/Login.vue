<template>
    <div class="login-container">
      <div class="login-form-wrapper">
        <h2 class="login-title">系统登录</h2>
        <a-form :form="form" :rules="rules" ref="formRef">
          <a-form-item prop="username">
            <a-input
              v-decorator="['username', { rules: rules.username }]"
              placeholder="请输入用户名"
              size="large"
            >
              <a-icon slot="prefix" type="user" class="site-form-item-icon" />
            </a-input>
          </a-form-item>
  
          <a-form-item prop="password">
            <a-input-password
              v-decorator="['password', { rules: rules.password }]"
              placeholder="请输入密码"
              size="large"
            >
              <a-icon slot="prefix" type="lock" class="site-form-item-icon" />
            </a-input-password>
          </a-form-item>
  
          <a-form-item>
            <a-button
              type="primary"
              @click="login"
              :loading="loading"
              size="large"
              class="login-button"
            >
              登 录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </template>
  
  <script>
 
  import { Form, Icon, Input, Button, message } from 'ant-design-vue';
  import api from '@/utils/axios';

  
  export default {
    name: 'LoginPage',
    components: {
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-icon': Icon,
      'a-input': Input,
      'a-input-password': Input.Password, // 注意 Password 的引入方式
      'a-button': Button,
    },
    data() {
      return {
        // 登录按钮的加载状态
        loading: false,
        // 表单数据
        form: this.$form.createForm(this),
        // 表单验证规则
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        },
      };
    },
    methods: {
      login() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.loading = true;

            try {
              const response = await api.post('api/auth/login',{
                userAccount : values.username,
                userPassword : values.password,
              });
              if(response.succeed){
                this.$store.dispatch('auth/login', response.data);
                this.$router.push('/oneexpert');
              }else{
                message.error('登录失败，请检查用户名或密码');
              }
            } catch (error) {
              message.error('登录失败，请稍后重试');
              message.error('error:',error);
            }

          } else {
            message.error('请将表单填写完整');
            return false;
          }
        });
      },
      fakeLogin(){
        if(this.form.username === 'admin' && this.form.password === '123456'){
            this.$router.push('/oneexpert');
        }else{
            this.$message.error('登录失败，请检查');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5; /* 浅灰色背景 */
  }
  
  .login-form-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
  
  .site-form-item-icon {
    color: rgba(0, 0, 0, 0.45);
  }
  
  .login-button {
    width: 100%;
  }
  </style>
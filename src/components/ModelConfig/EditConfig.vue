<template>
    <div class="llm-admin-container">
      <a-card title="大模型参数配置" :bordered="false" class="config-card">
        <a-form-model ref="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
  
          <a-form-model-item label="Temperature">
            <a-row>
              <a-col :span="18">
                <a-slider v-model="form.temperature" :min="0" :max="1" :step="0.01" />
              </a-col>
              <a-col :span="4">
                <a-input-number v-model="form.temperature" :min="0" :max="1" :step="0.01" style="margin-left: 16px" />
              </a-col>
            </a-row>
            <div class="form-item-extra">
              控制生成文本的随机性。值越高，输出越随机、越有创造性 (如 0.7)；值越低，输出越确定、越保守 (如 0.2)。
            </div>
          </a-form-model-item>
  
          <a-form-model-item label="Top P">
             <a-row>
              <a-col :span="18">
                <a-slider v-model="form.top_p" :min="0" :max="1" :step="0.01" />
              </a-col>
              <a-col :span="4">
                <a-input-number v-model="form.top_p" :min="0" :max="1" :step="0.01" style="margin-left: 16px" />
              </a-col>
            </a-row>
            <div class="form-item-extra">
              控制生成文本的多样性。从概率最高的词开始，累加其概率，直到总和达到 top_p。模型仅从这部分词中选择 (如 0.9)。
            </div>
          </a-form-model-item>
  
          <a-form-model-item label="Max Tokens">
            <a-input-number v-model="form.max_tokens" :min="1" :max="4096" :step="1" style="width: 100%" />
            <div class="form-item-extra">
              单次请求中，模型生成的最大token数量。1个汉字约等于2个token。
            </div>
          </a-form-model-item>
  
          <a-form-model-item label="Search Top K">
            <a-input-number v-model="form.search_top_k" :min="1" :max="10" :step="1" style="width: 100%" />
             <div class="form-item-extra">
              在进行知识库或向量搜索时，返回最相关的K个结果。
            </div>
          </a-form-model-item>
  
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="handleSave">
              保存
            </a-button>
          </a-form-model-item>
  
        </a-form-model>


      </a-card>
    </div>
  </template>
  
  <script>
  import { Card, FormModel, Slider, Row, Col, InputNumber, Button, message } from 'ant-design-vue';
  
  export default {
    name: 'LLM_Params_Admin',
    components: {
      'a-card': Card,
      'a-form-model': FormModel,
      'a-form-model-item': FormModel.Item,
      'a-slider': Slider,
      'a-row': Row,
      'a-col': Col,
      'a-input-number': InputNumber,
      'a-button': Button,
    },
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        form: {
          temperature: 0.7,
          top_p: 0.90,
          max_tokens: 2048,
          search_top_k: 3
        },
      };
    },
    methods: {

      handleSave() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log('静态保存成功，当前表单数据:', this.form);
            message.success('配置已在本地更新！');
  
            // 动态修改：调用方法与后端API对接
            this.postParametersToAPI(this.form);
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
  
      /**
       * 对接后端的POST方法
       * @param {object} paramsData - 需要发送到后端的数据
       */
      async postParametersToAPI(paramsData) {
        console.log('向后端API发送POST请求，地址: /api/llm/config');
        console.log('发送的数据:', paramsData);
        
        try {
          // 真实axios 请求
          // const response = await axios.post('/api/llm/config', paramsData);
          // if(response.data.success) {
          //   message.success('配置已成功保存到服务器！');
          // }
          
          // --- Mocking API call ---
          await new Promise(resolve => setTimeout(resolve, 500)); 
          // ------------------------
  
          message.success('配置已成功保存到服务器！');
        } catch (error) {
          console.error('API请求失败:', error);
          message.error('无法连接到服务器，请稍后重试。');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  /* 规范 1.2.2 & 1.2.3: 全局字体、颜色、背景 */
  .llm-admin-container {
    padding: 24px;
    background-color: #F7F8FB; /* 规范辅助色 */
    font-family: "Microsoft YaHei", "微软雅黑", sans-serif; /* 规范全局字体 */
  }
  
  .config-card {
    background-color: #FFFFFF;
  }
  
  /* 规范 1.2.2: 标题文字 */
  .llm-admin-container >>> .ant-card-head-title {
    font-size: 14px !important;
    color: #333333 !important;
  }
  
  /* 规范 1.2.2: 正文文字 */
  .llm-admin-container >>> .ant-form-item-label label,
  .form-item-extra {
    color: #666666;
    font-size: 12px;
  }
  
  .form-item-extra {
    line-height: 1.5;
    margin-top: 4px;
  }
  
  /* 规范 1.2.5 & 1.2.3: 主按钮样式 */
  .llm-admin-container >>> .ant-btn-primary {
    background-color: #2BBAFF; /* 规范链接/高亮色作为正常态 */
    border-color: #2BBAFF;
  }
  .llm-admin-container >>> .ant-btn-primary:hover,
  .llm-admin-container >>> .ant-btn-primary:focus {
    background-color: #26649D; /* 规范主色作为悬浮/焦点态 */
    border-color: #26649D;
  }
  .llm-admin-container >>> .ant-btn-primary:active {
    background-color: #20507a; /* 主色加深作为激活态 */
    border-color: #20507a;
  }
  
  /* 规范 1.2.6: 表单控件高亮色 */
  /* InputNumber */
  .llm-admin-container >>> .ant-input-number:hover,
  .llm-admin-container >>> .ant-input-number-focused,
  .llm-admin-container >>> .ant-input-number:focus {
    border-color: #2BBAFF;
    box-shadow: 0 0 0 2px rgba(43, 186, 255, 0.2);
  }
  /* Slider */
  .llm-admin-container >>> .ant-slider-track {
    background-color: #2BBAFF;
  }
  .llm-admin-container >>> .ant-slider-handle {
    border: solid 2px #2BBAFF;
  }
  .llm-admin-container >>> .ant-slider:hover .ant-slider-track {
     background-color: #26649D;
  }
  .llm-admin-container >>> .ant-slider:hover .ant-slider-handle {
     border: solid 2px #26649D;
  }
  
  </style>
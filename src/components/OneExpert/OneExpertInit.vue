<template>
  <div class="one-expert-init-container">
      <h1>尊敬的专家您好，待审漏洞:{{statistic.pending}}个,草稿:{{statistic.draft}}个,已完成漏洞:{{statistic.completed}}个</h1>
      
      <a-table :columns="bugColumns" :data-source="bugData" rowKey="id" bordered style="margin-top: 24px;">
        <span slot="action">
          <a-button type="primary" ghost class="spec-link-button" @click="viewDetail()">详情</a-button>
        </span>
      </a-table>

      
  </div>
</template>

<script>
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd'
import { Button,Table,message} from 'ant-design-vue';
import api from '@/utils/axios';

export default {
  name: 'OneExpertInitPage',
  components: {
      'a-button': Button
      ,'a-table': Table
  },
  data() {
    return {
      bugColumns: [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: 'CVE编号', dataIndex: 'cveId', key: 'cveId' },
        { title: 'CVE类型', dataIndex: 'cveType', key: 'cveType' },
        { title: '软件类型', dataIndex: 'softwareType', key: 'softwareType' },
        { title: '漏洞标题', dataIndex: 'title', key: 'title' },
        { title: '描述', dataIndex: 'desc', key: 'desc' },
        { title: '审核情况', dataIndex: 'status', key: 'status' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
      ],
      bugData: [
        { id: 1, cveId: 'CVE-2024-0001', cveType: '远程代码执行', softwareType: '操作系统', title: 'Windows提权漏洞', desc: '攻击者可利用该漏洞提升权限。', status: '待审核' },
        { id: 2, cveId: 'CVE-2024-0002', cveType: '信息泄露', softwareType: '数据库', title: 'MySQL未授权访问', desc: '未授权用户可读取敏感数据。', status: '草稿' },
        { id: 3, cveId: 'CVE-2024-0003', cveType: '拒绝服务', softwareType: 'Web服务器', title: 'Apache崩溃漏洞', desc: '特定请求可导致服务崩溃。', status: '确认' },
      ],
      statistic:{
        pending: '',
        completed: '',
        draft:'',
      },
      Data: [
        { id: 1, cveId: 'CVE-2024-0001', cveType: '远程代码执行', softwareType: '操作系统', title: 'Windows提权漏洞', desc: '攻击者可利用该漏洞提升权限。', status: '待审核' },
        { id: 2, cveId: 'CVE-2024-0002', cveType: '信息泄露', softwareType: '数据库', title: 'MySQL未授权访问', desc: '未授权用户可读取敏感数据。', status: '草稿' },
        { id: 3, cveId: 'CVE-2024-0003', cveType: '拒绝服务', softwareType: 'Web服务器', title: 'Apache崩溃漏洞', desc: '特定请求可导致服务崩溃。', status: '确认' },
      ],
    };
  },
  created(){
    this.fetchStatistics();
    this.fetchBugList();
  },
  methods: {
      viewDetail() {
        this.$router.push('/oneexpert/detail');
      },
      async fetchStatistics(){
        try{
          const userId = this.$store.getters['auth/userId']
          const response = await api.get('api/',{
            params:{
              expertId: userId,
            }
          });
          if(response.succeed){
            this.statistic.completed  = response.data.completed;
            this.statistic.pending = response.data.pending;
            this.statistic.draft = response.data.draft;
          }else{
            message.error("获取静态数据失败");
          }
        }
        catch(error){
          message.error("获取数据失败",error);
        }
      },
      async fetchBugList(){
        try{
          const userId = this.$store.getters['auth/userId']
          const response = await api.get('api/eval/page',{
            params:{
              expertId: userId,
            }
          });
          if(response.succeed){
            this.Data = response.data;
          }else{
            message.error("获取漏洞列表失败");
          }
        }
        catch(error){
          console.error("API请求失败:", error);
          message.error("获取漏洞数据失败");
        }
      },
  }
}
</script>

<style scoped>
/* 全局字体设置为微软雅黑  */
.one-expert-init-container {
  font-family: "Microsoft YaHei", sans-serif;
}

/* H1 统计信息样式：使用标题规范  */
h1 {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}

/* --- 表格样式覆盖 --- */

/* 覆盖表格头部样式：标题文字：14px；颜色：#333333  */
::v-deep .ant-table-thead > tr > th {
  font-size: 14px;
  color: #333333;
  background-color: #F7F8FB; /* 使用辅助色作为背景  */
}

/* 覆盖表格内容样式：正文文字：12px；颜色：#666666  */
::v-deep .ant-table-tbody > tr > td {
  font-size: 12px;
  color: #666666;
}

/* --- 按钮/链接样式覆盖 --- */

/* 操作栏链接样式：文字链接：12px；颜色：#2BBAFF  */
/* 使用 ghost 配合自定义类来模拟链接样式，确保颜色一致 */
::v-deep .spec-link-button {
  font-size: 12px;
  color: #2BBAFF;
  border-color: transparent;
  background: transparent;
  padding: 0 5px;
}

::v-deep .spec-link-button:hover,
::v-deep .spec-link-button:focus {
  color: #2BBAFF; /* 保持链接颜色 */
  opacity: 0.8;
}
</style>
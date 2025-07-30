<template>
  <div class="one-expert-init-container">
      <h1>尊敬的专家您好，待审漏洞:{{statistic.pending}}个,草稿:{{statistic.draft}}个,已完成漏洞:{{statistic.completed}}个</h1>
      
      <a-table
        :columns="bugColumns"
        :data-source="Data"
        :pagination="{
          current: page,
          pageSize: size,
          total: total,
          showTotal: total => `共 ${total} 条`,
          showQuickJumper: false,
          showSizeChanger: false
        }"
        @change="handleTableChange"
        rowKey="evalId"
        bordered
        style="margin-top: 24px;"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="primary" ghost class="spec-link-button" @click="viewDetail(record)">详情</a-button>
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
        { title: 'id', dataIndex: 'evalId', key: 'evalId' },
        { title: 'CVE编号', dataIndex: 'cveId', key: 'cveId' },
        { title: 'CVE类型', dataIndex: 'cveType', key: 'cveType' },
        { title: '软件类型', dataIndex: 'softwareType', key: 'softwareType' },
        { title: '漏洞标题', dataIndex: 'cveTitle', key: 'cveTitle' },
        { title: '描述', dataIndex: 'cveDescription', key: 'cveDescription' },
        { title: '审核情况', dataIndex: 'evalReportStatus', key: 'evalReportStatus' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
      ],
      bugData: [
        { evalId: 1, cveId: 'CVE-2024-0001', cveType: '远程代码执行', softwareType: '操作系统', cveTitle: 'Windows提权漏洞', cveDescription: '攻击者可利用该漏洞提升权限。', evalReportStatus: '待审核' },
        { evalId: 2, cveId: 'CVE-2024-0002', cveType: '信息泄露', softwareType: '数据库', cveTitle: 'MySQL未授权访问', cveDescription: '未授权用户可读取敏感数据。', evalReportStatus: '草稿' },
        { evalTd: 3, cveId: 'CVE-2024-0003', cveType: '拒绝服务', softwareType: 'Web服务器', cveTitle: 'Apache崩溃漏洞', cveDescription: '特定请求可导致服务崩溃。', evalReportStatus: '确认' },
      ],
      statistic:{
        pending: '',
        completed: '',
        draft:'',
      },
      Data: [],
      page: 1,
      size: 10,
      total: 0,
    };
  },
  created(){
    this.fetchStatistics();
    this.fetchBugList();
  },
  methods: {
      viewDetail(record) {
        if (record && record.evalId) {
          // 导航到 /oneexpert/detail?id=xxx
          this.$router.push({ path: '/oneexpert/detail', query: { id: record.evalId } });
        } else {
          message.error("无法获取当前漏洞的ID");
        }
      },
      async fetchStatistics(){
        try{
          const userId = this.$store.getters['auth/userId']
          const response = await api.get('api/eval/status-count',{
            params:{
              expertId: userId,
              isGroupEval: 0,
            }
          });
          if(response.data.succeed){
            this.statistic.completed  = response.data.data.CONFIRMED;
            this.statistic.pending = response.data.data.INIT;
            this.statistic.draft = response.data.data.DRAFT;
          }else{
            message.error("获取静态数据失败");
          }
        }
        catch(error){
          message.error("获取数据失败",error);
        }
      },
      async fetchBugList(page = this.page, size = this.size) {
        try {
          const userId = this.$store.getters['auth/userId']
          const response = await api.get('api/eval/page', {
            params: {
              expertId: userId,
              isGroupEval: 0,
              page,
              size,
            }
          });
          if(response.data.succeed){
            this.Data = response.data.data.records;
            this.total = response.data.data.total;
            this.page = page;
          }else{
            message.error("获取漏洞列表失败");
          }
        }
        catch(error){
          console.error("API请求失败:", error);
          message.error("获取漏洞数据失败");
        }
      },
      handleTableChange(pagination) {
        this.fetchBugList(pagination.current, pagination.pageSize);
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
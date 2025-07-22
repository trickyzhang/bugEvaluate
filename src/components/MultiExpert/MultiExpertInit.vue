<template>
    <div class="multi-expert-init-container">
        <h1>尊敬的专家您好，待审漏洞:{{ statistic.pending }}个,草稿：{{ statistic.draft }}, 已完成漏洞:{{ statistic.completed }}个, 主持会议:{{ statistic.meetings }}个</h1>

        <h2 style="margin-top: 32px;">我主持的会议</h2>
        <a-table :columns="meetingColumns" :data-source="meetData" rowKey="meetingId" bordered
                 :pagination="meetingPagination">
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" ghost class="spec-link-button" @click="handleEditMeeting(record)">编辑</a-button>
          </span>
        </a-table>

        <h2 style="margin-top: 32px;">漏洞列表</h2>
        <a-table :columns="vulnerabilityColumns" :data-source="bugData" rowKey="evalId" bordered style="margin-top: 24px;"
                 :pagination="vulnerabilityPagination">
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" ghost class="spec-link-button" @click="attendMeeting(record)">加入会议</a-button>
          </span>
        </a-table>

        <a-modal
            title="编辑会议"
            :visible="isModalVisible"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="确认"
            cancelText="取消"
            wrapClassName="spec-modal" 
        >
            <a-form :form="form">
                <a-form-item label="会议主题">
                    <a-input v-decorator="['topic', { rules: [{ required: true, message: '请输入会议主题!' }] }]" />
                </a-form-item>
                <a-form-item label="开始时间">
                    <a-date-picker
                        show-time
                        format="YYYY-MM-DD HH:mm:ss"
                        v-decorator="['startTime', { rules: [{ required: true, message: '请选择开始时间!' }] }]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import 'ant-design-vue/dist/antd.css';
import { Button, Table, Modal, Form, Input, DatePicker,message } 
from 'ant-design-vue';
import moment from 'moment';
import api from '@/utils/axios';

export default {
    name: 'MultiExpertInitPage',
    components: {
        'a-button': Button,
        'a-table': Table,
        'a-modal': Modal,
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-date-picker': DatePicker,
    },
    data() {
      return {
        statistic: {
          pending: 0,
          completed: 0,
          draft: 0,
          meetings: 0,
        },
        // 分页参数
        vulnerabilityPagination: {
          current: 1,
          pageSize: 5,
          total: 0,
          showTotal: total => `共 ${total} 条`,
          onChange: (page, pageSize) => this.handleVulnPageChange(page, pageSize)
        },
        meetingPagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showTotal: total => `共 ${total} 条`,
          onChange: (page, pageSize) => this.handleMeetingPageChange(page, pageSize)
        },
        // 漏洞表格的表头
        vulnerabilityColumns: [
        { title: 'id', dataIndex: 'evalId', key: 'evalId' },
        { title: 'CVE编号', dataIndex: 'cveId', key: 'cveId' },
        { title: 'CVE类型', dataIndex: 'cveType', key: 'cveType' },
        { title: '软件类型', dataIndex: 'softwareType', key: 'softwareType' },
        { title: '漏洞标题', dataIndex: 'cveTitle', key: 'cveTitle' },
        { title: '描述', dataIndex: 'cveDescription', key: 'cveDescription' },
        { title: '审核情况', dataIndex: 'evalReportStatus', key: 'evalReportStatus' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        // 主持会议表格的表头
        meetingColumns: [
            { title: '编号', dataIndex: 'meetingId', key: 'meetingId' },
            { title: '会议号', dataIndex: 'meetingCode', key: 'meetingCode' },
            { title: '会议主题', dataIndex: 'meetingTopic', key: 'meetingTopic' },
            { title: '开始时间', dataIndex: 'meetingStart', key: 'meetingStart' },
            { title: '会议状态', dataIndex: 'meetingStatus', key: 'meetingStatus' },
            { title: '创建者ID', dataIndex: 'creatorId', key: 'creatorId' },
            { title: '创建专家', dataIndex: 'creatorAccount', key: 'creatorAccount' },
            { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        bugData: [],
        meetData:[],
        isModalVisible: false,
        editingRecord: null,
        form: this.$form.createForm(this),
      };
    },
    created() {
        this.fetchStatistics();
        this.fetchVulnerabilities();
        this.fetchMeetings();
    },
    methods: {
        /**
         * -------------------------------------------
         * 后端交互接口 
         * -------------------------------------------
         */

        // 1. 获取顶部的统计数据
        async fetchStatistics(){
        try{
          const userId = this.$store.getters['auth/userId']
          const response = await api.get('api/eval/status-count',{
            params:{
              expertId: userId,
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

        // 2. 获取漏洞列表
        async fetchVulnerabilities(page = 1, size = 5) {
            try{
                const userId = this.$store.getters['auth/userId']
                const response = await api.get('api/eval/page',{
                    params:{
                        expertId: userId,
                        isGroupEval: 1,
                        page,
                        size,
                    }
            });
            if(response.data.succeed){
                const data = response.data.data || {};
                this.bugData = data.records || [];
        
                this.vulnerabilityPagination.total = Number(data.total) || 0;
                this.vulnerabilityPagination.current = page;
                this.vulnerabilityPagination.pageSize = Number(data.size) || 5;

            }else{
                message.error("获取漏洞列表失败");
            }
            }
            catch(error){
                console.error("API请求失败:", error);
                message.error("获取漏洞数据失败");
            }
        },
        // 3. 获取主持的会议列表
        async fetchMeetings(page = 1, size = 10) {
            try{
                const userId = this.$store.getters['auth/userId']
                const response = await api.get('api/group-meeting/page',{
                    params:{
                        expertId: userId,
                        page,
                        size,
                    }
            });
            if(response.data.succeed){
                const data = response.data.data || {};
                this.meetData = data.records || [];
                this.meetingPagination.total = Number(data.total) || 0 ;
                this.meetingPagination.current = page;
                this.meetingPagination.pageSize = Number(data.size) || 10;
        
            }else{
                message.error("获取会议列表失败");
            }
            }
            catch(error){
                console.error("API请求失败:", error);
                message.error("获取会议数据失败");
            }
        },

        // 4. 更新会议信息
        async updateMeeting(meetingData) {
            // 注意：这里的接口路径是 put 'api/group-meeting/update'
            try {
                const response = await api.put(`api/group-meeting/update`, {
                    meetingId: meetingData.meetingId,
                    meetingTopic: meetingData.meetingTopic,
                    meetingStart: meetingData.meetingStart,
                });
                if (response.data.succeed) {
                    message.success('更新会议信息成功');
                    this.fetchMeetings(this.meetingPagination.current, this.meetingPagination.pageSize); // 重新加载数据
                } else {
                    message.error(response.data.message || '更新会议信息失败');
                }
            } catch (error) {
                message.error('请求失败：更新会议信息时发生错误');
                console.error(error);
            }
        },



        // 处理编辑会议按钮点击事件
        handleEditMeeting(record) {
            this.editingRecord = record;
            this.isModalVisible = true;
            // 使用 nextTick 确保 Modal 已经渲染
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    topic: record.meetingTopic,
                    startTime: moment(record.meetingStart, 'YYYY-MM-DD HH:mm:ss')
                });
            });
        },

        // 处理弹窗的“确认”按钮
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const formattedStartTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
                    const updatedData = {
                        meetingId: this.editingRecord.meetingId,
                        meetingTopic: values.topic,
                        meetingStart: formattedStartTime
                    };
                    
                    this.updateMeeting(updatedData);
                    this.isModalVisible = false;
                    this.editingRecord = null;
                }
            });
        },

        // 处理弹窗的“取消”按钮
        handleCancel() {
            this.isModalVisible = false;
            this.editingRecord = null;
        },

        attendMeeting(record){
            if (record && record.evalId) {
                // 使用 path 和 query 参数进行跳转
                this.$router.push({ path: '/multiexpert/detail', query: { id: record.evalId } });
            } else {
                message.error("无法获取当前漏洞的ID");
            }
        },
        handleMeetingPageChange(page, pageSize) {
            this.fetchMeetings(page, pageSize);
        },
        handleVulnPageChange(page, pageSize) {
            this.fetchVulnerabilities(page, pageSize);
        }
    }
}
</script>


<style scoped>
/* 全局字体设置为微软雅黑  */
.multi-expert-init-container {
    font-family: "Microsoft YaHei", sans-serif;
}

/* H1 统计信息样式：使用标题规范  */
h1 {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
}

/* H2 表格标题样式：使用标题规范  */
h2 {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    margin-bottom: 16px;
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
::v-deep .spec-link-button {
    font-size: 12px;
    color: #2BBAFF;
    border-color: transparent;
    background: transparent;
    padding: 0 5px;
}

::v-deep .spec-link-button:hover,
::v-deep .spec-link-button:focus {
    color: #2BBAFF;
    opacity: 0.8;
}

/* --- 弹窗 (Modal) 样式覆盖 --- */

/* 弹窗标题  */
::v-deep .spec-modal .ant-modal-title {
    font-size: 14px;
    color: #333333;
}

/* 弹窗内容和表单字体  */
::v-deep .spec-modal .ant-modal-body,
::v-deep .spec-modal .ant-form-item-label label,
::v-deep .spec-modal .ant-input {
    font-size: 12px;
    color: #666666;
    font-family: "Microsoft YaHei", sans-serif;
}

/* 弹窗主按钮（确认）：设置为主色 #26649D  */
::v-deep .spec-modal .ant-btn-primary {
    background-color: #26649D;
    border-color: #26649D;
    font-size: 12px;
}

::v-deep .spec-modal .ant-btn-primary:hover,
::v-deep .spec-modal .ant-btn-primary:focus {
    opacity: 0.9;
    background-color: #26649D;
    border-color: #26649D;
}

/* 弹窗次按钮（取消） */
::v-deep .spec-modal .ant-btn:not(.ant-btn-primary) {
    font-size: 12px;
    color: #666666;
}
</style>
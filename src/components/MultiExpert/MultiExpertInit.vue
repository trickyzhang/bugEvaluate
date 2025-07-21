<template>
    <div class="multi-expert-init-container">
        <h1>尊敬的专家您好，待审漏洞:{{ statistic.pending }}个,草稿：{{ statistic.draft }}, 已完成漏洞:{{ statistic.completed }}个, 主持会议:{{ statistic.meetings }}个</h1>

        <h2 style="margin-top: 32px;">我主持的会议</h2>
        <a-table :columns="meetingColumns" :data-source="meetingData" rowKey="id" bordered>
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" ghost class="spec-link-button" @click="handleEditMeeting(record)">编辑</a-button>
          </span>
        </a-table>

        <h2 style="margin-top: 32px;">漏洞列表</h2>
        <a-table :columns="vulnerabilityColumns" :data-source="vulnerabilityData" rowKey="id" bordered style="margin-top: 24px;">
          <span slot="action">
            <a-button type="primary" ghost class="spec-link-button" @click="attendMeeting()">加入会议</a-button>
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
        // 漏洞表格的表头
        vulnerabilityColumns: [
          { title: 'id', dataIndex: 'id', key: 'id' },
          { title: 'CVE编号', dataIndex: 'cveId', key: 'cveId' },
          { title: 'CVE类型', dataIndex: 'cveType', key: 'cveType' },
          { title: '软件类型', dataIndex: 'softwareType', key: 'softwareType' },
          { title: '漏洞标题', dataIndex: 'title', key: 'title' },
          { title: '描述', dataIndex: 'desc', key: 'desc' },
          { title: '审核情况', dataIndex: 'status', key: 'status' },
          { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        // 漏洞表格的静态数据
        vulnerabilityData: [
          { id: 1, cveId: 'CVE-2024-0001', cveType: '远程代码执行', softwareType: '操作系统', title: 'Windows提权漏洞', desc: '攻击者可利用该漏洞提升权限。', status: '待审核' },
          { id: 2, cveId: 'CVE-2024-0002', cveType: '信息泄露', softwareType: '数据库', title: 'MySQL未授权访问', desc: '未授权用户可读取敏感数据。', status: '草稿' },
          { id: 3, cveId: 'CVE-2024-0003', cveType: '拒绝服务', softwareType: 'Web服务器', title: 'Apache崩溃漏洞', desc: '特定请求可导致服务崩溃。', status: '确认' },
        ],
        // 主持会议表格的表头
        meetingColumns: [
            { title: '编号', dataIndex: 'id', key: 'id' },
            { title: '会议号', dataIndex: 'meetingId', key: 'meetingId' },
            { title: '会议主题', dataIndex: 'topic', key: 'topic' },
            { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
            { title: '会议状态', dataIndex: 'status', key: 'status' },
            { title: '创建者', dataIndex: 'creator', key: 'creator' },
            { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
            { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
            { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        // 主持会议表格的静态数据
        meetingData: [
            { id: 1, meetingId: 'M-20240715-001', topic: '关于CVE-2024-0001的紧急研讨', startTime: '2024-07-16 10:00:00', status: '初始', creator: '专家A', createTime: '2024-07-15 09:00:00', updateTime: '2024-07-15 09:00:00' },
            { id: 2, meetingId: 'M-20240715-002', topic: '第三季度安全漏洞复盘会议', startTime: '2024-07-20 14:30:00', status: '进行中', creator: '专家A', createTime: '2024-07-14 11:00:00', updateTime: '2024-07-14 11:00:00' },
            { id: 3, meetingId: 'M-20240710-005', topic: '上半年安全总结', startTime: '2024-07-10 09:00:00', status: '已结束', creator: '专家A', createTime: '2024-07-01 16:45:00', updateTime: '2024-07-01 16:45:00' },
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
        // this.fetchVulnerabilities();
        // this.fetchMeetings();
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
          const response = await api.get('api/',{
            params:{
              expertId: userId,
            }
          });
          if(response.succeed){
            this.statistic.completed  = response.data.data.completed;
            this.statistic.pending = response.data.data.pending;
            this.statistic.draft = response.data.data.draft;
          }else{
            message.error("获取静态数据失败");
          }
        }
        catch(error){
          message.error("获取数据失败",error);
        }
      },

        // 2. 获取漏洞列表
        async fetchVulnerabilities() {
            try{
                const userId = this.$store.getters['auth/userId']
                const response = await api.get('api/eval/page',{
                    params:{
                        expertId: userId,
                        isGroupEval: 1,
                    }
            });
            if(response.succeed){
                this.bugData = response.data.data;
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
        async fetchMeetings() {
            try{
                const userId = this.$store.getters['auth/userId']
                const response = await api.get('api/group-meeting/page',{
                    params:{
                        expertId: userId,
                        isGroupEval: 1,
                    }
            });
            if(response.succeed){
                this.meetData = response.data.data;
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
        updateMeeting(meetingData) {
            // PUT /api/expert/meetings/{id}
            // 请求体: { topic: '...', startTime: '...' }
            console.log(`正在向后端更新会议 (ID: ${meetingData.id})...`);
            console.log("更新数据:", meetingData);
            // return axios.put(`/api/expert/meetings/${meetingData.id}`, meetingData);
            return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500)); // 模拟API成功响应
        },



        // 处理编辑会议按钮点击事件
        handleEditMeeting(record) {
            this.editingRecord = record;
            this.isModalVisible = true;
            // 使用 nextTick 确保 Modal 已经渲染
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    topic: record.topic,
                    startTime: moment(record.startTime, 'YYYY-MM-DD HH:mm:ss')
                });
            });
        },

        // 处理弹窗的“确认”按钮
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const formattedStartTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
                    const updatedData = {
                        ...this.editingRecord,
                        topic: values.topic,
                        startTime: formattedStartTime,
                    };
                    
                    // 调用API更新后端数据
                    this.updateMeeting(updatedData).then(() => {
                        // 在前端同步更新数据
                        const index = this.meetingData.findIndex(item => item.id === this.editingRecord.id);
                        if (index !== -1) {
                            this.meetingData[index].topic = values.topic;
                            this.meetingData[index].startTime = formattedStartTime;
                            this.meetingData[index].updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.isModalVisible = false;
                        this.editingRecord = null;
                        this.$message.success('会议信息更新成功!');
                    }).catch(() => {
                        this.$message.error('更新失败，请重试!');
                    });
                }
            });
        },

        // 处理弹窗的“取消”按钮
        handleCancel() {
            this.isModalVisible = false;
            this.editingRecord = null;
        },

        // 跳转至会议详情页
        attendMeeting(){
            this.$router.push('/multiexpert/detail');
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

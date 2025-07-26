<template>
    <div class="multi-expert-init-container">
        <h1>尊敬的专家您好，待审漏洞:{{ statistic.pending }}个,草稿：{{ statistic.draft }}, 已完成漏洞:{{ statistic.completed }}个, 主持会议:{{ statistic.meetings }}个</h1>

        <h2 style="margin-top: 32px;">我主持的会议</h2>
        <a-table :columns="meetingColumns" :data-source="pagedMeetData" rowKey="meetingId" bordered
                 :pagination="meetingPagination">
          <span slot="vulnerabilities" slot-scope="text, record">
            {{ record.vulnerabilityIds }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="primary" ghost class="spec-link-button" @click="handleEditMeeting(record)">编辑</a-button>
          </span>
        </a-table>

        <h2 style="margin-top: 32px;">漏洞列表</h2>
        <a-table :columns="vulnerabilityColumns" :data-source="pagedBugData" rowKey="evalId" bordered style="margin-top: 24px;"
                 :pagination="vulnerabilityPagination">
          <span slot="action" slot-scope="text, record">
            <a-button v-if="record.meetingRole === '会议管理员'" type="primary" ghost class="spec-link-button" @click="hostMeeting(record)">主持会议</a-button>
            <a-button v-else type="primary" ghost class="spec-link-button" @click="attendMeeting(record)">加入会议</a-button>
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

        allAdminMeetings: [], 
        allVulnerabilities: [], 

        pagedMeetData: [],
        pagedBugData: [],

        // 会议分页参数
        meetingPagination: {
          current: 1,
          pageSize: 5,
          total: 0,
          showTotal: total => `共 ${total} 条`,
          onChange: this.handleMeetingPageChange, 
        },
        // 漏洞分页参数
        vulnerabilityPagination: {
          current: 1,
          pageSize: 5,
          total: 0,
          showTotal: total => `共 ${total} 条`,
          onChange: this.handleVulnPageChange, 
        },
        vulnerabilityColumns: [
          { title: 'id', dataIndex: 'evalId', key: 'evalId' },
          { title: '所属的会议id', dataIndex: 'meetingId', key: 'meetingId' },
          { title: 'CVE编号', dataIndex: 'cveId', key: 'cveId' },
          { title: 'CVE类型', dataIndex: 'cveType', key: 'cveType' },
          { title: '软件类型', dataIndex: 'softwareType', key: 'softwareType' },
          { title: '漏洞标题', dataIndex: 'cveTitle', key: 'cveTitle' },
          { title: '描述', dataIndex: 'cveDescription', key: 'cveDescription' },
          { title: '审核情况', dataIndex: 'evalReportStatus', key: 'evalReportStatus' },
          { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        meetingColumns: [
            { title: '编号', dataIndex: 'meetingId', key: 'meetingId' },
            { title: '会议号', dataIndex: 'meetingCode', key: 'meetingCode' },
            { title: '会议主题', dataIndex: 'meetingTopic', key: 'meetingTopic' },
            { title: '评审漏洞', key: 'vulnerabilities', scopedSlots: { customRender: 'vulnerabilities' } },
            { title: '开始时间', dataIndex: 'meetingStart', key: 'meetingStart' },
            { title: '会议状态', dataIndex: 'meetingStatus', key: 'meetingStatus' },
            { title: '创建者ID', dataIndex: 'creatorId', key: 'creatorId' },
            { title: '创建专家', dataIndex: 'creatorAccount', key: 'creatorAccount' },
            { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } },
        ],
        isModalVisible: false,
        editingRecord: null,
        form: this.$form.createForm(this),
      };
    },
    created() {
        this.fetchStatistics();
        this.fetchAllData(); 
    },
    methods: {

        async fetchAllData() {
            const userId = this.$store.getters['auth/userId'];
            let allMeetingsFromApi = [];
            let page = 1;
            let hasMore = true;

            try {
                // 循环获取所有会议数据
                while(hasMore) {
                    const response = await api.get('api/group-meeting/page', {
                        params: { expertId: userId, page, size: 100 } // 使用较大的size以减少请求次数
                    });

                    if (response.data.succeed && response.data.data.records) {
                        const { records, pages } = response.data.data;
                        allMeetingsFromApi.push(...records);
                        if (page >= pages) {
                            hasMore = false;
                        } else {
                            page++;
                        }
                    } else {
                        hasMore = false;
                    }
                }

                const uniqueMeetingsMap = new Map();
                allMeetingsFromApi.forEach(meeting => {
                    const existingMeeting = uniqueMeetingsMap.get(meeting.meetingId);
                    if (!existingMeeting || (existingMeeting.meetingRole !== '会议管理员' && meeting.meetingRole === '会议管理员')) {
                        uniqueMeetingsMap.set(meeting.meetingId, meeting);
                    }
                });
                const uniqueMeetings = Array.from(uniqueMeetingsMap.values());

                // 提取所有漏洞
                const allVulnerabilities = [];
                uniqueMeetings.forEach(meeting => {
                    if (meeting.expertVuln && meeting.expertVuln.length > 0) {
                        meeting.expertVuln.forEach(vuln => {
                            allVulnerabilities.push({
                                ...vuln,
                                meetingRole: meeting.meetingRole
                            });
                        });
                    }
                });
                this.allVulnerabilities = allVulnerabilities;

                // 筛选出所有主持的会议
                const allAdminMeetings = uniqueMeetings
                    .filter(m => m.meetingRole === '会议管理员')
                    .map(m => ({
                        ...m,
                        vulnerabilityIds: m.expertVuln.map(v => v.evalId).join(', ')
                    }));
                this.allAdminMeetings = allAdminMeetings;

                // 更新顶部的会议统计
                this.statistic.meetings = this.allAdminMeetings.length;

                // 初始化分页显示
                this.handleMeetingPageChange(1, this.meetingPagination.pageSize);
                this.handleVulnPageChange(1, this.vulnerabilityPagination.pageSize);

            } catch (error) {
                console.error("获取全部数据失败:", error);
                message.error("数据加载失败，请刷新重试");
            }
        },

        // 2. 主持会议的前端分页逻辑
        handleMeetingPageChange(page, pageSize) {
            this.meetingPagination.total = this.allAdminMeetings.length;
            this.meetingPagination.current = page;
            this.meetingPagination.pageSize = pageSize;

            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            this.pagedMeetData = this.allAdminMeetings.slice(startIndex, endIndex);
        },

        // 3. 漏洞列表的前端分页逻辑
        handleVulnPageChange(page, pageSize) {
            this.vulnerabilityPagination.total = this.allVulnerabilities.length;
            this.vulnerabilityPagination.current = page;
            this.vulnerabilityPagination.pageSize = pageSize;

            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            this.pagedBugData = this.allVulnerabilities.slice(startIndex, endIndex);
        },

        // 获取顶部的统计数据（
        async fetchStatistics(){
        try{
          const userId = this.$store.getters['auth/userId'] 
          const response = await api.get('api/eval/status-count',{
            params:{
              expertId: userId,
              isGroupEval: 1,
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

        // 更新会议信息（
        async updateMeeting(meetingData) {
            try {
                const response = await api.put(`api/group-meeting`, {
                    meetingId: meetingData.meetingId,
                    meetingTopic: meetingData.meetingTopic,
                    meetingStart: meetingData.meetingStart,
                });
                if (response.data.succeed) {
                    message.success('更新会议信息成功');
                    this.fetchAllData(); 
                } else {
                    message.error(response.data.message || '更新会议信息失败');
                }
            } catch (error) {
                message.error('请求失败：更新会议信息时发生错误');
            }
        },


        handleEditMeeting(record) {
            this.editingRecord = record;
            this.isModalVisible = true;
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    topic: record.meetingTopic,
                    startTime: moment(record.meetingStart, 'YYYY-MM-DD HH:mm:ss')
                });
            });
        },

        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const formattedStartTime = values.startTime.format('YYYY-MM-DDTHH:mm:ss');
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

        handleCancel() {
            this.isModalVisible = false;
            this.editingRecord = null;
        },

        attendMeeting(record){
            if (record && record.evalId && record.meetingId) {
                this.$router.push({ path: '/multiexpert/detail', query: { id: record.evalId, meetingId: record.meetingId } });
            } else {
                message.error("无法获取当前漏洞或会议的ID");
            }
        },

        hostMeeting(record){
            if (record && record.evalId && record.meetingId) {
                this.$router.push({ path: '/multiexpert/host',
                    query: {
                        id: record.evalId,
                        meetingId: record.meetingId
                    }
                });
            } else {
                message.error("无法获取当前漏洞或会议的ID");
            }
        },
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
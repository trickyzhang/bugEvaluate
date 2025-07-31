<template>
    <div class="vulnerability-assessment-container">
        <a-row :gutter="16">
            <a-col :span="14">
                <a-card title="漏洞基本信息" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="漏洞编号" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.cveID }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.cveType }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="软件类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.softwareType }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞标题" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.cveTitle }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                                    <span class="ant-form-text">{{ form.basic.cveDescription }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>

                <a-card title="威胁情报来源" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="情报字段1" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.threatIntelligence.field1 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="情报字段2" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.threatIntelligence.field2 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="情报字段3" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.threatIntelligence.field3 }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>

                <a-card title="漏洞地域" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="字段1" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.religion.field1 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段2" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.religion.field2 }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>

                <a-card title="自动化软件漏洞评估结果" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="漏洞价值" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.autoSoft.value || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞武器" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.autoSoft.weapon || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞服务" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.autoSoft.service || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞可利用性" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.autoSoft.exploitability || '-' }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                    <div style="text-align: center; margin-top: 8px;">
                        <a-button type="primary" @click="showAlgorithmModal">编辑算法</a-button>
                    </div>
                </a-card>

                <a-card title="自动化评估可解释性分析结果" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="漏洞价值" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.explain.overallValue || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="暴露度" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.explain.exposure || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞风险" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.explain.risk || '-' }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                    <div style="text-align: center; margin-top: 8px; display: flex; justify-content: center; gap: 16px;">
                        <a-button type="primary" @click="showExplainabilityModal">编辑</a-button>
                        <a-button>大模型重新判定</a-button>
                    </div>
                </a-card>

                <a-card title="总体评估意见" :bordered="false" class="card-section">
                    <a-textarea v-model="form.overallOpinion" placeholder="点击输入评估意见"
                        :auto-size="{ minRows: 4, maxRows: 6 }" />
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn">保存结果</a-button>
                    <a-button style="margin-left: 8px;" @click="handleClick2" class="opinion-assistant-btn">返回列表</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn">大模型生成</a-button>
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleText">文字聊天</a-button>
                    <a-button 
                        style="margin-left: 8px;" 
                        class="opinion-assistant-btn"
                        :type="isVoiceConnected ? 'danger' : 'default'"
                        @click="toggleVoiceConnection"
                    >                   
                        <a-icon :type="isVoiceConnected ? 'phone' : 'sound'" />
                            {{ isVoiceConnected ? '断开语音' : '连接语音' }}
                    </a-button>
                    <a-button
                        v-if="isVoiceConnected"
                        style="margin-left: 8px;"
                        class="opinion-assistant-btn"
                        @click="toggleSelfMute"
                    >               
                    <a-icon :type="isMutedBySelf ? 'mic' : 'stop'" />
                        {{ isMutedBySelf ? '取消禁麦' : '麦克风静音' }}
                    </a-button>
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleHost">主持会议</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn">开始评估</a-button>
                </a-card>
            </a-col>

            <a-col :span="10">
                <div class="retrieval-panel">
                    <h3 class="panel-title">数据检索</h3>
                    <a-form layout="vertical">
                        <a-form-item>
                             <label class="ant-form-item-label">请选择数据来源</label>
                            <a-checkbox-group v-model="retrieval.sources">
                                <a-checkbox value="1">漏洞验证数据</a-checkbox>
                                <a-checkbox value="2">漏洞地域</a-checkbox>
                                <a-checkbox value="3">各评测算法解释数据</a-checkbox>
                                <a-checkbox value="4">漏洞影响数据</a-checkbox>
                                <a-checkbox value="5">历史同类漏洞评估案例数据</a-checkbox>
                                <a-checkbox value="6">威胁情报</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>

                        <div class="retrieval-request-box">
                            <p class="box-title">数据检索要求</p>
                            <a-form-item label="时间范围">
                                <a-range-picker style="width: 100%;" v-model="retrieval.dateRange" />
                            </a-form-item>
                            <a-form-item label="关键词">
                                <a-input v-model="retrieval.keywords" placeholder="关键词：请用英文逗号隔开" />
                            </a-form-item>
                            <a-form-item label="漏洞类型">
                                <a-select v-model="retrieval.vulnType" placeholder="类型：下拉列表选择">
                                    <a-select-option value="type1">类型一</a-select-option>
                                    <a-select-option value="type2">类型二</a-select-option>
                                    <a-select-option value="type3">类型三</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="其他需求">
                                <a-input v-model="retrieval.other" placeholder="请输入其他需求, 如: 请帮我以脑图的形式输出检索结果" />
                            </a-form-item>
                        </div>

                        <a-button type="primary" block>开始检索</a-button>

                        <div class="retrieval-result-box">
                            <p class="box-title">数据检索结果</p>
                            <a-radio-group v-model="retrieval.resultView" button-style="solid">
                                <a-radio-button value="table">表格</a-radio-button>
                                <a-radio-button value="line">折线图</a-radio-button>
                                <a-radio-button value="pie">饼状图</a-radio-button>
                                <a-radio-button value="llm">大模型生成结果</a-radio-button>
                            </a-radio-group>
                            <div class="display-area">
                                <p>展示区域</p>
                            </div>
                        </div>
                            <a-button type="primary" block @click="shareData()" >共享数据</a-button>
                    </a-form>
                </div>
            </a-col>
        </a-row>


        <a-modal
            title="主持会议"
            :visible="hostModalVisible"
            @ok="handleHostModalOk"
            @cancel="handleHostModalCancel"
            :width="800"
            :maskClosable="false"
            :footer="null"
        >
            <div class="host-modal-content">
                <a-card title="参会专家管理" :bordered="false" class="experts-card">
                    <div class="experts-header">
                        <span class="experts-count">共 {{ expertList.length }} 位专家</span>
                        <div class="global-controls">
                            <a-button type="primary" size="small" @click="muteAllExperts">
                                <a-icon type="stop" />全体禁言
                            </a-button>
                            <a-button type="primary" size="small" @click="unmuteAllExperts" style="margin-left: 8px;">
                                <a-icon type="sound" />全体发言
                            </a-button>
                        </div>
                    </div>
                    
                    <div class="experts-list">
                        <div 
                            v-for="expert in expertList" 
                            :key="expert.mpId" 
                            class="expert-item"
                            :class="{ 'muted': expert.isMuted }"
                        >
                            <div class="expert-info">
                                <a-avatar :src="expert.avatar" size="small" class="expert-avatar">
                                    {{ expert.name.charAt(0) }}
                                </a-avatar>
                                <div class="expert-details">
                                    <div class="expert-name">{{ expert.name }}</div>
                                    <div class="expert-role">{{ expert.role }}</div>
                                </div>
                                <div class="expert-status">
                                    <a-tag :color="expert.isMuted ? 'red' : 'green'">
                                        {{ expert.isMuted ? '已禁言' : '可发言' }}
                                    </a-tag>
                                </div>
                            </div>
                            <div class="expert-controls">
                                <a-button 
                                    :type="expert.isMuted ? 'primary' : 'default'"
                                    size="small"
                                    @click="toggleExpertMute(expert)"
                                >
                                    <a-icon :type="expert.isMuted ? 'sound' : 'stop'" />
                                    {{ expert.isMuted ? '解除禁言' : '禁言' }}
                                </a-button>
                                <a-button
                                    v-if="expert.role !== '会议管理员'"
                                    type="danger"
                                    size="small"
                                    @click="transferAdmin(expert)"
                                    style="margin-left: 8px;"
                                >
                                    <a-icon type="crown" />
                                    转让管理员
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-card>

                <div class="modal-footer">
                    <a-button @click="handleHostModalCancel">关闭</a-button>
                    <a-button type="primary" @click="handleHostModalOk">开始会议</a-button>
                </div>
            </div>
        </a-modal>

        <a-modal
            title="文字聊天"
            :visible="chatModalVisible"
            @cancel="handleChatModalCancel"
            :footer="null"
            :width="700"
            :maskClosable="false"
        >
            <div class="chat-modal-content">
                <div class="chat-history" ref="chatHistory">
                    <div v-for="(msg, index) in chatHistory" :key="index" class="chat-message">
                        <strong>{{ msg.user }} ({{ formatTimestamp(msg.timestamp) }}):</strong> {{ msg.text }}
                    </div>
                </div>
                <div class="chat-input-area">
                    <a-textarea 
                        v-model="newChatMessage"
                        placeholder="输入消息，按 Enter 发送"
                        :rows="3"
                        @pressEnter="handleSendMessage"
                    />
                    <a-button type="primary" @click="handleSendMessage" style="margin-top: 8px;">
                        发送
                    </a-button>
                </div>
            </div>
        </a-modal>

        <a-modal
            title="编辑算法参数"
            :visible="algorithmModalVisible"
            @ok="handleAlgorithmSave"
            @cancel="handleAlgorithmCancel"
            :confirm-loading="modalLoading"
            okText="保存并重新计算"
            cancelText="取消"
        >
            <p style="margin-bottom: 16px; color: #999;">修改以下参数后，将发送至服务器进行运算，并返回新的评估结果。</p>
            <a-form>
                <a-form-item label="算法参数A" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="algorithmParams.paramA" placeholder="请输入参数A" />
                </a-form-item>
                <a-form-item label="算法参数B" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="algorithmParams.paramB" placeholder="请输入参数B" />
                </a-form-item>
                <a-form-item label="算法参数C" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="algorithmParams.paramC" placeholder="请输入参数C" />
                </a-form-item>
                <a-form-item label="算法参数D" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="algorithmParams.paramD" placeholder="请输入参数D" />
                </a-form-item>
                 <a-form-item label="修改理由" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-textarea v-model="algorithmParams.modificationReason" placeholder="请输入修改理由" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal
            title="编辑可解释性分析结果"
            :visible="explainabilityModalVisible"
            @ok="handleExplainabilitySave"
            @cancel="handleExplainabilityCancel"
            :confirm-loading="explainabilityModalLoading"
            okText="保存"
            cancelText="取消"
        >
            <p style="margin-bottom: 16px; color: #999;">请修改以下字段，并填写修改理由。</p>
            <a-form>
                <a-form-item label="漏洞价值" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-select v-model="explainabilityParams.overallValue" placeholder="请选择">
                        <a-select-option value="严重">严重</a-select-option>
                        <a-select-option value="一般">一般</a-select-option>
                        <a-select-option value="轻微">轻微</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="暴露度" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                     <a-select v-model="explainabilityParams.exposure" placeholder="请选择">
                        <a-select-option value="严重">严重</a-select-option>
                        <a-select-option value="一般">一般</a-select-option>
                        <a-select-option value="轻微">轻微</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="漏洞风险" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                     <a-select v-model="explainabilityParams.risk" placeholder="请选择">
                        <a-select-option value="严重">严重</a-select-option>
                        <a-select-option value="一般">一般</a-select-option>
                        <a-select-option value="轻微">轻微</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="修改理由" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-textarea v-model="explainabilityParams.modificationReason" placeholder="请输入修改理由" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import { Button, Row, Col, Card, Form, Input, Checkbox, Radio, Select, DatePicker, Modal, message, Avatar, Tag, Icon } from 'ant-design-vue';
import api from '@/utils/axios';

// 【新增】导入 WebSocket 相关库
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import { Room, RoomEvent } from 'livekit-client';

export default {
    name: 'VulnerabilityAssessment',
    components: {
        'a-button': Button,
        'a-row': Row,
        'a-col': Col,
        'a-card': Card,
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-checkbox-group': Checkbox.Group,
        'a-checkbox': Checkbox,
        'a-radio-group': Radio.Group,
        'a-radio-button': Radio.Button,
        'a-select': Select,
        'a-select-option': Select.Option,
        'a-range-picker': DatePicker.RangePicker,
        'a-textarea': Input.TextArea,
        'a-modal': Modal,
        'a-avatar': Avatar,
        'a-tag': Tag,
        'a-icon': Icon,
    },
    data() {
        return {
            // WebSocket 状态管理
            stompClient: null,
            subscription: null,
            form: {
                basic: {
                    cveID: '',
                    cveType: '',
                    softwareType: '',
                    cveTitle: '',
                    cveDescription: '',
                },
                threatIntelligence: { field1: '', field2: '', field3: '' },
                religion:{ field1:'', field2:'', },
                autoSoft: { 
                    value: '',
                    weapon: '',
                    service: '',
                    exploitability: '',
                },
                explain: {
                    overallValue: '',
                    exposure: '',
                    risk: '',
                },
                overallOpinion: '',
            },
            retrieval: {
                sources: [], dateRange: [], keywords: '',
                vulnType: undefined, other: '', resultView: 'table',
            },
            hostModalVisible: false,
            chatModalVisible: false,
            newChatMessage: '',
            chatHistory: [],
            expertList: [], 
            // 算法弹窗
            algorithmModalVisible: false,
            modalLoading: false,
            algorithmParams: {
                paramA: '默认值1',
                paramB: '默认值2',
                paramC: '默认值3',
                paramD: '默认值4',
                modificationReason: '', 
            },
            // 可解释性弹窗
            explainabilityModalVisible: false,
            explainabilityModalLoading: false,
            explainabilityParams: {
                overallValue: undefined,
                exposure: undefined,
                risk: undefined,
                modificationReason: '',
            },
            livekitRoom: null, // LiveKit Room 实例
            isVoiceConnected: false, // 是否已连接到语音
            isMutedBySelf: false, // 是否自己静音了麦克风
        }
    },
    created() {
        this.fetchDetails();
        this.fetchChatHistory();
        this.initWebSocket();
    },
    beforeDestroy() {
        this.disconnectWebSocket();
        if (this.livekitRoom) {
            this.livekitRoom.disconnect();
        }
    },
    methods: {
        formatTimestamp(timestamp) {
            if (!timestamp) return '';
            return new Date(timestamp).toLocaleString();
        },

        // 初始化 WebSocket 
        initWebSocket() {
            const meetingId = this.$route.query.meetingId;
            if (!meetingId) {
                message.error("无法获取会议ID,无法连接聊天室");
                return;
            }

            const authToken = this.$store.getters['auth/authToken'];

            this.stompClient = new Client({
                brokerURL: 'ws://127.0.0.1:8080/ws', 
                webSocketFactory: () => new SockJS('http://127.0.0.1:8080/ws'),
                connectHeaders: {
                  Authorization: authToken,
                },
                reconnectDelay: 5000,
            });

            this.stompClient.onConnect = frame => {
                console.log('Connected to WebSocket: ' + frame);
                message.success('成功连接到会议聊天室！');

                this.subscription = this.stompClient.subscribe('/topic/meeting/' + meetingId, (message) => {
                    const receivedMsg = JSON.parse(message.body);
                    
                    if (receivedMsg.type === "CHAT" && receivedMsg.payload) {
                        this.chatHistory.push({
                            user: receivedMsg.userAccount || '未知用户',
                            text: receivedMsg.payload,
                            timestamp: receivedMsg.timestamp 
                        });

                        this.$nextTick(() => {
                            const chatHistoryEl = this.$refs.chatHistory;
                            if(chatHistoryEl) { chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight; }
                        });
                    }
                });
            };

            this.stompClient.onStompError = frame => {
                console.error('Broker reported error: ' + frame.headers['message']);
                message.error('聊天发生错误: ' + frame.headers['message']);
            };

            this.stompClient.activate();
        },

        // 断开 WebSocket 连接
        disconnectWebSocket() {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
            if (this.stompClient) {
                this.stompClient.deactivate();
                this.stompClient = null;
                console.log('WebSocket disconnected.');
            }
        },

        async fetchDetails() {
            const id = this.$route.query.id; 
            if (!id) {
                message.error('无法获取漏洞ID,请返回列表重试。');
                return;
            }
            try {
                const response = await api.get(`/api/eval/${id}`);
                if (response.data.succeed) {
                    const data = response.data.data;
                    if (data.vulnInfo) {
                        this.form.basic.cveID = data.vulnInfo.cveId;
                        this.form.basic.cveType = data.vulnInfo.cveType;
                        this.form.basic.softwareType = data.vulnInfo.softwareType;
                        this.form.basic.cveTitle = data.vulnInfo.cveTitle;
                        this.form.basic.cveDescription = data.vulnInfo.cveDescription;
                    }
                    if (data.threatIntel) {
                        this.form.threatIntelligence.field1 = data.threatIntel.field1;
                        this.form.threatIntelligence.field2 = data.threatIntel.field2;
                        this.form.threatIntelligence.field3 = data.threatIntel.field3;
                    }
                    if (data.dimVOList && Array.isArray(data.dimVOList)) {
                        data.dimVOList.forEach(item => {
                            switch (item.dimensionCode) {
                                case '漏洞价值': this.form.autoSoft.value = item.originalEvalValue; break;
                                case '漏洞武器': this.form.autoSoft.weapon = item.originalEvalValue; break;
                                case '漏洞服务': this.form.autoSoft.service = item.originalEvalValue; break;
                                case '漏洞可利用性': this.form.autoSoft.exploitability = item.originalEvalValue; break;
                            }
                        });
                    }
                    if (data.metricVOList && Array.isArray(data.metricVOList)) {
                        data.metricVOList.forEach(item => {
                            switch (item.metricCode) {
                                case '漏洞价值': this.form.explain.overallValue = item.originalAnalysisRate; break;
                                case '漏洞暴露度': this.form.explain.exposure = item.originalAnalysisRate; break;
                                case '漏洞风险': this.form.explain.risk = item.originalAnalysisRate; break;
                            }
                        });
                    }
                    this.form.overallOpinion = data.evalReportContent;
                    message.success(`成功加载漏洞 ${id} 的详情。`);
                } else {
                    message.error('获取漏洞详情失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("获取详情失败:", error);
                message.error('网络请求失败，请检查网络或联系管理员。');
            }
        },

        // 返回列表前，先断开连接
        handleClick2() { 
            this.disconnectWebSocket(); 
            this.$router.push('/multiexpert'); 
        },

        handleText() { this.chatModalVisible = true; },
        handleChatModalCancel() { this.chatModalVisible = false; },

        // 使用 WebSocket 发送消息
        async handleSendMessage() {
            if (!this.newChatMessage.trim()) return;
            if (!this.stompClient || !this.stompClient.active) {
                message.error("聊天室未连接，无法发送消息！");
                return;
            }

            try {
                const meetingId = this.$route.query.meetingId;
                const userId = this.$store.getters['auth/userId'];
                const userInfo = this.$store.getters['auth/userInfo'];

                const chatMessage = {
                    meetingId: meetingId,
                    expertId: userId,
                    userAccount: userInfo ? userInfo.account : '未知用户',
                    type: 'CHAT',
                    payload: this.newChatMessage,
                    timestamp: Date.now()
                };

                this.stompClient.publish({
                    destination: '/app/chat',
                    body: JSON.stringify(chatMessage),
                });

                this.newChatMessage = '';

            } catch (error) {
                message.error("发送消息失败，请检查网络或刷新重试。");
                console.error("Send message error:", error);
            }
        },

        handleHost(){ 
            this.hostModalVisible = true;
            this.getMeetingMembers();
        },
        handleHostModalOk() { this.hostModalVisible = false; message.success('会议已开始'); },
        handleHostModalCancel() { this.hostModalVisible = false; },

        async fetchChatHistory(){
            const meetingId = this.$route.query.meetingId;
            if(!meetingId){
                message.error("无法获得会议id");
                return;
            }
            try {
                const response =await api.get('api/meeting-record/list',{
                    params:{ meetingId }
                });
                if(response.data.succeed){
                    const data = response.data.data;
                    this.chatHistory = data.slice().reverse().map(msg =>({
                        ...msg,
                        user: msg.userAccount,
                        text: msg.msgContent,
                        timestamp: msg.recordCreated
                    }));
                }else{
                    message.error("获取消息历史失败",response.data);
                }
            } catch (error) {
                message.error("获取文字聊天历史信息失败");
                console.log(error);
            }
        },
        async getMeetingMembers() {
            const meetingId = this.$route.query.meetingId;
            if (!meetingId) {
                message.error("无法获取会议ID,请从列表页重新进入。");
                return;
            }
            try {
                // 调用参会成员查询接口 
                const response = await api.get(`/api/mp/list/${meetingId}`,{
                    params:{
                        expertId: this.$store.getters['auth/userId'],
                    }
                });
                if (response.data && response.data.succeed) {
                    this.expertList = response.data.data.map(expert => ({
                        ...expert,
                        name: expert.expertName,
                        role: expert.meetingRole,
                        isMuted: expert.speakStatus === '已禁言', 
                        avatar: '' 
                    }));
                    console.log(this.expertList);
                } else {
                    message.error("获取参会成员列表失败: " + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("获取参会成员列表失败:", error);
                message.error('网络请求失败，请检查或联系管理员。'+error);
            }
        },

        async toggleExpertMute(expert) {
            const newStatus = expert.isMuted ? '可发言' : '已禁言'; 
            try { 
                const response = await api.put('/api/mp/speak', {
                    mpId: expert.mpId,
                    expertId: expert.expertId,
                    speakStatus: newStatus
                }); 
                if (response.data && response.data.succeed) { 
                    expert.isMuted = !expert.isMuted;
                    expert.speakStatus = newStatus;
                    message.success(`${expert.name} ${newStatus === '可发言' ? '已解除禁言' : '已禁言'}`);
                } else {
                    message.error('操作失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("禁言/解禁操作失败:", error);
                message.error('网络请求失败');
            }
        },

        async setAllMuteStatus(mute) {
            const newStatus = mute ? '已禁言' : '可发言';
            const actionName = mute ? '禁言' : '解禁';
            const promises = this.expertList
                .filter(expert => expert.role !== '会议管理员')
                .map(expert => {
                    return api.put('/api/mp/speak', {  
                        mpId: expert.mpId,
                        expertId: expert.expertId,
                        speakStatus: newStatus
                    }).then(res => {
                        if(res.data && res.data.succeed) {
                            expert.isMuted = mute;
                            expert.speakStatus = newStatus;
                        }
                    });
                });

            try {
                await Promise.all(promises);
                message.success(`全体成员（除管理员外）已${actionName}`);
            } catch(error) {
                console.error(`全体${actionName}失败:`, error);
                message.error(`全体${actionName}操作时发生网络错误`);
                this.getMeetingMembers(); // 发生错误时，重新同步状态
            }
        },

        muteAllExperts() { this.setAllMuteStatus(true); },
        unmuteAllExperts() { this.setAllMuteStatus(false); },
        
        transferAdmin(targetExpert) {
            const currentAdmin = this.expertList.find(e => e.role === '会议管理员');
            if (!currentAdmin) {
                message.error("错误：未找到当前会议管理员。");
                return;
            }
            
            Modal.confirm({
                title: '确认转让管理员',
                content: `您确定要将管理员权限转让给【${targetExpert.name}】吗？此操作不可逆。`,
                okText: '确认转让',
                cancelText: '取消',
                onOk: async () => {
                    try {
                        const promoteResponse = await api.put('/api/mp/role', { 
                            mpId: targetExpert.mpId,
                            expertId: targetExpert.expertId,
                            meetingRole: '会议管理员'
                        });

                        if (!promoteResponse.data || !promoteResponse.data.succeed) { 
                            message.error(`提升${targetExpert.name}为管理员失败: ${promoteResponse.data.message || '未知错误'}`);
                            return;
                        }
                        
                        message.success('管理员已成功转让!');
                        await this.getMeetingMembers();
                        this.hostModalVisible = false;
                        this.$router.push({ path: '/multiexpert/detail', query: { id: this.$route.query.id, meetingId:this.$route.query.meetingId  } });
                    } catch (error) {
                        console.error("管理员转让失败:", error);
                        message.error('网络请求失败，管理员转让操作未完成。');
                        this.getMeetingMembers();
                    }
                },
            });
        },

        showAlgorithmModal() {
            this.algorithmParams.modificationReason = '';
            this.algorithmModalVisible = true;
        },
        handleAlgorithmSave() {
            if (!this.algorithmParams.modificationReason) {
                message.warn('请输入修改理由');
                return;
            }
            this.modalLoading = true;
            console.log("正在将以下参数发送到服务器:", this.algorithmParams);
            setTimeout(() => {
                try {
                    this.modalLoading = false;
                    this.algorithmModalVisible = false;
                    message.success('参数已更新，评估结果已重新计算！');
                } catch (error) {
                    this.modalLoading = false;
                }
            }, 1500);
        },
        handleAlgorithmCancel() { this.algorithmModalVisible = false; },
        
        showExplainabilityModal() {
            this.explainabilityParams.overallValue = this.form.explain.overallValue || undefined;
            this.explainabilityParams.exposure = this.form.explain.exposure || undefined;
            this.explainabilityParams.risk = this.form.explain.risk || undefined;
            this.explainabilityParams.modificationReason = '';
            this.explainabilityModalVisible = true;
        },
        handleExplainabilitySave() {
            if (!this.explainabilityParams.modificationReason) {
                message.warn('请输入修改理由');
                return;
            }
            if (!this.explainabilityParams.overallValue || !this.explainabilityParams.exposure || !this.explainabilityParams.risk) {
                message.warn('请完成所有字段的选择');
                return;
            }
            this.explainabilityModalLoading = true;
            console.log("正在保存可解释性分析结果:", this.explainabilityParams);
            setTimeout(() => {
                this.form.explain.overallValue = this.explainabilityParams.overallValue;
                this.form.explain.exposure = this.explainabilityParams.exposure;
                this.form.explain.risk = this.explainabilityParams.risk;
                message.success('可解释性分析结果已更新！');
                this.explainabilityModalLoading = false;
                this.explainabilityModalVisible = false;
            }, 1000);
        },
        handleExplainabilityCancel() { this.explainabilityModalVisible = false; },
        toggleVoiceConnection() {
            if (this.isVoiceConnected) {
                this.disconnectFromVoice();
            } else {
                this.connectToVoice();
            }
        },

        async connectToVoice() {
            const meetingId = this.$route.query.meetingId;
            const userInfo = this.$store.getters['auth/userInfo'];

            if (!meetingId || !userInfo) {
                message.error("无法获取会议或用户信息，无法加入语音。");
                return;
            }

            try {
                // 1. 后端获取 Token
                const response = await api.post('/api/livekit/token', {
                    roomName: `meeting-${meetingId}`, 
                    participantIdentity: userInfo.account, 
                });

                const { token } = response.data;
                if (!token) {
                    message.error("获取语音授权失败！");
                    return;
                }

                // 2. 创建并连接到 Room
                this.livekitRoom = new Room();
                const livekitUrl = 'ws://10.13.1.104:7880'; 

                message.info('正在连接语音服务...');
                await this.livekitRoom.connect(livekitUrl, token);

                this.livekitRoom
            .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
                console.log('✅ 成功订阅到新的轨道', {
                    trackSid: track.sid,
                    kind: track.kind,
                    participant: participant.identity
                });
                if (track.kind === 'audio') {
                    const element = track.attach(); 
                    // 将这个元素直接添加到页面的 body 中，使其可以播放声音
                    document.body.appendChild(element); 
                }
            })
            .on(RoomEvent.TrackSubscriptionFailed, (trackSid, participant) => {
                console.error('❌ 订阅轨道失败', {
                    trackSid: trackSid,
                    participant: participant.identity
                });
                // 这个事件是诊断问题的关键！
            })
            .on(RoomEvent.ConnectionStateChanged, (state) => {
                console.log('🔗 连接状态改变:', state);
                // 观察状态是否从 connecting -> connected
            });

                // 3. 成功连接后，开启麦克风
                await this.livekitRoom.localParticipant.setMicrophoneEnabled(true);

                this.isVoiceConnected = true;
                this.isMutedBySelf = false;
                message.success('语音已连接！');

                //  监听其他事件
                this.livekitRoom.on(RoomEvent.ParticipantConnected, (participant) => {
                    message.info(`${participant.identity} 加入了语音。`);
                });
                this.livekitRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
                    message.warn(`${participant.identity} 离开了语音。`);
                });

            } catch (error) {
                console.error("连接语音失败:", error);
                message.error("连接语音失败，请检查网络或联系管理员。");
                if (this.livekitRoom) {
                    this.livekitRoom.disconnect();
                    this.livekitRoom = null;
                }
            }
        },

        async disconnectFromVoice() {
            if (this.livekitRoom) {
            // 在断开连接前，先手动停止所有本地轨道的发布，特别是麦克风
            this.livekitRoom.localParticipant.setMicrophoneEnabled(false);

            // 使用 await 确保断开操作完成后再继续
            await this.livekitRoom.disconnect();
        
            // 更新前端状态
            this.livekitRoom = null;
            this.isVoiceConnected = false;
            message.warn('语音已断开。');
            }
        },

        // 切换自己的麦克风状态
        toggleSelfMute() {
            if (!this.livekitRoom) return;
            const newMuteState = !this.isMutedBySelf;
            this.livekitRoom.localParticipant.setMicrophoneEnabled(!newMuteState);
            this.isMutedBySelf = newMuteState;
            message.info(newMuteState ? '麦克风已静音' : '麦克风已开启');
        }
    },
}
</script>

<style scoped>
.vulnerability-assessment-container {
    padding: 24px;
    background-color: #F7F8FB;
    font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
    color: #666666;
    font-size: 12px;
}
.ant-form-text {
    display: inline-block;
    min-height: 32px;
    line-height: 32px;
    width: 100%;
    padding: 0 11px;
    color: #666666;
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    word-break: break-all;
}
.card-section>>>.ant-card-head-title,
.panel-title {
    font-size: 14px !important; 
    color: #333333 !important; 
}
.vulnerability-assessment-container >>> .ant-btn-primary {
    background-color: #2BBAFF;
    border-color: #2BBAFF; 
}
.vulnerability-assessment-container >>> .ant-btn-primary:hover,
.vulnerability-assessment-container >>> .ant-btn-primary:focus {
    background-color: #26649D;
    border-color: #26649D; 
}
.vulnerability-assessment-container >>> .ant-btn-primary:active {
    background-color: #20507a;
    border-color: #20507a;
}
.vulnerability-assessment-container >>> .ant-btn:not(.ant-btn-primary) {
    background-color: #FFFFFF;
    border: 1px solid #d9d9d9;
    color: #666666;
}
.vulnerability-assessment-container >>> .ant-btn:not(.ant-btn-primary):hover,
.vulnerability-assessment-container >>> .ant-btn:not(.ant-btn-primary):focus {
    border-color: #2BBAFF;
    color: #2BBAFF;
}
.vulnerability-assessment-container >>> .ant-input:focus,
.vulnerability-assessment-container >>> .ant-input:hover,
.vulnerability-assessment-container >>> .ant-input-affix-wrapper:focus,
.vulnerability-assessment-container >>> .ant-input-affix-wrapper:hover,
.vulnerability-assessment-container >>> .ant-select-selection:hover,
.vulnerability-assessment-container >>> .ant-select-open .ant-select-selection,
.vulnerability-assessment-container >>> .ant-select-focused .ant-select-selection,
.vulnerability-assessment-container >>> .ant-calendar-picker:hover .ant-input {
    border-color: #2BBAFF;
    box-shadow: 0 0 0 2px rgba(43, 186, 255, 0.2);
}
.vulnerability-assessment-container >>> .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #2BBAFF;
    border-color: #2BBAFF;
}
.vulnerability-assessment-container >>> .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.vulnerability-assessment-container >>> .ant-checkbox:hover .ant-checkbox-inner,
.vulnerability-assessment-container >>> .ant-checkbox-input:focus+.ant-checkbox-inner {
    border-color: #2BBAFF;
}
.vulnerability-assessment-container >>> .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #2BBAFF;
    border-color: #2BBAFF;
    color: #fff;
}
.vulnerability-assessment-container >>> .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background: #26649D;
    border-color: #26649D;
}
.card-section {
    margin-bottom: 16px;
    background-color: #FFFFFF;
}
.card-section>>>.ant-card-body {
    padding: 16px;
}
.card-section>>>.ant-card-head {
    min-height: 48px;
    padding: 0 16px;
}
.card-section::after {
    content: '';
    display: table;
    clear: both;
}
.ant-form-item {
    margin-bottom: 12px;
}
.ant-form-vertical .ant-form-item-label {
    padding-bottom: 4px !important;
}
.opinion-assistant-btn {
    margin-top: 8px;
    float: right;
}
.footer-buttons {
    margin-top: 24px;
    text-align: left;
}
.retrieval-panel {
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
    height: 100%;
}
.panel-title {
    font-weight: 500;
    margin-bottom: 16px;
}
.ant-checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.ant-checkbox-wrapper {
    margin-left: 0 !important;
    margin-bottom: 8px;
}
.retrieval-request-box,
.retrieval-result-box {
    border: 1px solid #d9d9d9;
    padding: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
    border-radius: 2px;
}
.box-title {
    font-weight: 500;
    margin-bottom: 12px;
    color: #333333;
    font-size: 13px;
}
.retrieval-result-box .ant-radio-group {
    margin-bottom: 16px;
}
.display-area {
    border: 1px dashed #d9d9d9;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bfbfbf;
    background-color: #fafafa;
    border-radius: 2px;
}
.host-modal-content {
    padding: 16px 0;
}
.experts-card {
    margin-bottom: 16px;
}
.experts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
}
.experts-count {
    font-size: 14px;
    color: #666;
    font-weight: 500;
}
.global-controls {
    display: flex;
    gap: 8px;
}
.experts-list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 16px;
}
.expert-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background-color: #fafafa;
    transition: all 0.3s ease;
}
.expert-item:hover {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
}
.expert-item.muted {
    background-color: #fff2f0;
    border-color: #ffccc7;
}
.expert-info {
    display: flex;
    align-items: center;
    flex: 1;
}
.expert-avatar {
    margin-right: 12px;
    background-color: #2BBAFF;
}
.expert-details {
    flex: 1;
}
.expert-name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
}
.expert-role {
    font-size: 12px;
    color: #666;
}
.expert-status {
    margin-left: 12px;
}
.expert-controls {
    display: flex;
    align-items: center;
}
.add-expert-section {
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
}
.modal-footer {
    text-align: right;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    margin-top: 16px;
}
.modal-footer .ant-btn {
    margin-left: 8px;
}
.chat-history {
    height: 350px;
    overflow-y: auto;
    border: 1px solid #f0f0f0;
    padding: 12px;
    margin-bottom: 16px;
    background-color: #fafafa;
    border-radius: 4px;
}
.chat-message {
    margin-bottom: 10px;
    line-height: 1.5;
}
.chat-message strong {
    color: #26649D;
}
.chat-input-area {
    text-align: right;
}
</style>
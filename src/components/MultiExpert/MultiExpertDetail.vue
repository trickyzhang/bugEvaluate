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
                                    <span class="ant-form-text">{{ form.threatIntelligence.fieldN }}</span>
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
                                <a-form-item label="整体价值" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleSaveOpinion">保存结果</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn">大模型生成</a-button>
                </a-card>

                <div>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn" @click="startEval">开始评估</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn" @click="endEval">结束评估</a-button>
                    <a-button style="margin-left: 8px;" @click="returnList" class="opinion-assistant-btn">返回列表</a-button>
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
                        style="margin-left: 8px;" 
                        class="opinion-assistant-btn"
                        @click="showVoiceTestModal"
                    >                   
                        <a-icon type="tool" />
                        语音诊断
                    </a-button>
                    <a-button
                        v-if="isVoiceConnected"
                        style="margin-left: 8px;"
                        class="opinion-assistant-btn"
                        @click="toggleSelfMute"
                        :disabled="isMutedByHost"
                    >               
                    <a-icon :type="isMutedBySelf || isMutedByHost ? 'stop' : 'mic'" />
                        {{ isMutedBySelf || isMutedByHost ? '取消禁麦' : '麦克风静音' }}
                    </a-button>
                </div>

                
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
                                <pre>{{ retrievalDisplay }}</pre>
                            </div>
                        </div>
                        <a-button type="primary" block @click="shareData()" >共享数据</a-button>
                    </a-form>
                </div>
            </a-col>
        </a-row>

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
                <a-form-item label="整体价值" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
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

        <a-modal
            title="数据共享"
            :visible="shareConfirmModalVisible"
            @ok="acceptSharedData"
            @cancel="() => { shareConfirmModalVisible = false; }"
            okText="接受"
            cancelText="拒绝"
        >
            <p v-if="incomingSharedData">
                来自专家 <strong>{{ incomingSharedData.userAccount }}</strong> 的共享数据，是否要接收并应用到您的数据检索面板？
            </p>
        </a-modal>

        <VoiceTestModal 
            :visible="voiceTestModalVisible"
            @ok="handleVoiceTestOk"
            @cancel="handleVoiceTestCancel"
        />
    </div>
</template>

<script>
import { Button, Row, Col, Card, Form, Input, Checkbox, Radio, Select, DatePicker, Modal, message, Icon } from 'ant-design-vue';
import api from '@/utils/axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Room, RoomEvent } from 'livekit-client';
import config from '@/config';
import VoiceTestModal from './VoiceTestModal.vue';

export default {
    name: 'VulnerabilityAssessmentDetail', 
    components: {
        'a-button': Button, 'a-row': Row, 'a-col': Col, 'a-card': Card, 'a-form': Form,
        'a-form-item': Form.Item, 'a-input': Input, 'a-checkbox-group': Checkbox.Group,
        'a-checkbox': Checkbox, 'a-radio-group': Radio.Group, 'a-radio-button': Radio.Button,
        'a-select': Select, 'a-select-option': Select.Option, 'a-range-picker': DatePicker.RangePicker,
        'a-textarea': Input.TextArea, 'a-modal': Modal, 'a-icon': Icon,
        VoiceTestModal,
    },
    data() {
        return {
            livekitToken: null,
            stompClient: null,
            subscriptions: {},
            isMutedByHost: false,
            shareConfirmModalVisible: false,
            incomingSharedData: null,
            form: {
                basic: { cveID: '', cveType: '', softwareType: '', cveTitle: '', cveDescription: '' },
                threatIntelligence: { field1: '', field2: '', fieldN: '' },
                religion: { field1:'', field2:'' },
                autoSoft: { value: '', weapon: '', service: '', exploitability: '' },
                explain: { overallValue: '', exposure: '', risk: '' },
                overallOpinion: '',
            },
            retrieval: {
                sources: [], dateRange: [], keywords: '',
                vulnType: undefined, other: '', resultView: 'table',
            },
            chatModalVisible: false, newChatMessage: '', chatHistory: [],
            algorithmModalVisible: false, modalLoading: false,
            algorithmParams: { paramA: '默认值1', paramB: '默认值2', paramC: '默认值3', paramD: '默认值4', modificationReason: '' },
            explainabilityModalVisible: false, explainabilityModalLoading: false,
            explainabilityParams: { overallValue: undefined, exposure: undefined, risk: undefined, modificationReason: '' },
            livekitRoom: null, isVoiceConnected: false, isMutedBySelf: false,
            voiceTestModalVisible: false,
            evalReportTitle:' ',
        }
    },
    computed: {
        retrievalDisplay() {
            return JSON.stringify(this.retrieval, null, 2);
        }
    },
    created() {
        this.fetchDetails();
        this.fetchChatHistory();
        this.initWebSocket();
        this.checkBrowserCompatibility();
    },
    beforeDestroy() {
        this.leaveRoom();
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
        initWebSocket() {
            const meetingId = this.$route.query.meetingId;
            const authToken = this.$store.getters['auth/authToken'];
            if (!meetingId || !authToken) {
                message.error("无法获取会议ID或用户凭证,无法连接");
                return;
            }

            this.stompClient = new Client({
                brokerURL: config.websocket.brokerURL, 
                webSocketFactory: () => new SockJS(config.websocket.webSocketUrl),
                connectHeaders: { Authorization: authToken },
                reconnectDelay: 5000,
            });

            this.stompClient.onConnect = frame => {
                message.success('成功连接到会议服务！');
                console.log('Connected to WebSocket: ' + frame)
                this.joinRoom(); // 连接成功后立即加入房间

                // 订阅会议广播消息
                this.subscriptions.meeting = this.stompClient.subscribe('/topic/meeting/' + meetingId, (message) => {
                    this.handleMeetingMessage(JSON.parse(message.body));
                });

                // 订阅个人错误消息
                this.subscriptions.errors = this.stompClient.subscribe('/user/queue/errors', (error) => {
                    const errorBody = JSON.parse(error.body);
                    message.error(`系统错误: ${errorBody.payload.message || '未知错误'}`);
                    if (errorBody.payload.message === '非法成员') {
                        message.warn('您无权加入此会议，即将退出。');
                        this.returnList();
                    }
                });

                // 订阅LiveKit Token
                this.subscriptions.livekit = this.stompClient.subscribe("/user/queue/livekit-token", (livekitMsg) => {
                    const msgObj = JSON.parse(livekitMsg.body);
                    if (msgObj.type === "LIVEKIT_TOKEN" && msgObj.payload) {
                    console.log("Received LiveKit Token via WebSocket, storing for later use.");
                    this.livekitToken = msgObj.payload; 
                    }
                });
            };

            this.stompClient.onStompError = frame => {
                message.error('WebSocket连接发生错误: ' + frame.headers['message']);
            };

            this.stompClient.activate();
        },
        handleMeetingMessage(msg) { 
            const currentUserId = this.$store.getters['auth/userId'];
            switch (msg.type) {
                case "CHAT":
                    this.chatHistory.push({ user: msg.userAccount || '未知用户', text: msg.payload, timestamp: msg.timestamp });
                    this.$nextTick(() => { if (this.$refs.chatHistory) this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight; });
                    break;
                case "MUTE":
                    if (msg.payload && msg.payload.expertId === currentUserId) {
                        this.isMutedByHost = true;
                        if (this.livekitRoom) this.livekitRoom.localParticipant.setMicrophoneEnabled(false);
                        message.warn('您已被主持人禁言。');
                    }
                    break;
                case "UNMUTE":
                    if (msg.payload && msg.payload.expertId === currentUserId) {
                        this.isMutedByHost = false;
                        message.success('主持人已解除对您的禁言。');
                    }
                    break;
                case "SHARE":
                     if (msg.expertId !== currentUserId) {
                        this.incomingSharedData = msg;
                        this.shareConfirmModalVisible = true;
                    }
                    break;
                case "JOIN":
                case "LEAVE":
                    message.info(`${msg.userAccount} ${msg.type === 'JOIN' ? '加入了' : '离开了'}会议。`);
                    break;
            }
        },
        disconnectWebSocket() {
            if (this.stompClient) {
                Object.values(this.subscriptions).forEach(sub => sub.unsubscribe());
                this.subscriptions = {};
                this.stompClient.deactivate();
                this.stompClient = null;
                console.log('WebSocket disconnected.');
            }
        },
        joinRoom() {
            const joinMessage = {
                meetingId: this.$route.query.meetingId,
                expertId: this.$store.getters['auth/userId'],
                userAccount: this.$store.getters['auth/userInfo'].account,
                type: 'JOIN', payload: null, timestamp: Date.now()
            };
            this.stompClient.publish({
                destination: '/app/join',
                body: JSON.stringify(joinMessage)
            });
        },

        leaveRoom() {
            if (this.stompClient && this.stompClient.active) {
                const leaveMessage = {
                    meetingId: this.$route.query.meetingId,
                    expertId: this.$store.getters['auth/userId'],
                    userAccount: this.$store.getters['auth/userInfo'].account,
                    type: 'LEAVE', payload: null, timestamp: Date.now()
                };
                this.stompClient.publish({
                    destination: '/app/leave',
                    body: JSON.stringify(leaveMessage)
                });
            }
        },

        shareData() {
            if (!this.stompClient || !this.stompClient.active) {
                message.error("无法共享，连接已断开。");
                return;
            }
            const dataToShare = {
                sources: this.retrieval.sources,
                dateRange: this.retrieval.dateRange,
                keywords: this.retrieval.keywords,
                vulnType: this.retrieval.vulnType,
                other: this.retrieval.other,
                resultView: this.retrieval.resultView,
            };

            const shareMessage = {
                meetingId: this.$route.query.meetingId,
                expertId: this.$store.getters['auth/userId'],
                userAccount: this.$store.getters['auth/userInfo'].account,
                type: 'SHARE',
                payload: dataToShare,
                timestamp: Date.now()
            };

            this.stompClient.publish({
                destination: '/app/share',
                body: JSON.stringify(shareMessage)
            });
            message.success('数据已共享！');
        },
        
        acceptSharedData() {
            if (this.incomingSharedData && this.incomingSharedData.payload) {
                this.retrieval = { ...this.retrieval, ...this.incomingSharedData.payload };
                message.success('已接收共享数据。');
            }
            this.shareConfirmModalVisible = false;
            this.incomingSharedData = null;
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
                    
                    // 4. 映射 "自动化评估可解释性分析结果" 并存储原始指标信息
                    if (data.metricVOList && Array.isArray(data.metricVOList)) {
                        this.metricInfo = data.metricVOList.map(item => ({ 
                            metricId: item.metricId,
                            metricCode: item.metricCode
                    }));

                        data.metricVOList.forEach(item => {
                            switch (item.metricCode) {
                                case '漏洞价值': 
                                    this.form.explain.overallValue = item.originalAnalysisRate;
                                    break;
                                case '漏洞暴露度':
                                    this.form.explain.exposure = item.originalAnalysisRate;
                                    break;
                                case '漏洞风险':
                                    this.form.explain.risk = item.originalAnalysisRate;
                                    break;
                            }
                        });
                    }

                    this.form.overallOpinion = data.evalReportContent;
                    this.evalReportTitle = data.evalReportTitle;
                    message.success(`成功加载漏洞 ${id} 的详情。`);
                } else {
                    message.error('获取漏洞详情失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("获取详情失败:", error);
                message.error('网络请求失败，请检查网络或联系管理员。');
            }
        },
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
        returnList() { 
            this.leaveRoom(); 
            this.disconnectWebSocket(); 
            this.$router.push('/multiexpert'); 
        },

        handleText() { this.chatModalVisible = true; },
        handleChatModalCancel() { this.chatModalVisible = false; },

        async handleSendMessage() {
            if (!this.newChatMessage.trim() || !this.stompClient || !this.stompClient.active) return;
            const chatMessage = {
                meetingId: this.$route.query.meetingId,
                expertId: this.$store.getters['auth/userId'],
                userAccount: this.$store.getters['auth/userInfo'].account,
                type: 'CHAT', payload: this.newChatMessage, timestamp: Date.now()
            };
            this.stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(chatMessage)
            });
            this.newChatMessage = '';
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
        async handleExplainabilitySave() {
            // 前端表单校验
            if (!this.explainabilityParams.modificationReason) {
                message.warn('请输入修改理由');
                return;
            }
            if (!this.explainabilityParams.overallValue || !this.explainabilityParams.exposure || !this.explainabilityParams.risk) {
                message.warn('请完成所有字段的选择');
                return;
            }

            this.explainabilityModalLoading = true;

            try {
                // 从存储的 metricInfo 中查找各项的 ID
                const valueMetric = this.metricInfo.find(m => m.metricCode === '漏洞价值');
                const exposureMetric = this.metricInfo.find(m => m.metricCode === '漏洞暴露度');
                const riskMetric = this.metricInfo.find(m => m.metricCode === '漏洞风险');

                // 如果缺少任何一项的ID信息，则无法提交
                if (!valueMetric || !exposureMetric || !riskMetric) {
                    message.error('无法找到原始指标ID,请刷新页面或联系管理员。');
                    this.explainabilityModalLoading = false;
                    return;
                }

                // 构建符合接口要求的请求体
                const payload = {
                    evalId: this.$route.query.id,
                    evalExpert: this.$store.getters['auth/userId'], 
                    metricList: [
                        {
                            metricId: valueMetric.metricId,
                            metricCode: valueMetric.metricCode,
                            adjustedAnalysisRate: this.explainabilityParams.overallValue
                        },
                        {
                            metricId: exposureMetric.metricId,
                            metricCode: exposureMetric.metricCode,
                            adjustedAnalysisRate: this.explainabilityParams.exposure
                        },
                        {
                            metricId: riskMetric.metricId,
                            metricCode: riskMetric.metricCode,
                            adjustedAnalysisRate: this.explainabilityParams.risk
                        }
                    ],
                    adjustedReason: this.explainabilityParams.modificationReason
                };

                const response = await api.put("/api/metric-eval", payload);

                if (response.data.succeed) {
                    // 请求成功后，用修改的值更新前端页面显示
                    this.form.explain.overallValue = this.explainabilityParams.overallValue;
                    this.form.explain.exposure = this.explainabilityParams.exposure;
                    this.form.explain.risk = this.explainabilityParams.risk;

                    message.success('可解释性分析结果已成功更新！');
                    this.explainabilityModalVisible = false; // 关闭弹窗
                } else {
                    // API返回业务错误
                    message.error('保存失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                // 网络或其他请求错误
                console.error("保存可解释性分析结果失败:", error);
                message.error('网络请求失败，请检查您的网络连接或联系管理员。');
            } finally {
                // 无论成功或失败，都停止加载状态
                this.explainabilityModalLoading = false;
            }
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
            if (this.livekitRoom) return;
    
            if (this.livekitToken) {
                this.connectToVoiceWithToken(this.livekitToken);
            } else {
                message.warn("语音服务正在准备中，请稍后再试。");
            }
        },

        async connectToVoiceWithToken(token) {
            if (!token) {
                message.error("获取语音授权失败！");
                return;
            }

            // 检查浏览器是否支持 getUserMedia
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                message.error("您的浏览器不支持媒体设备访问，请使用现代浏览器（Chrome、Firefox、Safari、Edge）");
                return;
            }

            // 检查是否使用 HTTPS（本地开发除外）
            if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                message.error("语音功能需要 HTTPS 连接，请使用 HTTPS 访问或联系管理员");
                return;
            }

            try {
                // 先请求麦克风权限
                message.info('正在请求麦克风权限...');
                await navigator.mediaDevices.getUserMedia({ audio: true });
                
                this.livekitRoom = new Room();
                message.info('正在连接语音服务...');
                await this.livekitRoom.connect(config.livekit.url, token);

                await this.livekitRoom.localParticipant.setMicrophoneEnabled(!this.isMutedBySelf && !this.isMutedByHost);

                this.isVoiceConnected = true;
                message.success('语音已连接！');

                // 定义一个统一的音轨处理函数
                const handleAudioTrack = (track) => {
                    if (track.kind === 'audio') {
                        // 将音频元素附加到body，使其可以播放
                        document.body.appendChild(track.attach());
                    }
                };

                // 处理已经存在于房间中的参与者
                this.livekitRoom.remoteParticipants.forEach(participant => {
                    participant.trackPublications.forEach(publication => {
                        // 如果音轨已订阅并且存在，则直接处理
                        if (publication.track) {
                            handleAudioTrack(publication.track);
                        }
                    });
                });

                // 处理后续加入的参与者及其音轨
                this.livekitRoom.on(RoomEvent.TrackSubscribed, (track) => {
                    handleAudioTrack(track);
                });

                this.livekitRoom.on(RoomEvent.ParticipantDisconnected, p => message.warn(`${p.identity} 离开了语音。`));
        
            } catch (error) {
                console.error("语音连接错误详情:", error);
                
                let errorMessage = "连接语音失败: ";
                
                if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    errorMessage += "麦克风权限被拒绝，请在浏览器设置中允许麦克风访问，然后刷新页面重试。";
                    message.error(errorMessage);
                    
                    // 显示详细的权限指导
                    this.$confirm({
                        title: '麦克风权限被拒绝',
                        content: `
                            <div style="text-align: left;">
                                <p><strong>解决方法：</strong></p>
                                <p>1. 点击浏览器地址栏左侧的锁定图标</p>
                                <p>2. 找到"麦克风"选项，选择"允许"</p>
                                <p>3. 刷新页面后重新尝试连接语音</p>
                                <p><strong>或者：</strong></p>
                                <p>1. 打开浏览器设置</p>
                                <p>2. 找到"隐私和安全性" → "网站设置" → "麦克风"</p>
                                <p>3. 允许当前网站使用麦克风</p>
                            </div>
                        `,
                        dangerouslyUseHTMLString: true,
                        okText: '我知道了',
                        cancelText: '取消'
                    });
                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    errorMessage += "未检测到麦克风设备，请检查麦克风是否正确连接。";
                } else if (error.name === 'NotSupportedError') {
                    errorMessage += "您的浏览器不支持此功能，请使用 Chrome、Firefox、Safari 或 Edge 浏览器。";
                } else if (error.message && error.message.includes('getUserMedia')) {
                    errorMessage += "浏览器媒体设备访问失败，请检查浏览器设置或尝试使用其他浏览器。";
                } else {
                    errorMessage += error.message || "未知错误";
                }
                
                message.error(errorMessage);
                
                if (this.livekitRoom) {
                    try {
                        await this.livekitRoom.disconnect();
                    } catch (disconnectError) {
                        console.error("断开连接时出错:", disconnectError);
                    }
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

        toggleSelfMute() {
            if (!this.livekitRoom || this.isMutedByHost) return;
            const newMuteState = !this.isMutedBySelf;
            this.livekitRoom.localParticipant.setMicrophoneEnabled(!newMuteState);
            this.isMutedBySelf = newMuteState;
            message.info(newMuteState ? '麦克风已静音' : '麦克风已开启');
        },

        checkBrowserCompatibility() {
            // 检查浏览器是否支持必要的 API
            const compatibilityIssues = [];
            
            if (!navigator.mediaDevices) {
                compatibilityIssues.push('浏览器不支持媒体设备访问');
            }
            
            if (!navigator.mediaDevices?.getUserMedia) {
                compatibilityIssues.push('浏览器不支持 getUserMedia API');
            }
            
            if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                compatibilityIssues.push('语音功能需要 HTTPS 连接');
            }
            
            // 检查是否为支持的浏览器
            const userAgent = navigator.userAgent.toLowerCase();
            const isChrome = userAgent.includes('chrome') && !userAgent.includes('edge');
            const isFirefox = userAgent.includes('firefox');
            const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
            const isEdge = userAgent.includes('edge');
            
            if (!isChrome && !isFirefox && !isSafari && !isEdge) {
                compatibilityIssues.push('建议使用 Chrome、Firefox、Safari 或 Edge 浏览器');
            }
            
            if (compatibilityIssues.length > 0) {
                console.warn('浏览器兼容性检查发现问题:', compatibilityIssues);
                // 可以选择性地显示警告信息
                if (compatibilityIssues.some(issue => issue.includes('HTTPS'))) {
                    message.warn('语音功能需要 HTTPS 连接，当前使用 HTTP 可能无法正常工作');
                }
            }
        },

        showVoiceTestModal() {
            this.voiceTestModalVisible = true;
        },

        handleVoiceTestOk() {
            this.voiceTestModalVisible = false;
            message.success('语音诊断完成');
        },

        handleVoiceTestCancel() {
            this.voiceTestModalVisible = false;
        },
        async startEval(){
            try {
                const response = await api.put("api/eval/start/"+this.$route.query.id);
                if(response.data.succeed){
                    message.info("开始评估");
                }else{
                    message.error("开始评估失败");
                    console.log(response.data);
                }
            } catch (error) {
                message.error("评估开始失败");
                console.log(error);
            }
        },
        async endEval(){
            //结束评估
            try {
                const response = await api.put("api/eval/confirm/"+this.$route.query.id);
                if(response.data.succeed){
                    message.info("评估完成");
                }else{
                    message.error("结束评估失败")
                    console.log(response.data);
                }
            } catch (error) {
                message.error("评估结束失败");
                console.log(error);
            }
        },
        async handleSaveOpinion(){
            const evalId = this.$route.query.id;
            try {
                const response = await api.put("api/eval/content",{
                    evalId: evalId,
                    evalReportTitle: this.evalReportTitle,
                    evalReportContent: this.form.overallOpinion,
                    aiMeetingSummary: null,
                });
                if(response.data.succeed){
                    message.info("修改成功");
                }else{
                    message.error("保存意见失败");
                    console.log(response.data);
                }
            } catch (error) {
                message.error("保存总体意见失败");
                console.log(error);
            }
        },
    }
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
    line-height: 32px; /* 对齐输入框高度 */
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
.display-area pre {
    text-align: left;
    white-space: pre-wrap;
    word-break: break-all;
    width: 100%;
    padding: 10px;
    color: #333;
}
/* 聊天弹窗样式 */
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
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
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn">保存结果</a-button>
                    <a-button style="margin-left: 8px;" @click="handleClick2" class="opinion-assistant-btn">返回列表</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn">大模型辅助生成</a-button>
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleText">文字聊天</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn">语音聊天</a-button>
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleHost">主持会议</a-button>
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
                            :key="expert.id" 
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
                                    @click="toggleExpertMute(expert.id)"
                                >
                                    <a-icon :type="expert.isMuted ? 'sound' : 'stop'" />
                                    {{ expert.isMuted ? '解除禁言' : '禁言' }}
                                </a-button>
                                <a-button 
                                    type="default" 
                                    size="small" 
                                    @click="removeExpert(expert.id)"
                                    style="margin-left: 8px;"
                                >
                                    <a-icon type="delete" />
                                    移除
                                </a-button>
                            </div>
                        </div>
                    </div>

                    <div class="add-expert-section">
                        <a-divider>添加专家</a-divider>
                        <a-form layout="inline">
                            <a-form-item label="选择专家">
                                <a-select 
                                    v-model="selectedExpertToAdd" 
                                    placeholder="请选择要添加的专家"
                                    style="width: 200px;"
                                >
                                    <a-select-option 
                                        v-for="expert in availableExperts" 
                                        :key="expert.id" 
                                        :value="expert.id"
                                    >
                                        {{ expert.name }} - {{ expert.role }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="addExpert" :disabled="!selectedExpertToAdd">
                                    添加专家
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-card>

                <div class="modal-footer">
                    <a-button @click="handleHostModalCancel">取消</a-button>
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
                        <strong>{{ msg.user }}:</strong> {{ msg.text }}
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
    </div>
</template>

<script>
import { Button, Row, Col, Card, Form, Input, Checkbox, Radio, Select, DatePicker, Modal, message, Avatar, Tag, Divider, Icon } from 'ant-design-vue';
import api from '@/utils/axios';

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
        'a-divider': Divider,
        'a-icon': Icon,
    },
    data() {
        return {
            form: {
                basic: {
                    cveID: '',
                    cveType: '',
                    softwareType: '',
                    cveTitle: '',
                    cveDescription: '',
                },
                threatIntelligence: { field1: '', field2: '', fieldN: '' },
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
            chatHistory: [
                { user: '主持人', text: '大家好，会议现在开始。我们首先来讨论一下这个漏洞的评估结果。' },
                { user: '张三', text: '好的，我先来分享一下我的看法...' },
            ],
            expertList: [
                { id: 'expert1', name: '张三', role: '安全专家', avatar: '', isMuted: false },
                { id: 'expert2', name: '李四', role: '漏洞分析专家', avatar: '', isMuted: false },
                { id: 'expert3', name: '王五', role: '风险评估专家', avatar: '', isMuted: false },
                { id: 'expert4', name: '赵六', role: '威胁情报专家', avatar: '', isMuted: false }
            ],
            availableExperts: [
                { id: 'expert5', name: '钱七', role: '网络架构专家' },
                { id: 'expert6', name: '孙八', role: '数据安全专家' },
                { id: 'expert7', name: '周九', role: '应用安全专家' }
            ],
            selectedExpertToAdd: undefined,
            // 算法弹窗
            algorithmModalVisible: false,
            modalLoading: false,
            algorithmParams: {
                paramA: '默认值1',
                paramB: '默认值2',
                paramC: '默认值3',
                paramD: '默认值4',
                modificationReason: '', // 新增
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
        }
    },
    created() {
        this.fetchDetails();
    },
    methods: {
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
                        this.form.threatIntelligence.fieldN = data.threatIntel.field3;
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
        handleClick2() { this.$router.push('/multiexpert'); },
        handleText() { this.chatModalVisible = true; },
        handleChatModalCancel() { this.chatModalVisible = false; },
        handleSendMessage() {
            if (!this.newChatMessage.trim()) return;
            this.chatHistory.push({ user: '主持人', text: this.newChatMessage });
            this.newChatMessage = '';
            this.$nextTick(() => {
                const chatHistoryEl = this.$refs.chatHistory;
                if(chatHistoryEl) { chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight; }
            });
        },
        handleHost(){ this.hostModalVisible = true; },
        handleHostModalOk() { this.hostModalVisible = false; message.success('会议已开始'); },
        handleHostModalCancel() { this.hostModalVisible = false; },
        toggleExpertMute(expertId) {
            const expert = this.expertList.find(e => e.id === expertId);
            if (expert) { expert.isMuted = !expert.isMuted; message.success(`${expert.name} ${expert.isMuted ? '已禁言' : '已解除禁言'}`); }
        },
        muteAllExperts() { this.expertList.forEach(expert => { expert.isMuted = true; }); message.success('全体专家已禁言'); },
        unmuteAllExperts() { this.expertList.forEach(expert => { expert.isMuted = false; }); message.success('全体专家已解除禁言'); },
        removeExpert(expertId) {
            const expertIndex = this.expertList.findIndex(e => e.id === expertId);
            if (expertIndex > -1) {
                const removedExpert = this.expertList.splice(expertIndex, 1)[0];
                this.availableExperts.push({ id: removedExpert.id, name: removedExpert.name, role: removedExpert.role });
                message.success(`${removedExpert.name} 已从会议中移除`);
            }
        },
        addExpert() {
            if (!this.selectedExpertToAdd) return;
            const expertToAdd = this.availableExperts.find(e => e.id === this.selectedExpertToAdd);
            if (expertToAdd) {
                this.expertList.push({ id: expertToAdd.id, name: expertToAdd.name, role: expertToAdd.role, avatar: '', isMuted: false });
                const index = this.availableExperts.findIndex(e => e.id === this.selectedExpertToAdd);
                if (index > -1) { this.availableExperts.splice(index, 1); }
                this.selectedExpertToAdd = undefined;
                message.success(`${expertToAdd.name} 已添加到会议`);
            }
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
        
        // 新增方法
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
    },
}
</script>

<style scoped>
/* 规范 1.2.2 & 1.2.3: 全局字体、颜色、背景 */
.vulnerability-assessment-container {
    padding: 24px;
    background-color: #F7F8FB; /* 规范辅助色  */
    font-family: "Microsoft YaHei", "微软雅黑", sans-serif; /* 规范全局字体  */
    color: #666666; /* 规范正文颜色  */
    font-size: 12px; /* 规范正文字号  */
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
/* 规范 1.2.2: 标题文字 */
.card-section>>>.ant-card-head-title,
.panel-title {
    font-size: 14px !important; 
    color: #333333 !important; 
}

/* 规范 1.2.5 & 1.2.3: 主按钮样式 */
.vulnerability-assessment-container >>> .ant-btn-primary {
    background-color: #2BBAFF; /* 规范链接/高亮色作为正常态 */
    border-color: #2BBAFF; 
}
.vulnerability-assessment-container >>> .ant-btn-primary:hover,
.vulnerability-assessment-container >>> .ant-btn-primary:focus {
    background-color: #26649D; /* 规范主色作为悬浮/焦点态  */
    border-color: #26649D; 
}
.vulnerability-assessment-container >>> .ant-btn-primary:active {
    background-color: #20507a; /* 主色加深作为激活态 */
    border-color: #20507a;
}

/* 规范 1.2.5: 次要按钮样式 */
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

/* 规范 1.2.6: 表单控件高亮色 */
.vulnerability-assessment-container >>> .ant-input:focus,
.vulnerability-assessment-container >>> .ant-input:hover,
.vulnerability-assessment-container >>> .ant-input-affix-wrapper:focus,
.vulnerability-assessment-container >>> .ant-input-affix-wrapper:hover,
.vulnerability-assessment-container >>> .ant-select-selection:hover,
.vulnerability-assessment-container >>> .ant-select-open .ant-select-selection,
.vulnerability-assessment-container >>> .ant-select-focused .ant-select-selection,
.vulnerability-assessment-container >>> .ant-calendar-picker:hover .ant-input {
    border-color: #2BBAFF; /* */
    box-shadow: 0 0 0 2px rgba(43, 186, 255, 0.2);
}

/* 规范 1.2.6: 复选框样式 */
.vulnerability-assessment-container >>> .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #2BBAFF; /* */
    border-color: #2BBAFF; /* */
}
.vulnerability-assessment-container >>> .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.vulnerability-assessment-container >>> .ant-checkbox:hover .ant-checkbox-inner,
.vulnerability-assessment-container >>> .ant-checkbox-input:focus+.ant-checkbox-inner {
    border-color: #2BBAFF;
}

/* 规范 1.2.6: 单选按钮组样式 */
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
    background-color: #FFFFFF; /* 规范辅助色  */
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

/* 确保垂直布局的label有下边距 */
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
    background-color: #fff; /* 规范辅助色  */
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

/* 弹窗样式 */
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
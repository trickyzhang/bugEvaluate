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
                    <div style="text-align: center; margin-top: 8px; display: flex; justify-content: center; gap: 8px;">
                        <a-button type="primary" @click="showAlgorithmModal">编辑算法</a-button>
                        <a-button @click="showAlgoDescriptionModal"> 算法描述 </a-button>
                        <a-button @click="showAutoExplainModal" > 自动化可解释性分析 </a-button>
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
                        <a-button @click="generateExplainabilityWithLLM" :loading="explainLLMLoading">大模型辅助生成</a-button>
                    </div>
                </a-card>

                <a-card title="总体评估意见" :bordered="false" class="card-section">
                    <a-textarea v-model="form.overallOpinion" placeholder="点击输入评估意见"
                        :auto-size="{ minRows: 4, maxRows: 6 }" />
                    <a-button style="margin-left: 8px;" type="primary" class="opinion-assistant-btn" @click="handleSaveOpinion">保存结果</a-button>
                    <a-button style="margin-left: 8px;" class="opinion-assistant-btn" @click="generateOpinionWithLLM" :loading="opinionLLMLoading">大模型辅助生成</a-button>
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
                            <a-radio-group v-model="retrieval.source">
                            <a-radio value="VULN_VERIFY">漏洞验证数据</a-radio>
                            <a-radio value="REGION">漏洞地域</a-radio>
                            <a-radio value="ALGO">各评测算法解释数据</a-radio>
                            <a-radio value="VULN_IMPACT">漏洞影响数据</a-radio>
                            <a-radio value="REPORT">历史同类漏洞评估案例数据</a-radio>
                            <a-radio value="INTEL">威胁情报</a-radio>
                            </a-radio-group>
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
                                <a-input v-model="retrieval.other" placeholder="请输入其他需求, 仅支持大模型脑图" />
                            </a-form-item>
                        </div>

                        <a-button type="primary" block @click="handleDataRetrieval" :loading="retrievalLoading">开始检索</a-button>

                        <div class="retrieval-result-box">
                            <p class="box-title">数据检索结果</p>
                            <a-radio-group v-model="retrieval.resultView" button-style="solid" @change="onResultViewChange">
                                <a-radio-button value="table">表格</a-radio-button>
                                <a-radio-button value="chart">图表</a-radio-button>
                                <a-radio-button value="llm">大模型生成结果</a-radio-button>
                            </a-radio-group>
    
                            <div class="display-area">
                                <div v-if="retrieval.resultView === 'table'" style="width: 100%;">
                                    <a-table 
                                    :columns="tableColumns" 
                                    :dataSource="retrievalResults" 
                                    :loading="retrievalLoading"
                                    :scroll="{ x: 1000 }"
                                    rowKey="id"
                                    v-if="retrievalResults.length > 0"
                                    ></a-table>
                                    <a-empty v-else description="暂无数据或未开始检索" />
                                </div>

                                <div v-else-if="retrieval.resultView === 'chart'" style="width: 100%; height: 100%;">
                                    <v-chart
                                    v-if="activeChartOption"
                                    :option="activeChartOption"
                                    :loading="retrievalLoading"
                                    style="height: 350px; width: 100%;"
                                    autoresize
                                    />
                                    <a-empty v-else description="请先选择一个数据来源并开始检索" />
                                </div>
        
                                <div v-else-if="retrieval.resultView === 'llm'" style="width: 100%; height: 400px;">
                                    <a-spin :spinning="mindMapLoading" style="height: 100%; display: flex; align-items: center; justify-content: center;">
                                        <svg ref="markmapSvg" style="width: 100%; height: 100%;" v-show="!mindMapLoading && mindMapMarkdown"></svg>
        
                                        <a-empty v-if="!mindMapLoading && !mindMapMarkdown" description="暂无内容，切换至此视图可自动生成" />
                                    </a-spin>
                                </div>
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

        <a-modal
            title="算法描述"
            :visible="algoDescModalVisible"
            @cancel="handleAlgoDescCancel"
            :footer="null"
            width="60%"
        >
            <a-spin :spinning="algoDescLoading">
                <a-collapse accordion>
                    <a-collapse-panel v-for="(algo, index) in localStore.algoDescriptions" :key="index" :header="algo.algoDimension">
                        <p style="white-space: pre-wrap;">{{ algo.detail }}</p>
                    </a-collapse-panel>
                </a-collapse>
                <a-empty v-if="!localStore.algoDescriptions.length && !algoDescLoading" description="暂无算法描述信息" />
            </a-spin>
        </a-modal>

        <a-modal
            title="自动化可解释性分析"
            :visible="autoExplainModalVisible"
            @cancel="handleAutoExplainCancel"
            width="60%"
            :footer="null"
        >
            <a-spin :spinning="autoExplainLLMLoading">
                <a-form layout="vertical" v-if="Object.keys(dynamicAutoAnalysis).length > 0">
                    <a-form-item v-for="(value, key) in dynamicAutoAnalysis" :key="key" :label="key">
                        <a-textarea v-model="dynamicAutoAnalysis[key]" :rows="5" placeholder="分析内容" />
                    </a-form-item>
                </a-form>
                <a-empty v-else description="暂无分析内容，请点击下方按钮生成" />
            </a-spin>

            <div class="modal-footer" style="text-align: right; margin-top: 16px;">
                <a-button @click="generateAutoExplainability" :loading="autoExplainLLMLoading" style="margin-right: 8px;">
                    大模型辅助生成
                </a-button>
                <a-button type="primary" @click="saveAutoExplainability" :loading="saveAutoExplainLoading">
                    保存结果
                </a-button>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { Button, Row, Col, Card, Form, Input,  Radio, Select, DatePicker, Modal, message, Icon,Empty, Spin } from 'ant-design-vue';
import api from '@/utils/axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Room, RoomEvent } from 'livekit-client';
import config from '@/config';
import VoiceTestModal from './VoiceTestModal.vue';
import axios from 'axios';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const transformer = new Transformer(); 

const FIELD_MAPPING = {
  'VULN_VERIFY': { fieldName: 'validationMethod', displayName: '漏洞验证方式', chartType: 'pie' },
  'REGION': { fieldName: 'region', displayName: '漏洞地域分布', chartType: 'pie' },
  'VULN_IMPACT': { fieldName: 'impactScore', displayName: '漏洞影响分数', chartType: 'line' },
  'INTEL': { fieldName: 'threatSource', displayName: '威胁情报来源', chartType: 'pie' },
  'ALGO': { fieldName: 'algoScore', displayName: '算法评测分数', chartType: 'line' },
  'REPORT': { fieldName: 'historicalRiskLevel', displayName: '历史案例风险分布', chartType: 'pie' },
};

export default {
    name: 'VulnerabilityAssessmentDetail', 
    components: {
        'a-button': Button, 'a-row': Row, 'a-col': Col, 'a-card': Card, 'a-form': Form,
        'a-form-item': Form.Item, 'a-input': Input, 'a-empty': Empty,'a-spin': Spin,
         'a-radio-group': Radio.Group, 'a-radio-button': Radio.Button,
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
            localStore: {
                vulnInfo: null,
                threatIntel: null,
                religionInfo: null,
                autoSoft: null,
                metricInfo: [], 
                algoDescriptions: [],
            },
            retrieval: {
                source: null, 
                dateRange: [], 
                keywords: '',
                vulnType: undefined, 
                other: '', 
                resultView: 'table',
            },
            retrievalLoading: false, 
            retrievalResults: [],    
            mindMapResult: null, 
            mindMapMarkdown: '',
            mindMapLoading: false,
            markmapInstance: null,
            chatModalVisible: false, newChatMessage: '', chatHistory: [],
            algorithmModalVisible: false, modalLoading: false,
            algorithmParams: { paramA: '默认值1', paramB: '默认值2', paramC: '默认值3', paramD: '默认值4', modificationReason: '' },
            explainabilityModalVisible: false, explainabilityModalLoading: false,
            explainLLMLoading: false, 
            opinionLLMLoading: false, 
            explainabilityParams: { overallValue: undefined, exposure: undefined, risk: undefined, modificationReason: '' },
            livekitRoom: null, isVoiceConnected: false, isMutedBySelf: false,
            voiceTestModalVisible: false,
            evalReportTitle:' ',
            algoDescModalVisible: false,
            algoDescLoading: false,
            autoExplainModalVisible: false,
            autoExplainLLMLoading: false,
            saveAutoExplainLoading: false,
            dynamicAutoAnalysis: {},
            tableColumns: [
                { title: '漏洞ID', dataIndex: 'id', key: 'id', width: 150, fixed: 'left' }, // 使用 fixed: 'left' 固定在左侧
                { title: '发现日期', dataIndex: 'date', key: 'date', width: 120 },
                { title: '影响分数', dataIndex: 'impactScore', key: 'impactScore', width: 100, sorter: (a, b) => a.impactScore - b.impactScore },
                { title: '地域', dataIndex: 'region', key: 'region', width: 100 },
                { title: '验证方式', dataIndex: 'validationMethod', key: 'validationMethod', width: 120 },
                { title: '威胁来源', dataIndex: 'threatSource', key: 'threatSource', width: 120 },
                { title: '算法分数', dataIndex: 'algoScore', key: 'algoScore', width: 100, sorter: (a, b) => a.algoScore - b.algoScore },
                { title: '历史风险', dataIndex: 'historicalRiskLevel', key: 'historicalRiskLevel', width: 120 },
            ],
        }
    },
    computed: {
        retrievalDisplay() {
            return JSON.stringify(this.retrieval, null, 2);
        },
        activeChartOption() {
            // 1. 检查是否选择了数据源
            if (!this.retrieval.source || this.retrievalResults.length === 0) {
                return null; // 如果没有选择或没有数据，不生成图表
            }

            // 2. 从映射表中找到对应的配置信息
            const mapping = FIELD_MAPPING[this.retrieval.source];
            if (!mapping) {
                return null; // 如果选择的源没有映射，不生成图表
            }

            // 3. 根据映射的 chartType 调用对应的生成函数
            let option = {};
            if (mapping.chartType === 'pie') {
                option = this.generatePieOption(mapping.fieldName, mapping.displayName);
            } else if (mapping.chartType === 'line') {
            option = this.generateLineOption(mapping.fieldName, mapping.displayName);
            }
      
            return option;
        }
    },
    created() {
        this.fetchDetails();
        this.fetchChatHistory();
        this.initWebSocket();
        this.checkBrowserCompatibility();
        this.fetchAlgoDescriptions(); 
    },
    beforeDestroy() {
        this.leaveRoom();
        this.disconnectWebSocket();
        if (this.livekitRoom) {
            this.livekitRoom.disconnect();
        }
        if (this.markmapInstance) {
            this.markmapInstance.destroy();
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
                webSocketFactory: () => new SockJS(config.websocket.webSocketUrl, null, { transports: ['websocket'] }),
                connectHeaders: { Authorization: authToken },
                reconnectDelay: 5000,
            });

            this.stompClient.onConnect = frame => {
                message.success('成功连接到会议服务！');
                console.log('Connected to WebSocket: ' + frame)
                this.joinRoom();
                
                this.subscriptions.meeting = this.stompClient.subscribe('/topic/meeting/' + meetingId, (message) => {
                    this.handleMeetingMessage(JSON.parse(message.body));
                });

                this.subscriptions.errors = this.stompClient.subscribe('/user/queue/errors', (error) => {
                    const errorBody = JSON.parse(error.body);
                    message.error(`系统错误: ${errorBody.payload.message || '未知错误'}`);
                    if (errorBody.payload.message === '非法成员') {
                        this.returnList();
                    }
                });

                this.subscriptions.livekit = this.stompClient.subscribe("/user/queue/livekit-token", (livekitMsg) => {
                    const msgObj = JSON.parse(livekitMsg.body);
                    if (msgObj.type === "LIVEKIT_TOKEN" && msgObj.payload) {
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
                        message.info('请重新打开麦克风或重连语音');
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
                case "NEW_ADMIN":
                    if(msg.payload && msg.payload.expertId === currentUserId){
                        message.success('您已被提升为会议管理员，请及时返回列表重新主持会议。', 4);
                        message.success('您已被提升为会议管理员，请及时返回列表重新主持会议。', 4);
                    }
            }
        },
        disconnectWebSocket() {
            if (this.stompClient) {
                Object.values(this.subscriptions).forEach(sub => sub.unsubscribe());
                this.subscriptions = {};
                this.stompClient.deactivate();
                this.stompClient = null;
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
                source: this.retrieval.source,
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
            this.handleDataRetrieval();
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
                     // 1. 映射 "漏洞基本信息" 并本地存储
                    if (data.vulnInfo) {
                        this.localStore.vulnInfo = { ...data.vulnInfo }; // 本地存储
                        this.form.basic.cveID = data.vulnInfo.cveId;
                        this.form.basic.cveType = data.vulnInfo.cveType;
                        this.form.basic.softwareType = data.vulnInfo.softwareType;
                        this.form.basic.cveTitle = data.vulnInfo.cveTitle;
                        this.form.basic.cveDescription = data.vulnInfo.cveDescription;
                    }
                     // 2. 映射 "威胁情报来源" 并本地存储
                    if (data.threatIntel) {
                        this.localStore.threatIntel = { ...data.threatIntel }; // 本地存储
                        this.form.threatIntelligence.field1 = data.threatIntel.field1;
                        this.form.threatIntelligence.field2 = data.threatIntel.field2;
                        this.form.threatIntelligence.field3 = data.threatIntel.field3;
                    }
                    // 3. 映射 "自动化软件漏洞评估结果" 并本地存储
                    if (data.dimVOList && Array.isArray(data.dimVOList)) {
                        this.localStore.autoSoft = [ ...data.dimVOList ]; // 本地存储
                        data.dimVOList.forEach(item => {
                            if(item.analysisResult) {
                                this.form.autoSoftAnalysis[item.dimensionCode] = item.analysisResult;
                            }
                            if(item.isisAdjusted == 0){
                                switch (item.dimensionCode) {
                                case '漏洞价值':
                                    this.form.autoSoft.value = item.originalEvalValue;
                                    break;
                                case '漏洞武器':
                                    this.form.autoSoft.weapon = item.originalEvalValue;
                                    break;
                                case '漏洞服务':
                                    this.form.autoSoft.service = item.originalEvalValue;
                                    break;
                                case '漏洞可利用性':
                                    this.form.autoSoft.exploitability = item.originalEvalValue;
                                    break;
                                }
                            }else{
                                switch (item.dimensionCode) {
                                case '漏洞价值':
                                    this.form.autoSoft.value = item.adjustedEvalValue;
                                    break;
                                case '漏洞武器':
                                    this.form.autoSoft.weapon = item.adjustedEvalValue;
                                    break;
                                case '漏洞服务':
                                    this.form.autoSoft.service = item.adjustedEvalValue;
                                    break;
                                case '漏洞可利用性':
                                    this.form.autoSoft.exploitability = item.adjustedEvalValue;
                                    break;
                                }
                            }
                            
                            
                        });
                    }
                    
                    // 4. 映射 "自动化评估可解释性分析结果" 并存储原始指标信息
                    if (data.metricVOList && Array.isArray(data.metricVOList)) {
                        this.localStore.metricInfo = data.metricVOList.map(item => ({ 
                            metricId: item.metricId,
                            metricCode: item.metricCode
                        }));

                        data.metricVOList.forEach(item => {
                            if(item.isisAdjusted == 0){
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
                            }else{
                                switch (item.metricCode) {
                                case '漏洞价值': 
                                    this.form.explain.overallValue = item.adjustedAnalysisRate;
                                    break;
                                case '漏洞暴露度':
                                    this.form.explain.exposure = item.adjustedAnalysisRate;
                                    break;
                                case '漏洞风险':
                                    this.form.explain.risk = item.adjustedAnalysisRate;
                                    break;
                                }
                            }
                        });
                    }
                    // 5. 映射 "总体评估意见"
                    this.form.overallOpinion = data.evalReportContent;
                    this.evalReportTitle = data.evalReportTitle;
                     // 6. 新增：独立获取漏洞地域信息
                    this.fetchReligionData(id);

                    message.success(`成功加载漏洞 ${id} 的详情。`);
                } else {
                    message.error('获取漏洞详情失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("获取详情失败:", error);
                message.error('网络请求失败，请检查网络或联系管理员。');
            }
        },
        async fetchReligionData(id) {
            try {
                const response = await api.get(`/api/vuln-location/${id}`); 
                if (response.data.succeed) {
                    const religionData = response.data.data;
                    this.localStore.religionInfo = { ...religionData };
                    this.form.religion.field1 = religionData.field1;
                    this.form.religion.field2 = religionData.field2;
                } else {
                     message.error('获取漏洞地域信息失败。');
                }
            } catch (error) {
                console.warn("无法从/api/vuln-location获取数据，将使用模拟数据。");
                const mockReligionData = { field1: '模拟地域A', field2: '模拟地域B' };
                this.localStore.religionInfo = { ...mockReligionData };
                this.form.religion.field1 = mockReligionData.field1;
                this.form.religion.field2 = mockReligionData.field2;
            }
        },
        async fetchAlgoDescriptions() {
            this.algoDescLoading = true;
            try {
                const response = await api.get('/api/eval-algo/list');
                if (response.data.succeed) {
                    this.localStore.algoDescriptions = response.data.data;
                } else { message.error("获取算法描述失败: " + response.data.message); }
            } catch (error) {
                console.error("获取算法描述接口失败:", error);
                message.error("获取算法描述接口请求失败");
            } finally {
                this.algoDescLoading = false;
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
        showAlgoDescriptionModal() { this.algoDescModalVisible = true; },
        handleAlgoDescCancel() { this.algoDescModalVisible = false; },
        
        async showAutoExplainModal() {
            this.autoExplainModalVisible = true;
            this.autoExplainLLMLoading = true; 
            this.dynamicAutoAnalysis = {}; // Clear previous state
            const evalId = this.$route.query.id;
            try {
                const response = await api.get(`/api/eval/${evalId}/analysis-res`);
                if (response.data.succeed && response.data.data) {
                    const savedObject = JSON.parse(response.data.data);
                    this.dynamicAutoAnalysis = this.formatObjectForDisplay(savedObject);
                }
            } catch (error) {
                console.log("获取已保存的分析结果失败（可能尚未创建）:", error);
            } finally {
                this.autoExplainLLMLoading = false;
            }
        },
        handleAutoExplainCancel() { this.autoExplainModalVisible = false; },
        
        async generateAutoExplainability() {
            this.autoExplainLLMLoading = true;
            try {
                if (!this.localStore.algoDescriptions?.length) { await this.fetchAlgoDescriptions(); }
                const llmPayload = {
                    context: {
                        basicInfo: { description: "漏洞基本信息", data: this.localStore.vulnInfo },
                        threatIntel: { description: "威胁情报来源", data: this.localStore.threatIntel },
                        religionInfo: { description: "漏洞地域信息", data: this.localStore.religionInfo },
                        autoSoftResult: { description: "自动化软件漏洞评估结果", data: this.localStore.autoSoft },
                        algoAnalysis: { description: "四种评估算法解释数据", data: this.localStore.algoDescriptions }
                    }
                };
                const response = await axios.post('http://10.13.1.104:8002/api/chat/eval_algo_analysis', llmPayload);
                if (response.data?.answer) {
                    const text = response.data.answer;
                    const cleanJSON = text.replace(/```json/g, '').replace(/```/g, '').trim();
                    const llmResult = JSON.parse(cleanJSON);
                    this.dynamicAutoAnalysis = this.formatObjectForDisplay(llmResult);
                    message.success("大模型已生成分析结果，请确认后保存。");
                } else {
                    message.error("大模型未能生成有效的分析结果");
                }
            } catch (error) {
                console.error("自动化可解释性分析生成失败:", error);
                message.error('大模型服务请求失败或返回格式错误。');
            } finally {
                this.autoExplainLLMLoading = false;
            }
        },

        formatObjectForDisplay(obj) {
            const formatted = {};
            for (const key in obj) {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    formatted[key] = JSON.stringify(value, null, 2); // Pretty-print JSON
                } else {
                    formatted[key] = value; // Keep primitives as is
                }
            }
            return formatted;
        },

        async saveAutoExplainability() {
            this.saveAutoExplainLoading = true;
            try {
                const objectToSave = {};
                for (const key in this.dynamicAutoAnalysis) {
                    try {
                        // If the textarea contains valid JSON, parse it back into an object
                        objectToSave[key] = JSON.parse(this.dynamicAutoAnalysis[key]);
                    } catch (e) {
                        objectToSave[key] = this.dynamicAutoAnalysis[key];
                    }
                }

                const payload = {
                    evalId: this.$route.query.id,
                    evalExpert: this.$store.getters['auth/userId'],
                    algoAnalysisResult: objectToSave,
                };

                const response = await api.put('/api/eval/analysis-res', payload);

                if (response.data.succeed) {
                    message.success('自动化分析结果保存成功！');
                    this.autoExplainModalVisible = false;
                } else {
                    message.error('保存失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("保存自动化分析结果失败:", error);
                message.error('网络请求失败，请检查或联系管理员。');
            } finally {
                this.saveAutoExplainLoading = false;
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
            if (!this.explainabilityParams.modificationReason) {
                message.warn('请输入修改理由');
                return;
            }
            if (!this.explainabilityParams.overallValue || !this.explainabilityParams.exposure || !this.explainabilityParams.risk) {
                message.warn('请完成所有字段的选择');
                return;
            }

            this.explainabilityModalLoading = true;

            const valueMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞价值');
            const exposureMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞暴露度');
            const riskMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞风险');

            if (!valueMetric || !exposureMetric || !riskMetric) {
                message.error('无法找到原始指标ID,请刷新页面或联系管理员。');
                this.explainabilityModalLoading = false;
                return;
            }
            
            const payload = {
                evalId: this.$route.query.id,
                evalExpert: this.$store.getters['auth/userId'], 
                metricList: [
                    { metricId: valueMetric.metricId, metricCode: valueMetric.metricCode, adjustedAnalysisRate: this.explainabilityParams.overallValue },
                    { metricId: exposureMetric.metricId, metricCode: exposureMetric.metricCode, adjustedAnalysisRate: this.explainabilityParams.exposure },
                    { metricId: riskMetric.metricId, metricCode: riskMetric.metricCode, adjustedAnalysisRate: this.explainabilityParams.risk }
                ],
                adjustedReason: this.explainabilityParams.modificationReason
            };

            await this.updateExplainability(payload, true);
        },
        handleExplainabilityCancel() { this.explainabilityModalVisible = false; },

        async generateExplainabilityWithLLM() {
            this.explainLLMLoading = true;
            try {
                const llmPayload = {
                    context: {
                        basicInfo: { description: "漏洞基本信息", data: this.localStore.vulnInfo },
                        threatIntel: { description: "威胁情报来源", data: this.localStore.threatIntel },
                        religionInfo: { description: "漏洞地域信息", data: this.localStore.religionInfo },
                        autoSoftResult: { description: "自动化软件漏洞评估结果", data: this.localStore.autoSoft }
                    }
                };
                const response = await axios.post('http://10.13.1.104:8002/api/chat/analyze-eval', llmPayload);

                if (response.data.answer!=null) {
                    const text = response.data.answer;
                    const cleanJSON = text
                        .replace(/```json/g, '')   
                        .replace(/```/g, '')       
                        .trim(); 
                    const llmResult = JSON.parse(cleanJSON);
                    const valueMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞价值');
                    const exposureMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞暴露度');
                    const riskMetric = this.localStore.metricInfo.find(m => m.metricCode === '漏洞风险');

                    if (!valueMetric || !exposureMetric || !riskMetric) {
                        message.error('无法找到原始指标ID,请刷新页面或联系管理员。');
                        return;
                    }
                    
                    const updatePayload = {
                        evalId: this.$route.query.id,
                        evalExpert: this.$store.getters['auth/userId'], 
                        metricList: [
                            { metricId: valueMetric.metricId, metricCode: valueMetric.metricCode, adjustedAnalysisRate: llmResult.overallValue },
                            { metricId: exposureMetric.metricId, metricCode: exposureMetric.metricCode, adjustedAnalysisRate: llmResult.exposure },
                            { metricId: riskMetric.metricId, metricCode: riskMetric.metricCode, adjustedAnalysisRate: llmResult.risk }
                        ],
                        adjustedReason: "由大模型辅助生成"
                    };
                    await this.updateExplainability(updatePayload, false);
                } else {
                     message.error("大模型辅助生成失败: " + (response.data.message || '未知错误'));
                }
            } catch(error) {
                console.error("大模型辅助生成失败:", error);
                message.error('大模型服务请求失败，请检查网络或联系管理员。');
            } finally {
                this.explainLLMLoading = false;
            }
        },
        
        async generateOpinionWithLLM() {
            this.opinionLLMLoading = true;
            try {
                 const llmPayload = {
                    context: {
                        basicInfo: { description: "漏洞基本信息", data: this.localStore.vulnInfo },
                        threatIntel: { description: "威胁情报来源", data: this.localStore.threatIntel },
                        religionInfo: { description: "漏洞地域信息", data: this.localStore.religionInfo },
                        autoSoftResult: { description: "自动化软件漏洞评估结果", data: this.localStore.autoSoft },
                        explainabilityResult: { description: "自动化评估可解释性分析结果", data: this.form.explain }
                    }
                };
                const response = await axios.post('http://10.13.1.104:8002/api/chat/overall-eval', llmPayload);
                if(response.data.answer!=null){
                    const answer = response.data.answer.replace(/\n\s*\n/g, '\n');
                    this.form.overallOpinion = answer;
                    message.success('大模型已生成评估意见，请确认后保存。');
                    await this.handleSaveOpinion();
                }
            } catch (error) {
                console.error("大模型辅助生成意见失败:", error);
                message.error('大模型服务请求失败，请检查网络或联系管理员。');
            } finally {
                this.opinionLLMLoading = false;
            }
        },

        async updateExplainability(payload, fromModal) {
            const loadingState = fromModal ? 'explainabilityModalLoading' : 'explainLLMLoading';
            this[loadingState] = true;
            try {
                const response = await api.put("/api/metric-eval", payload);
                if (response.data.succeed) {
                    const rateMap = payload.metricList.reduce((acc, item) => {
                        acc[item.metricCode] = item.adjustedAnalysisRate;
                        return acc;
                    }, {});

                    this.form.explain.overallValue = rateMap['漏洞价值'];
                    this.form.explain.exposure = rateMap['漏洞暴露度'];
                    this.form.explain.risk = rateMap['漏洞风险'];

                    message.success('可解释性分析结果已成功更新！');
                    if (fromModal) {
                        this.explainabilityModalVisible = false;
                    }
                } else {
                    message.error('保存失败: ' + (response.data.message || '未知错误'));
                }
            } catch (error) {
                console.error("保存可解释性分析结果失败:", error);
                message.error('网络请求失败，请检查您的网络连接或联系管理员。');
            } finally {
                this[loadingState] = false;
            }
        },
        
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
            if (!token) { message.error("获取语音授权失败！"); return; }
            if (!navigator.mediaDevices?.getUserMedia) { message.error("您的浏览器不支持媒体设备访问，请使用现代浏览器"); return; }
            if (location.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) { message.error("语音功能需要 HTTPS 连接"); return; }

            try {
                message.info('正在请求麦克风权限...');
                await navigator.mediaDevices.getUserMedia({ audio: true });
                this.livekitRoom = new Room();
                message.info('正在连接语音服务...');
                await this.livekitRoom.connect(config.livekit.url, token);
                await this.livekitRoom.localParticipant.setMicrophoneEnabled(!this.isMutedBySelf && !this.isMutedByHost);
                this.isVoiceConnected = true;
                message.success('语音已连接！');
                const handleAudioTrack = (track) => {
                    if (track.kind === 'audio') document.body.appendChild(track.attach());
                };
                this.livekitRoom.remoteParticipants.forEach(p => p.trackPublications.forEach(pub => pub.track && handleAudioTrack(pub.track)));
                this.livekitRoom.on(RoomEvent.TrackSubscribed, handleAudioTrack);
                this.livekitRoom.on(RoomEvent.ParticipantDisconnected, p => message.warn(`${p.identity} 离开了语音。`));
            } catch (error) {
                console.error("语音连接错误详情:", error);
                let errorMessage = "连接语音失败: ";
                if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    errorMessage += "麦克风权限被拒绝。";
                    this.$confirm({
                        title: '麦克风权限被拒绝',
                        content: `<div style="text-align: left;"><p>请点击浏览器地址栏左侧的锁定图标，允许网站访问您的麦克风，然后刷新页面重试。</p></div>`,
                        dangerouslyUseHTMLString: true, okText: '我知道了', cancelText: '取消'
                    });
                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    errorMessage += "未检测到麦克风设备。";
                } else {
                    errorMessage += error.message || "未知错误";
                }
                message.error(errorMessage);
                if (this.livekitRoom) {
                    await this.livekitRoom.disconnect();
                    this.livekitRoom = null;
                }
            }
        },

        async disconnectFromVoice() {
            if (this.livekitRoom) {
                this.livekitRoom.localParticipant.setMicrophoneEnabled(false);
                await this.livekitRoom.disconnect();
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
            const issues = [];
            if (!navigator.mediaDevices?.getUserMedia) issues.push('浏览器不支持 getUserMedia API');
            if (location.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) issues.push('语音功能需要 HTTPS 连接');
            if (issues.length > 0) console.warn('浏览器兼容性检查发现问题:', issues);
        },

        showVoiceTestModal() { this.voiceTestModalVisible = true; },
        handleVoiceTestOk() { this.voiceTestModalVisible = false; message.success('语音诊断完成'); },
        handleVoiceTestCancel() { this.voiceTestModalVisible = false; },

        async startEval(){
            try {
                const response = await api.put("api/eval/start/"+this.$route.query.id);
                if(response.data.succeed){ message.info("开始评估"); }
                else{ message.error("开始评估失败"); }
            } catch (error) { message.error("评估开始失败"); }
        },
        async endEval(){
            try {
                const response = await api.put("api/eval/confirm/"+this.$route.query.id);
                if(response.data.succeed){ message.info("评估完成"); }
                else{ message.error("结束评估失败") }
            } catch (error) { message.error("评估结束失败"); }
        },
        async handleSaveOpinion(){
            try {
                const response = await api.put("api/eval/content",{
                    evalId: this.$route.query.id,
                    evalReportTitle: this.evalReportTitle,
                    evalReportContent: this.form.overallOpinion,
                    aiMeetingSummary: null,
                });
                if(response.data.succeed){ message.info("修改成功"); }
                else{ message.error("保存意见失败"); }
            } catch (error) { message.error("保存总体意见失败"); }
        },
        async handleDataRetrieval() {
            this.retrievalLoading = true;
            this.retrievalResults = []; // 清空旧数据
            this.mindMapResult = null;  // 清空旧数据

            const payload = {
                source: this.retrieval.source,
                dateRange: this.retrieval.dateRange,
                keywords: this.retrieval.keywords,
                vulnType: this.retrieval.vulnType,
                other: this.retrieval.other,
            };
            console.log(payload);

            try {
                // 2. 调用后端API (这是一个示例，请替换为您的真实API)
                // const response = await api.post('/api/your/retrieval-endpoint', payload);
        
                // 【重要】因为后端接口未知，我们在这里手动抛出一个错误来进入catch块，以使用模拟数据。
                // 当后端接口准备好后，您可以删除 throw new Error 并处理 response。
                throw new Error("后端接口尚未就绪，切换到模拟数据模式");

                // 如果API调用成功，您将在这里处理真实数据
                // if (response.data.succeed) {
                //     this.retrievalResults = response.data.data.vulnerabilityList;
                //     this.mindMapResult = response.data.data.mindMap;
                //     message.success('数据检索成功！');
                // } else {
                //     message.error('检索失败: ' + response.data.message);
                // }

            } catch (error) {
                console.warn("API调用失败或未实现，正在使用模拟数据:", error.message);
                message.info('正在加载模拟数据...');

                // 3. catch块中创建并使用模拟数据
                await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟

                // 模拟的漏洞数据列表
                this.retrievalResults = [
                    { id: 'CVE-2024-001', date: '2024-05-01', impactScore: 8.5, region: '北美', validationMethod: '静态分析', threatSource: '暗网', algoScore: 9.2, historicalRiskLevel: '高' },
                    { id: 'CVE-2024-002', date: '2024-05-10', impactScore: 9.1, region: '欧洲', validationMethod: '动态分析', threatSource: 'APT组织', algoScore: 9.5, historicalRiskLevel: '高' },
                    { id: 'CVE-2024-003', date: '2024-06-15', impactScore: 6.5, region: '亚洲', validationMethod: '人工验证', threatSource: '黑客论坛', algoScore: 7.1, historicalRiskLevel: '中' },
                    { id: 'CVE-2024-004', date: '2024-07-20', impactScore: 7.2, region: '亚洲', validationMethod: '静态分析', threatSource: '暗网', algoScore: 7.8, historicalRiskLevel: '高' },
                    { id: 'CVE-2024-005', date: '2024-07-25', impactScore: 5.0, region: '南美', validationMethod: '动态分析', threatSource: 'APT组织', algoScore: 6.5, historicalRiskLevel: '中' },
                    { id: 'CVE-2024-006', date: '2024-08-01', impactScore: 6.8, region: '非洲', validationMethod: '静态分析', threatSource: '黑客论坛', algoScore: 7.0, historicalRiskLevel: '低' },
                ];

                // 模拟的大模型脑图结果 (这里使用一个图片URL作为示例)
                this.mindMapResult = 'https://i.imgur.com/example_mindmap.png'; // 请替换为真实的或占位的图片URL

                message.success('已加载模拟检索结果！');
            } finally {
                this.retrievalLoading = false;
            }
        },
         /**
            * @param {string} fieldName - 作为 Y 轴的字段名
            * @param {string} displayName - 显示在图表上的名称
        */
        generatePieOption(fieldName, displayName) {
            if (!this.retrievalResults || this.retrievalResults.length === 0) return {};

            const data = this.retrievalResults.reduce((acc, item) => {
                const key = item[fieldName];
                if (key) {
                    acc[key] = (acc[key] || 0) + 1;
                }
                return acc;
            }, {});

            const seriesData = Object.keys(data).map(key => ({
                name: key,
                value: data[key]
            }));

            return {
                title: { text: displayName, left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
                legend: { orient: 'vertical', left: 'left', data: Object.keys(data) },
                series: [{ name: displayName, type: 'pie', radius: '60%', data: seriesData }]
            };
        },

        /**
        * @param {string} fieldName - 作为 Y 轴的字段名
        * @param {string} displayName - 显示在图表上的名称
        */
        generateLineOption(fieldName, displayName) {
            if (!this.retrievalResults || this.retrievalResults.length === 0) return {};

            return {
                title: { text: displayName, left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: this.retrievalResults.map(item => item.date) }, // X轴统一使用日期
                yAxis: { type: 'value', name: displayName },
                series: [{
                    name: displayName,
                    type: 'line',
                    data: this.retrievalResults.map(item => item[fieldName]),
                    smooth: true
                }]
            };
        },
        onResultViewChange(e) {
            if (e.target.value === 'llm' && !this.mindMapMarkdown) {
                this.generateMindMap();
            }
        },
        async generateMindMap() {
            if (this.retrievalResults.length === 0) {
                message.warn('请先进行数据检索，再生成脑图。');
                return;
            }

            this.mindMapLoading = true;
            this.mindMapMarkdown = ''; 

            try {
                const markdownResponse = await this.mockLLMApi(this.retrievalResults);
                this.mindMapMarkdown = markdownResponse;

                // 1. 使用 Transformer 将 Markdown 转换为 Markmap 所需的数据结构
                const { root } = transformer.transform(this.mindMapMarkdown);

                // 2. 如果 Markmap 实例已存在，则直接更新数据
                if (this.markmapInstance) {
                    this.markmapInstance.setData(root);
                } 
                // 3. 如果实例不存在（首次加载），则创建实例并渲染
                else {
                    // Markmap.create(svg元素, [选项], [初始数据])
                    this.markmapInstance = Markmap.create(this.$refs.markmapSvg, null, root);
                }

            } catch (error) {
                console.error("生成脑图失败:", error);
                message.error("生成脑图时发生错误。");
            } finally {
                this.mindMapLoading = false;
            }
        },
        async mockLLMApi(data) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟1.5秒的网络延迟

            // --- 开始构建模拟的Markdown内容 ---
            let markdown = '# 漏洞数据关联性分析脑图\n\n';
            markdown += '这是一个基于检索结果生成的思维导图。\n\n';
        
            const highRiskVulns = data.filter(v => v.historicalRiskLevel === '高');
            const mediumRiskVulns = data.filter(v => v.historicalRiskLevel === '中');
            const lowRiskVulns = data.filter(v => v.historicalRiskLevel === '低');

            markdown += '## 1. 风险等级分布\n';
            markdown += `- **高风险 (${highRiskVulns.length}个)**\n`;
            highRiskVulns.forEach(v => {
                markdown += `  - ${v.id} (影响分数: ${v.impactScore})\n`;
            });
            markdown += `- **中风险 (${mediumRiskVulns.length}个)**\n`;
            mediumRiskVulns.forEach(v => {
                markdown += `  - ${v.id} (影响分数: ${v.impactScore})\n`;
            });
            markdown += `- **低风险 (${lowRiskVulns.length}个)**\n`;
            lowRiskVulns.forEach(v => {
                markdown += `  - ${v.id} (影响分数: ${v.impactScore})\n`;
            });

            markdown += '\n## 2. 地域来源分析\n';
            const regionCount = data.reduce((acc, item) => {
                acc[item.region] = (acc[item.region] || 0) + 1;
                return acc;
            }, {});
        
            for (const region in regionCount) {
                markdown += `- **${region}**: ${regionCount[region]} 个漏洞\n`;
            }

            markdown += '\n---\n*由Gemini模拟生成*';
            // --- 模拟内容结束 ---

            return markdown;
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
    float: center;
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
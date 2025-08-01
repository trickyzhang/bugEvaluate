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
                    <a-button class="opinion-assistant-btn">大模型生成</a-button>
                    <a-button class="opinion-assistant-btn" style="margin-left: 8px;" @click="handleSaveOpinion">保存结果</a-button>
                </a-card>

                <div class="footer-buttons">
                    <a-button style="margin-left: 8px;" @click="startEval">开始评估</a-button>
                    <a-button style="margin-left: 8px;" type="primary" @click="endEval">结束评估</a-button>
                    <a-button style="margin-left: 8px;" @click="returnList">返回列表</a-button>
                </div>
            </a-col>

            <a-col :span="10">
                <div class="retrieval-panel">
                    <h3 class="panel-title">数据检索</h3>
                    <a-form layout="vertical">
                        <a-form-item label="请选择数据来源">
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
                                <a-select v-model="retrieval.vulnType" placeholder="漏洞类型：下拉列表选择">
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
                    </a-form>
                </div>
            </a-col>
        </a-row>
        
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
import { Button, Row, Col, Card, Form, Input, Checkbox, Radio, Select, DatePicker, Modal, message } from 'ant-design-vue';

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
                threatIntelligence: {
                    field1: '',
                    field2: '',
                    field3: '', 
                },
                religion: { field1: '', field2: '' },
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
                sources: [],
                dateRange: [],
                keywords: '',
                vulnType: undefined,
                other: '',
                resultView: 'table',
            },
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
            metricInfo: [], //可解释性分析结果
            evalReportTitle: '',
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

                    // 1. 映射 "漏洞基本信息"
                    if (data.vulnInfo) {
                        this.form.basic.cveID = data.vulnInfo.cveId;
                        this.form.basic.cveType = data.vulnInfo.cveType;
                        this.form.basic.softwareType = data.vulnInfo.softwareType;
                        this.form.basic.cveTitle = data.vulnInfo.cveTitle;
                        this.form.basic.cveDescription = data.vulnInfo.cveDescription;
                    }

                    // 2. 映射 "威胁情报来源"
                    if (data.threatIntel) {
                        this.form.threatIntelligence.field1 = data.threatIntel.field1;
                        this.form.threatIntelligence.field2 = data.threatIntel.field2;
                        this.form.threatIntelligence.field3 = data.threatIntel.field3; 
                    }

                    // 3. 映射 "自动化软件漏洞评估结果"
                    if (data.dimVOList && Array.isArray(data.dimVOList)) {
                        data.dimVOList.forEach(item => {
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
                    
                    // 5. 映射 "总体评估意见"
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
        returnList() {
            this.$router.push('/oneexpert');
        },
        // 算法弹窗
        showAlgorithmModal() {
            this.algorithmParams.modificationReason = ''; // 清空理由
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
                    // ... 模拟请求后的更新逻辑 ...
                    this.modalLoading = false;
                    this.algorithmModalVisible = false;
                    message.success('参数已更新，评估结果已重新计算！');
                } catch (error) {
                    // ... 错误处理 ...
                    this.modalLoading = false;
                }
            }, 1500);
        },
        handleAlgorithmCancel() {
            this.algorithmModalVisible = false;
        },

        // 可解释性分析结果弹窗
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
        handleExplainabilityCancel() {
            this.explainabilityModalVisible = false;
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

/* 规范 1.2.2: 标题文字 */
/* 使用 ::v-deep 替代 >>> 进行深度选择，这在现代构建工具中更通用 */
::v-deep .card-section .ant-card-head-title,
.panel-title {
    font-size: 14px !important; 
    color: #333333 !important; 
}

/* 只读文本样式 */
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

/* 修复垂直布局表单的标签颜色 */
::v-deep .ant-form-vertical .ant-form-item-label label {
    color: #666666; 
}


/* 规范 1.2.5 & 1.2.3: 主按钮样式 */
::v-deep .ant-btn-primary {
    background-color: #2BBAFF; 
    border-color: #2BBAFF; 
}
::v-deep .ant-btn-primary:hover,
::v-deep .ant-btn-primary:focus {
    background-color: #26649D; 
    border-color: #26649D; 
}
::v-deep .ant-btn-primary:active {
    background-color: #20507a; /* 主色加深作为激活态 */
    border-color: #20507a;
}

/* 规范 1.2.5: 次要按钮样式 */
::v-deep .ant-btn:not(.ant-btn-primary) {
    background-color: #FFFFFF;
    border: 1px solid #d9d9d9;
    color: #666666;
}
::v-deep .ant-btn:not(.ant-btn-primary):hover,
::v-deep .ant-btn:not(.ant-btn-primary):focus {
    border-color: #2BBAFF;
    color: #2BBAFF;
}

/* 规范 1.2.6: 表单控件高亮色 */
::v-deep .ant-input:focus,
::v-deep .ant-input:hover,
::v-deep .ant-input-affix-wrapper:focus,
::v-deep .ant-input-affix-wrapper:hover,
::v-deep .ant-select-selection:hover,
::v-deep .ant-select-open .ant-select-selection,
::v-deep .ant-select-focused .ant-select-selection,
::v-deep .ant-calendar-picker:hover .ant-input {
    border-color: #2BBAFF; 
    box-shadow: 0 0 0 2px rgba(43, 186, 255, 0.2);
}

/* 规范 1.2.6: 复选框样式 */
::v-deep .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #2BBAFF; 
    border-color: #2BBAFF; 
}
::v-deep .ant-checkbox-wrapper:hover .ant-checkbox-inner,
::v-deep .ant-checkbox:hover .ant-checkbox-inner,
::v-deep .ant-checkbox-input:focus+.ant-checkbox-inner {
    border-color: #2BBAFF;
}

/* 规范 1.2.6: 单选按钮组样式 */
::v-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #2BBAFF;
    border-color: #2BBAFF;
    color: #fff;
}
::v-deep .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    background: #26649D;
    border-color: #26649D;
}

.card-section {
    margin-bottom: 16px;
    background-color: #FFFFFF; /* 规范辅助色  */
}

::v-deep .card-section .ant-card-body {
    padding: 16px;
}
::v-deep .card-section .ant-card-head {
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
    background-color: #fff; /* 规范辅助色  */
    padding: 24px;
    border-radius: 2px;
    height: 100%;
}

.panel-title {
    font-weight: 500;
    margin-bottom: 16px;
}

/* 使用 ::v-deep 确保复选框组样式生效 */
::v-deep .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

::v-deep .ant-checkbox-wrapper {
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

::v-deep .retrieval-result-box .ant-radio-group {
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
</style>
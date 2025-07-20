<template>
    <div class="vulnerability-assessment-container">
        <a-row :gutter="16">
            <a-col :span="14">
                
                <a-card title="漏洞基本信息" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="字段1" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.field1 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段2" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.field2 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段N" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.basic.fieldN }}</span>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>

                <a-card title="威胁情报来源" :bordered="false" class="card-section">
                    <a-form>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="字段1" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.threatIntelligence.field1 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段2" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.threatIntelligence.field2 }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段N" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
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
                                <a-form-item label="字段1" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <span class="ant-form-text">{{ form.autoSoft.field1 || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段3" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                     <span class="ant-form-text">{{ form.autoSoft.field3 || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段2" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                     <span class="ant-form-text">{{ form.autoSoft.field2 || '-' }}</span>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="字段4" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                     <span class="ant-form-text">{{ form.autoSoft.field4 || '-' }}</span>
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
                                    <a-input v-model="form.explain.overallValue" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="暴露度" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <a-input v-model="form.explain.exposure" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="漏洞风险" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                                    <a-input v-model="form.explain.risk" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>

                <a-card title="总体评估意见" :bordered="false" class="card-section">
                    <a-textarea v-model="form.overallOpinion" placeholder="点击输入评估意见"
                        :auto-size="{ minRows: 4, maxRows: 6 }" />
                    <a-button class="opinion-assistant-btn">大模型辅助生成</a-button>
                </a-card>

                <div class="footer-buttons">
                    <a-button type="primary">保存结果</a-button>
                    <a-button style="margin-left: 8px;" @click="handleClick2">返回列表</a-button>
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
            </a-form>
        </a-modal>

    </div>
</template>

<script>
import { Button, Row, Col, Card, Form, Input, Checkbox, Radio, Select, DatePicker, Modal, message } from 'ant-design-vue';

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
    methods: {
        handleClick2() {
            this.$router.push('/oneexpert');
        },
        showAlgorithmModal() {
            // 在实际应用中，您可能需要从服务器获取当前的算法参数来填充弹窗
            // 这里我们假设 `this.algorithmParams` 始终保存着最新的参数状态
            this.algorithmModalVisible = true;
        },
        handleAlgorithmSave() {
            this.modalLoading = true;
            console.log("正在将以下参数发送到服务器:", this.algorithmParams);

            // --- 模拟发送参数到服务器并等待计算结果的异步过程 ---
            // 在真实场景中，这里会是一个 axios.post 或其他API请求
            setTimeout(() => {
                try {
                    // --- 模拟从服务器接收到的新评估结果 ---
                    const newResults = {
                        field1: `结果(基于 ${this.algorithmParams.paramA})`,
                        field2: `结果(基于 ${this.algorithmParams.paramB})`,
                        field3: `结果(基于 ${this.algorithmParams.paramC})`,
                        field4: `结果(基于 ${this.algorithmParams.paramD})`,
                    };

                    // 更新主页面上展示的评估结果
                    this.form.autoSoft = newResults;
                    
                    message.success('参数已更新，评估结果已重新计算！');
                    this.modalLoading = false;
                    this.algorithmModalVisible = false;

                } catch (error) {
                    console.error("计算失败:", error);
                    message.error('计算失败，请重试或联系管理员。');
                    this.modalLoading = false;
                }
            }, 1500); // 模拟1.5秒的网络和计算延迟
        },
        handleAlgorithmCancel() {
            this.algorithmModalVisible = false;
        }
    },
    data() {
        return {
            form: {
                basic: {
                    field1: '远程攻击',
                    field2: '信息泄露',
                    fieldN: '需要14工作日修复',
                },
                // 这是展示给用户的【评估结果】
                autoSoft: {
                    field1: '初始结果-A',
                    field2: '初始结果-B',
                    field3: '初始结果-C',
                    field4: '初始结果-D',
                },
                religion:{
                    field1:'',
                    filed2:'',
                },
                explain: {
                    overallValue: '',
                    exposure: '',
                    risk: '', 
                },
                overallOpinion: '',
                threatIntelligence: {
                    field1:'来源于西北工业大学课题组分析',
                    field2:'软件学院承接',
                    fieldN:'教授团队',
                }, 
            },
            retrieval: {
                sources: [],
                dateRange: [],
                keywords: '',
                vulnType: undefined,
                other: '',
                resultView: 'table',
            },
            algorithmModalVisible: false,
            modalLoading: false,
            // 这是用户在弹窗中编辑的【算法参数】
            algorithmParams: {
                paramA: '默认值1',
                paramB: '默认值2',
                paramC: '默认值3',
                paramD: '默认值4',
            }
        }
    }
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
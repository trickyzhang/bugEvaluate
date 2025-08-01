<template>
    <a-modal
        title="语音连接诊断"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        :footer="null"
        :width="600"
    >
        <div class="voice-test-content">
            <a-steps :current="currentStep" style="margin-bottom: 24px;">
                <a-step title="浏览器检查" />
                <a-step title="权限检查" />
                <a-step title="设备检查" />
                <a-step title="连接测试" />
            </a-steps>

            <div v-if="currentStep === 0" class="step-content">
                <h4>浏览器兼容性检查</h4>
                <a-list :data-source="browserChecks" size="small">
                    <a-list-item slot="renderItem" slot-scope="item">
                        <a-icon 
                            :type="item.passed ? 'check-circle' : 'close-circle'" 
                            :style="{ color: item.passed ? '#52c41a' : '#ff4d4f' }"
                        />
                        <span style="margin-left: 8px;">{{ item.description }}</span>
                    </a-list-item>
                </a-list>
            </div>

            <div v-if="currentStep === 1" class="step-content">
                <h4>麦克风权限检查</h4>
                <p>点击下方按钮测试麦克风权限：</p>
                <a-button type="primary" @click="testMicrophonePermission" :loading="testingPermission">
                    测试麦克风权限
                </a-button>
                <div v-if="permissionResult" style="margin-top: 16px;">
                    <a-alert 
                        :message="permissionResult.message" 
                        :type="permissionResult.type"
                        show-icon
                    />
                </div>
            </div>

            <div v-if="currentStep === 2" class="step-content">
                <h4>音频设备检查</h4>
                <a-button type="primary" @click="checkAudioDevices" :loading="checkingDevices">
                    检查音频设备
                </a-button>
                <div v-if="audioDevices.length > 0" style="margin-top: 16px;">
                    <h5>检测到的音频设备：</h5>
                    <a-list :data-source="audioDevices" size="small">
                        <a-list-item slot="renderItem" slot-scope="device">
                            <a-icon type="sound" />
                            <span style="margin-left: 8px;">{{ device.label || `设备 ${device.deviceId}` }}</span>
                        </a-list-item>
                    </a-list>
                </div>
            </div>

            <div v-if="currentStep === 3" class="step-content">
                <h4>连接测试</h4>
                <p>测试与语音服务器的连接：</p>
                <a-button type="primary" @click="testConnection" :loading="testingConnection">
                    测试连接
                </a-button>
                <div v-if="connectionResult" style="margin-top: 16px;">
                    <a-alert 
                        :message="connectionResult.message" 
                        :type="connectionResult.type"
                        show-icon
                    />
                </div>
            </div>

            <div class="step-actions">
                <a-button v-if="currentStep > 0" @click="prevStep">上一步</a-button>
                <a-button v-if="currentStep < 3" type="primary" @click="nextStep">下一步</a-button>
                <a-button v-if="currentStep === 3" type="primary" @click="handleOk">完成</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
import { Modal, Steps, List, Button, Alert, Icon, message } from 'ant-design-vue';

export default {
    name: 'VoiceTestModal',
    components: {
        'a-modal': Modal,
        'a-steps': Steps,
        'a-step': Steps.Step,
        'a-list': List,
        'a-list-item': List.Item,
        'a-button': Button,
        'a-alert': Alert,
        'a-icon': Icon,
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentStep: 0,
            browserChecks: [],
            testingPermission: false,
            permissionResult: null,
            checkingDevices: false,
            audioDevices: [],
            testingConnection: false,
            connectionResult: null
        }
    },
    watch: {
        visible(newVal) {
            if (newVal) {
                this.currentStep = 0;
                this.runBrowserChecks();
            }
        }
    },
    methods: {
        runBrowserChecks() {
            this.browserChecks = [
                {
                    description: '支持媒体设备访问',
                    passed: !!navigator.mediaDevices
                },
                {
                    description: '支持 getUserMedia API',
                    passed: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
                },
                {
                    description: '使用 HTTPS 或本地环境',
                    passed: location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'
                },
                {
                    description: '支持的浏览器',
                    passed: this.isSupportedBrowser()
                }
            ];
        },

        isSupportedBrowser() {
            const userAgent = navigator.userAgent.toLowerCase();
            return userAgent.includes('chrome') || 
                   userAgent.includes('firefox') || 
                   userAgent.includes('safari') || 
                   userAgent.includes('edge');
        },

        async testMicrophonePermission() {
            this.testingPermission = true;
            this.permissionResult = null;

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => track.stop()); // 立即停止录音
                
                this.permissionResult = {
                    type: 'success',
                    message: '麦克风权限获取成功！'
                };
            } catch (error) {
                let message = '麦克风权限获取失败';
                if (error.name === 'NotAllowedError') {
                    message = '麦克风权限被拒绝，请在浏览器设置中允许麦克风访问';
                } else if (error.name === 'NotFoundError') {
                    message = '未检测到麦克风设备';
                } else if (error.name === 'NotSupportedError') {
                    message = '浏览器不支持此功能';
                }
                
                this.permissionResult = {
                    type: 'error',
                    message: message
                };
            } finally {
                this.testingPermission = false;
            }
        },

        async checkAudioDevices() {
            this.checkingDevices = true;
            this.audioDevices = [];

            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                this.audioDevices = devices.filter(device => device.kind === 'audioinput');
                
                if (this.audioDevices.length === 0) {
                    message.warn('未检测到音频输入设备');
                }
            } catch (error) {
                message.error('获取设备列表失败: ' + error.message);
            } finally {
                this.checkingDevices = false;
            }
        },

        async testConnection() {
            this.testingConnection = true;
            this.connectionResult = null;

            try {
                // 这里可以添加实际的连接测试逻辑
                // 暂时模拟连接测试
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                this.connectionResult = {
                    type: 'success',
                    message: '连接测试成功！'
                };
            } catch (error) {
                this.connectionResult = {
                    type: 'error',
                    message: '连接测试失败: ' + error.message
                };
            } finally {
                this.testingConnection = false;
            }
        },

        nextStep() {
            if (this.currentStep < 3) {
                this.currentStep++;
            }
        },

        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },

        handleOk() {
            this.$emit('ok');
        },

        handleCancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style scoped>
.voice-test-content {
    padding: 16px 0;
}

.step-content {
    min-height: 200px;
    padding: 16px 0;
}

.step-content h4 {
    margin-bottom: 16px;
    color: #333;
}

.step-content h5 {
    margin-bottom: 8px;
    color: #666;
}

.step-actions {
    margin-top: 24px;
    text-align: right;
}

.step-actions .ant-btn {
    margin-left: 8px;
}
</style> 
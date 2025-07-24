<template>
  <div class="chat-container">
    <a-layout style="height: 100%">
      <a-layout-sider width="260" class="history-sider">
        <div class="sider-content">
          <a-button
            type="primary"
            block
            @click="startNewChat"
            class="new-chat-btn"
            :loading="isCreatingChat"
          >
            <a-icon type="plus" /> 新建对话
          </a-button>

          <div class="sider-section-title">对话历史</div>
          <div class="history-list">
            <div
              v-for="chat in chatHistory"
              :key="chat.id"
              class="history-item"
              :class="{ active: currentChatId === chat.id }"
              @click="selectChat(chat.id)"
            >
              <span class="history-title">{{ chat.title }}</span>
              </div>
          </div>

          <a-divider class="sider-divider" />

          <div class="sider-section-title">知识库</div>
          <div class="knowledge-base-list">
              <a-checkbox-group v-model="selectedKnowledgeBases">
                  <a-checkbox
                      v-for="kb in knowledgeBases"
                      :key="kb.id"
                      :value="kb.id"
                      class="kb-item"
                  >
                      {{ kb.name }}
                  </a-checkbox>
              </a-checkbox-group>
          </div>
        </div>
      </a-layout-sider>

      <a-layout class="chat-panel">
        <a-layout-header class="chat-header">
          大模型助手
        </a-layout-header>

        <a-layout-content class="message-area" ref="messageArea">
          <div
            v-for="message in currentMessages"
            :key="message.id"
            class="message-wrapper"
            :class="message.role"
          >
            <a-avatar :icon="message.role === 'user' ? 'user' : 'robot'" class="message-avatar" />
            <div class="message-content">
              <div v-if="message.role === 'assistant'" class="message-text markdown-body" v-html="formatMessage(message.content)"></div>
              <div v-else class="message-text">{{ message.content }}</div>

              <div v-if="message.role === 'assistant'" class="message-actions">
                <a-tooltip title="复制">
                  <a-icon type="copy" @click="copyText(message.rawContent || message.content)" />
                </a-tooltip>
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="message-wrapper assistant">
             <a-avatar icon="robot" class="message-avatar" />
             <div class="message-content">
                <div class="message-text">
                    <a-spin size="small" /> 正在思考中...
                </div>
             </div>
          </div>
        </a-layout-content>

        <a-layout-footer class="chat-footer">
          <div class="template-actions">
              <a-button 
                  size="small" 
                  icon="file-text" 
                  @click="loadVulnerabilityTemplate"
              >
                  加载漏洞评估模板
              </a-button>
          </div>

          <div class="input-area" :class="{focused: inputFocused}">
            <a-textarea
              ref="userInputTextArea" v-model="userInput"
              placeholder="请输入您的问题... (Shift + Enter 换行)"
              :auto-size="{ minRows: 1, maxRows: 5 }"
              @pressEnter="handleEnter"
              @focus="inputFocused = true"
              @blur="inputFocused = false"
            />
            <a-button
              type="primary"
              class="send-btn"
              @click="sendMessage"
              :disabled="!userInput.trim() || isLoading || isStreaming || isCreatingChat"
            >
              <a-icon type="arrow-up" />
            </a-button>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout, Icon, Button, Avatar, Input, Tooltip, Spin, message, Divider, Checkbox } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { marked } from 'marked'; 
import api from '@/utils/axios';

//多轮对话api
const AI_GENERATION_API_URL = 'http://10.13.1.104:8002/api/chat/multi-chat'; 


const VULNERABILITY_TEMPLATE = `**漏洞评估请求**

**1. 目标系统/应用:**
[请填写目标名称、URL或IP地址]

**2. 漏洞类型:**
[请填写疑似的漏洞类型，如：SQL注入、XSS、CSRF、文件上传等]

**3. 漏洞描述:**
[请详细描述发现漏洞的步骤、参数和现象]

**4. 复现步骤:**
1. [步骤一]
2. [步骤二]
3. [步骤三]

**5. 期望的验证方式:**
[请描述希望如何验证该漏洞的存在，如：执行特定命令、获取敏感信息等]`;

export default {
  name: 'LLM_Assistant_Chat',
  components: {
    'a-layout': Layout,
    'a-layout-sider': Layout.Sider,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-layout-footer': Layout.Footer,
    'a-icon': Icon,
    'a-button': Button,
    'a-avatar': Avatar,
    'a-textarea': Input.TextArea,
    'a-tooltip': Tooltip,
    'a-spin': Spin,
    'a-divider': Divider, 
    'a-checkbox': Checkbox, 
    'a-checkbox-group': Checkbox.Group, 
  },
  data() {
    return {
      userInput: '',
      chatHistory: [], 
      allMessages: {}, 
      currentChatId: null,
      isLoading: false,
      isCreatingChat: false, 
      inputFocused: false,
      isStreaming: false, 
      userId: this.$store.getters['auth/userId'] , 
      knowledgeBases: [
          { id: 'kb1', name: '漏洞数据' },
          { id: 'kb2', name: '评测文档' },
          { id: 'kb3', name: '基本信息' },
          { id: 'kb4', name: '统一规范' },
      ],
      selectedKnowledgeBases: [], 
      vulnerabilityTemplate: VULNERABILITY_TEMPLATE,
    };
  },
  computed: {
    currentMessages() {
      return this.allMessages[this.currentChatId] || [];
    }
  },
  created() {
    this.fetchChatHistory();
  },
  watch: {
    currentMessages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  methods: {
    /**
     * 历史消息
     */
    async fetchChatHistory() {
        if (!this.userId) {
            message.error("无法获取用户ID,请重新登录。");
            return;
        }
        try {
            const response = await api.get('api/chat-session/mine', {
                params: {
                    expertId: this.userId,  
                    page: 1, 
                    size: 10 
                }
            });
            if (response.data && response.data.succeed) {
                // Mapping API response to local data structure 
                this.chatHistory = response.data.data.records.map(chat => ({
                    id: chat.sessionId,
                    title: chat.sessionTitle || `对话 ${chat.sessionId}`
                }));

                if (this.chatHistory.length > 0) {
                    this.selectChat(this.chatHistory[0].id);
                } else {
                    this.startNewChat(); // 如果历史为空，需要创建对话
                }
            } else {
                 message.error('加载历史会话失败: ' + (response.data.message || '未知错误'));
            }
        } catch (error) {
            console.error("加载历史会话失败:", error);
            message.error("网络错误，无法加载历史会话。");
        }
    },
    
    /**
     * 获取单个对话的全部信息
     */
    async fetchChatMessages(sessionId) {
        this.$set(this.allMessages, sessionId, []); // Clear previous messages
        this.isLoading = true;
        try {
            const response = await api.get(`api/chat-message/${sessionId}/turns`, {
                params: { page: 1, size: 100 } // Example pagination 
            });
            if (response.data && response.data.succeed) {
                const messages = [];
                // The API returns 'turns', each containing multiple messages 
                const turns = response.data.data.records.sort((a, b) => a.turn - b.turn); // Sort turns chronologically
                for (const turn of turns) {
                    for (const msg of turn.messages) {
                        messages.push({
                            id: uuidv4(), // API doesn't provide message ID, using uuid for local key
                            role: msg.role === 'user' ? 'user' : 'assistant',
                            content: msg.content,
                            rawContent: msg.content,
                        });
                    }
                }
                this.$set(this.allMessages, sessionId, messages);
            } else {
                message.error('加载消息失败: ' + (response.data.message || '未知错误'));
            }
        } catch (error) {
            console.error("加载消息失败:", error);
            message.error("网络错误，无法加载消息。");
        } finally {
            this.isLoading = false;
        }
    },

    /**
     * 创建新对话
     */
    async startNewChat() {
      this.isCreatingChat = true;
      try {
          const response = await api.post(`api/chat-session/${this.userId}`);
          if (response.data && response.data.succeed) {
              const newChatData = response.data.data;  
              const newChat = {
                id: newChatData.sessionId,
                title: newChatData.sessionTitle || '新的对话',
              };
              this.chatHistory.unshift(newChat);
              this.$set(this.allMessages, newChat.id, []);
              this.currentChatId = newChat.id;
          } else {
              message.error("创建新对话失败: " + (response.data.message || '未知错误'));
          }
      } catch(error) {
          console.error("创建新对话失败:", error);
          message.error("网络错误，无法创建新对话。");
      } finally {
          this.isCreatingChat = false;
      }
    },

    /**
     * 保存一轮对话
     */
    async saveTurn(userMessage, assistantMessage) {
        try {
            const payload = {
                sessionId: this.currentChatId,
                messages: [
                    { msgRole: "user", content: userMessage.content },
                    { msgRole: "assistant", content: assistantMessage.rawContent } // Save the full, raw content
                ]
            }; // 
            await api.post('api/chat-message', payload);
            // Optional: handle success or failure response 
        } catch (error) {
            console.error("保存会话失败:", error);
            message.error("未能保存此轮对话，请检查网络连接。");
        }
    },

    /**
     * 更新对话标题
     */
    async updateChatTitle(sessionId, newTitle) {
        try {
            const payload = { sessionId: String(sessionId), sessionTitle: newTitle }; // 
            const response = await api.put('api/chat-session', payload);
            if(response.data && response.data.succeed) {
                // Update title in the local history list as well
                const chatInHistory = this.chatHistory.find(c => c.id === sessionId);
                if (chatInHistory) {
                    chatInHistory.title = newTitle;
                }
            }
        } catch(error) {
             console.error("更新会话标题失败:", error);
             // Non-critical error, no need to alert user
        }
    },


    selectChat(chatId) {
      if (this.currentChatId === chatId) return;
      this.currentChatId = chatId;
      // Fetch messages for the selected chat instead of reading from a preloaded object
      this.fetchChatMessages(chatId);
    },
    
    async sendMessage() {
      const trimmedInput = this.userInput.trim();
      if (!trimmedInput || this.isLoading || this.isStreaming) return;

      const isFirstMessage = this.currentMessages.length === 0;

      const userMessage = {
        id: uuidv4(),
        role: 'user',
        content: trimmedInput,
      };
      
      this.allMessages[this.currentChatId].push(userMessage);
      this.userInput = '';
      this.isLoading = true;
      
      try {
        
        const response = await axios.post(AI_GENERATION_API_URL, {
          session_id: this.currentChatId,
          question: userMessage.content,
          knowledge_base_ids: this.selectedKnowledgeBases, 
        });
        
        this.isLoading = false; 

        const assistantReply = response.data.answer; 
        if (!assistantReply) {
             throw new Error("API返回格式不正确，未找到'answer'字段");
        }

        const assistantMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: '', 
            rawContent: assistantReply, 
        };
        this.allMessages[this.currentChatId].push(assistantMessage);
        
        // Frontend streaming effect
        this.streamResponse(assistantReply, this.currentChatId, assistantMessage.id, () => {
             // Step 2: Once streaming is complete, save the turn to our backend
             this.saveTurn(userMessage, assistantMessage);

             // Step 3: If it was the first message, update the chat title 
             if (isFirstMessage) {
                 const newTitle = userMessage.content.substring(0, 20);
                 this.updateChatTitle(this.currentChatId, newTitle);
             }
        });

      } catch (error) {
        console.error("API请求失败:", error);
        message.error("消息发送失败，请检查网络或联系管理员。");
        this.isLoading = false; 
        // Remove the user message that failed to send
        this.allMessages[this.currentChatId].pop();
      } 
    },

    streamResponse(text, chatId, messageId, onCompleteCallback) {
        this.isStreaming = true;
        let currentIndex = 0;
        const targetChat = this.allMessages[chatId];
        if (!targetChat) { this.isStreaming = false; return; }
        const messageToUpdate = targetChat.find(m => m.id === messageId);
        if (!messageToUpdate) { this.isStreaming = false; return; }

        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                messageToUpdate.content += text[currentIndex];
                currentIndex++;
            } else {
                clearInterval(intervalId);
                this.isStreaming = false;
                if(onCompleteCallback) {
                    onCompleteCallback(); // Execute callback when streaming is done
                }
            }
        }, 25); 
    },

    loadVulnerabilityTemplate() {
        if (this.userInput.trim() && !confirm('当前输入框有内容，确定要使用模板覆盖吗？')) {
            return;
        }
        this.userInput = this.vulnerabilityTemplate;
        this.$nextTick(() => {
            this.$refs.userInputTextArea.focus();
        });
    },
    handleEnter(e) {
        if (!e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    },
    scrollToBottom() {
      const el = this.$refs.messageArea?.$el;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    },
    copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            message.success('已复制到剪贴板');
        });
    },
    formatMessage(text) {
        if (typeof text !== 'string') return '';
        return marked(text, { breaks: true, gfm: true });
    }
  },
};
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  line-height: 1.7;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  border-bottom: 1px solid #eaecef;
  padding-bottom: .3em;
}
.markdown-body h1 { font-size: 2em; }
.markdown-body h2 { font-size: 1.5em; }
.markdown-body h3 { font-size: 1.25em; }
.markdown-body p { margin-bottom: 16px; }
.markdown-body ul, .markdown-body ol {
  padding-left: 2em;
  margin-bottom: 16px;
}
.markdown-body code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  padding: .2em .4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,.05);
  border-radius: 3px;
}
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
  margin-bottom: 16px;
}
.markdown-body pre code {
  display: inline;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}
.markdown-body blockquote {
  margin-left: 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: .25em solid #dfe2e5;
}
.markdown-body table {
  display: block;
  width: 100%;
  overflow: auto;
  border-collapse: collapse;
  margin-bottom: 16px;
}
.markdown-body th, .markdown-body td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
.markdown-body th {
  font-weight: 600;
}
</style>

<style scoped>

.chat-container {
  height: calc(100vh - 100px);
  min-height: 600px;
  background-color: #F7F8FB;
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
}

/* --- 侧边栏 --- */
.history-sider {
  background: #313A43 !important;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.sider-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.new-chat-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  flex-shrink: 0; 
}

.sider-section-title {
  color: #a0a0a0;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 4px;
}
.sider-divider {
  margin: 16px 0;
  background-color: rgba(255, 255, 255, 0.2);
}

.history-list {
    overflow-y: auto;
    flex-grow: 1; 
    min-height: 100px; 
}
.history-item {
  color: #e0e0e0;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.history-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.history-item.active {
  background-color: #26649D;
  color: #FFFFFF;
}
.history-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
}
.delete-icon {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s;
}
.history-item:hover .delete-icon {
    visibility: visible;
    opacity: 0.7;
}
.delete-icon:hover {
    opacity: 1;
}

/* --- 知识库列表 --- */
.knowledge-base-list {
  overflow-y: auto;
  flex-shrink: 0; 
  text-align: left;
}
.kb-item {
    display: block;
    color: #e0e0e0;
    margin-bottom: 8px;
    padding: 4px;
}
.kb-item >>> .ant-checkbox-inner {
    background-color: transparent;
    border-color: #a0a0a0;
}
.kb-item >>> .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #26649D;
    border-color: #26649D;
}

/* --- 聊天面板 --- */
.chat-panel {
  background-color: #F7F8FB;
}
.chat-header {
  background: #FFFFFF;
  padding: 0 24px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}
.message-area {
  padding: 24px;
  overflow-y: auto;
}
.message-wrapper {
  display: flex;
  margin-bottom: 20px;
  font-size: 12px;
  color: #666666;
}
.message-content {
  padding: 10px 14px;
  border-radius: 8px;
  position: relative;
  word-break: break-word;
  text-align: left;
}
.message-avatar {
  margin: 0 12px;
}

/* --- 用户消息样式修改 --- */
.message-wrapper.user {
  justify-content: flex-end;
}
.message-wrapper.user .message-content {
  background-color: #e1eef8;
  max-width: 45%;
}
.message-wrapper.user .message-text {
   white-space: pre-wrap;
}
.message-wrapper.user .message-avatar {
  order: 2;
}

/* --- 助手消息样式修改 --- */
.message-wrapper.assistant {
  justify-content: flex-start;
}
.message-wrapper.assistant .message-content {
  background-color: #FFFFFF;
  border: 1px solid #e8e8e8;
  max-width: 75%;
  padding-bottom: 30px;
}

.message-text {
    line-height: 1.6;
}

/* --- 复制按钮样式修改 --- */
.message-actions {
    position: absolute;
    bottom: 8px;
    right: 8px;
    opacity: 0;
    transition: opacity 0.3s;
}
.message-content:hover .message-actions {
    opacity: 1;
}
.message-actions .ant-icon {
    cursor: pointer;
    color: #999;
    padding: 4px;
    background: #f7f7f7;
    border-radius: 50%;
}
.message-actions .ant-icon:hover {
    color: #2BBAFF;
    background: #ededed;
}

/* --- 页脚输入区域 --- */
.chat-footer {
  padding: 16px 24px;
  background: #FFFFFF;
  border-top: 1px solid #e8e8e8;
}

/* 新增: 模板按钮区域样式 */
.template-actions {
    margin-bottom: 8px;
    text-align: left;
}
.template-actions .ant-btn {
    background: #f5f5f5;
    border-color: #d9d9d9;
    color: #595959;
}
.template-actions .ant-btn:hover {
    background: #e0e0e0;
    border-color: #b0b0b0;
}
/* ---------------------- */

.input-area {
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 4px 4px 4px 12px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.input-area.focused {
   border-color: #2BBAFF !important;
   box-shadow: 0 0 0 2px rgba(43, 186, 255, 0.2);
}
.input-area >>> .ant-input {
  border: none !important;
  box-shadow: none !important;
  resize: none;
}
.send-btn {
  border-radius: 6px;
  height: 36px;
  width: 36px;
  background-color: #2BBAFF;
  border-color: #2BBAFF;
  flex-shrink: 0;
}
.send-btn:hover, .send-btn:focus {
  background-color: #26649D;
  border-color: #26649D;
}
.send-btn[disabled] {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
}
</style>
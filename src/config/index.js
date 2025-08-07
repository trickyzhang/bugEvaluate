const config = {
  websocket: {
    brokerURL: process.env.VUE_APP_WEBSOCKET_URL || 'ws://10.13.1.104:8080/ws',
    webSocketUrl: process.env.VUE_APP_WEBSOCKET_URL?.replace('ws://', 'http://') || 'http://10.13.1.104:8080/ws'
  },
  
  livekit: {
    url: process.env.VUE_APP_LIVEKIT_URL || 'ws://10.13.1.104:7880'
  },
  
  api: {
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://10.13.1.104:8080'
  }
};

export default config; 
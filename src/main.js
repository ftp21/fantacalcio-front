import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueMeta from 'vue-meta';

function getApiUrls() {
  if (process.env.NODE_ENV === 'production') {
    const { protocol, hostname, port } = window.location;
    const apiProtocol = protocol; // Mantieni http o https
    const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:'; // Determina il protocollo WebSocket
    const portPart = port ? `:${port}` : ''; // Aggiungi la porta se esiste
    
    return {
      apiBaseUrl: `${apiProtocol}//${hostname}${portPart}/api/v1/`,
      wsBaseUrl: `${wsProtocol}//${hostname}${portPart}/ws`
    };
  } else {
    return {
      apiBaseUrl: process.env.VUE_APP_API,
      wsBaseUrl: process.env.VUE_APP_WS
    };
  }
}


Vue.use(VueMeta);
Vue.use(BootstrapVue)
const apiUrls = getApiUrls();
Vue.prototype.$apiBaseUrl = apiUrls.apiBaseUrl;
Vue.prototype.$wsBaseUrl = apiUrls.wsBaseUrl;
Vue.prototype.$protocol = window.location.protocol

store.state.apiBaseUrl = apiUrls.apiBaseUrl;
store.state.wsBaseUrl = apiUrls.wsBaseUrl;


new Vue({
  store,
  router,
  render: function (h) { return h(App) },
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueMeta from 'vue-meta';

Vue.use(VueMeta);
Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

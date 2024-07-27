import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    status: {},
    mescola: {},
    estratto: {},
    ultimo_acquisto: {},
    info: {},
    squadre: {},
    initial_config:1,
    socket: {
      isConnected: false,
      estratto: {},
      acquisto: {},
      rose: {},
      info: {},
      crediti_nascosti: "",
      reconnectError: false,
    },
    apiBaseUrl: Vue.prototype.$apiBaseUrl,
    wsBaseUrl: Vue.prototype.$wsBaseUrl,
  },
  mutations: {
    setStatus(state, payload){
      state.status = payload;
      state.mescola= payload.mescola;
      state.estratto= payload.estratto;
      state.ultimo_acquisto= payload.ultimo_acquisto;
      state.info=payload.info;

      // if(state.squadre.length()==0){
      //   state.initial_config=0;
      // }else{
      //   state.initial_config=1
      // }
    },
    setEstratto(state,payload){
      state.estratto=payload
    },
    setSquadre(state,payload){
      state.squadre=payload
    },
    setMescola(state,payload){
      state.mescola=payload
    },
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      axios.get(state.apiBaseUrl + `public`)
    },
    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      let parsed=JSON.parse(message.data);
      state.socket.estratto= parsed.estratto;
      state.socket.acquisto= parsed.ultimo_acquisto;
      state.socket.rose=parsed.rose;
      state.socket.info=parsed.info;
      state.socket.crediti_nascosti=parsed.crediti_nascosti;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },

  },
  actions: {
    setSquadre({commit,state}){
      axios.get(state.apiBaseUrl + `squadre`).then((response)=>{
        commit('setSquadre', response.data);
      })
    },
    setStatus({commit,state}) {
      // commit('setStatus', "response.data");
      axios.get(state.apiBaseUrl + `status`).then((response)=>{
        commit('setStatus', response.data);
      })
    },
    setEstratto({commit},{estratto}) {
      commit('setEstratto',estratto);
    },
    setMescola({commit},{mescola}){
      commit('setMescola',mescola)
    }

  },
  modules: {},
  getters: {
    getStatus: (state, getters) => {
      return state.status
    },
    // getStatus (state) { return state.status },
    getEstratto (state) { return state.estratto},
    getAcquisto (state) { return state.ultimo_acquisto},
    getMescola (state) { return state.mescola},
    getInfo (state) { return state.info},
    getSquadre (state) { return state.squadre},
    getIdEstratto(state){
      return state.estratto.id
    },
    getInit (state) { return state.initial_config },
  },
})
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
    squadre: {}
  },
  mutations: {
    setStatus(state, payload){
      state.status = payload;
      state.mescola= payload.mescola;
      state.estratto= payload.estratto;
      state.ultimo_acquisto= payload.ultimo_acquisto;
      state.info=payload.info;
    },
    setEstratto(state,payload){
      state.estratto=payload
    },
    setSquadre(state,payload){
      state.squadre=payload
    },
    setMescola(state,payload){
      state.mescola=payload
    }

  },
  actions: {
    setSquadre({commit}){
      axios.get(`${process.env.VUE_APP_API}squadre`).then((response)=>{
        commit('setSquadre', response.data);
      })
    },
    setStatus({commit}) {
      // commit('setStatus', "response.data");
      axios.get(`${process.env.VUE_APP_API}status`).then((response)=>{
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
    getStatus (state) { return state.status },
    getEstratto (state) { return state.estratto},
    getAcquisto (state) { return state.ultimo_acquisto},
    getMescola (state) { return state.mescola},
    getInfo (state) { return state.info},
    getSquadre (state) { return state.squadre},
    getIdEstratto(state){
      return state.estratto.id
    },
  },
})
<template>
  <div class="info_giocatore h-100">
    <b-card
        no-body
        header="Info Giocatore"
        header-tag="header"
        class="h-100"
    >
      <template #header>
        Info Giocatore <span class="float-right" v-if="status.info">{{status.info.estratti || 0}}/{{status.info.totali || 0}}</span>
      </template>
      <b-card-body>
        <b-row>
          <b-col sm="6" style="">
            <b-img :src="estratto.campioncino" fluid ></b-img>
          </b-col>
          <b-col sm="6">
            <div class="info_giocatore_right flex flex-col">
              <p>Nome: {{estratto.nome_giocatore}}</p>
              <p>Ruolo: {{estratto.ruolo}}</p>
              <p>Squadra: {{estratto.squadra}}</p>

            </div>
          </b-col>
        </b-row>

      </b-card-body>
      <b-card-footer class="text-center">
        <b-btn-group class="w-100" style="">
          <b-button @click='prev' style="color:#fff;">Indietro</b-button>
          <b-button @click='next' style="color:#fff;">Avanti</b-button>
        </b-btn-group>
      </b-card-footer>

    </b-card>

  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {

    };
  },

  created() {

  },
    methods: {
    next: function () {
      axios.get(this.$apiBaseUrl + `estrai/avanti`).then(response =>{
        this.$store.commit("increment");
        this.$store.commit('setEstratto',response.data);
        this.$store.dispatch('setStatus');
      })
    },
      prev: function (){
        axios.get(this.$apiBaseUrl + `estrai/indietro`).then(response =>{
          this.$store.commit('setEstratto',response.data);
          this.$store.dispatch('setStatus');
        })
      }
  },
  mounted: function(){
  },
  computed: {
    estratto: function (){
      return this.$store.getters.getEstratto;
    },
    status: function (){
      return this.$store.getters.getStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  color: black;
}

</style>


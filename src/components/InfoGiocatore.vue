<template>
  <div class="info_giocatore h-100">
    <b-card
        header="Info Giocatore"
        header-tag="header"
        class="h-100"
    >
      <template #header>
        Info Giocatore <span class="float-right" v-if="status.info">{{status.info.estratti || 0}}/{{status.info.totali || 0}}</span>
      </template>
      <b-card-text>
        <b-row>
          <b-col sm="6">
          <b-img :src="estratto.campioncino" fluid height="10%"></b-img>
          </b-col>
          <b-col sm="6">
            <div class="info_giocatore_right flex flex-col">
              <p>Nome: {{estratto.nome_giocatore}}</p>
              <p>Ruolo: {{estratto.ruolo}}</p>
              <p>Squadra: {{estratto.squadra}}</p>
              <div class="flex buttons">
                <b-button @click='prev'>Indietro</b-button>
                <b-button @click='next'>Avanti</b-button>
              </div>
            </div>
          </b-col>
        </b-row>

      </b-card-text>

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
      axios.get(`${process.env.VUE_APP_API}estrai/avanti`).then(response =>{
        this.$store.commit('setEstratto',response.data);
        this.$store.dispatch('setStatus');
      })
    },
      prev: function (){
        axios.get(`${process.env.VUE_APP_API}estrai/indietro`).then(response =>{
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

<style lang="scss">
* {
  color: black;
}

</style>

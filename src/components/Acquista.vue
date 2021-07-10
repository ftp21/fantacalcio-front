<template>
  <div class="acquista h-100">
    <b-card
        header="Acquista"
        header-tag="header"
        class="h-100"
    >
      <b-card-text>
        <b-row>
          <b-col sm="12">
            <label name="squadra">Squadra</label>
            <b-form-select v-model="squadra_id">
              <option v-for="squadra in squadre" :key="squadra.id" v-bind:value='squadra.id' >{{squadra.nome}}</option>
            </b-form-select>

            <label>Crediti</label>
            <b-input type="number" name="crediti" v-model.number='crediti_acquisto'/>
            <b-button @click='acquista'>Acquista</b-button>
          </b-col>
        </b-row>

      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data(){
    return{
        crediti_acquisto: 0,
        squadra_id: 0,

      }
  },
  methods: {
    acquista:function (){

      axios.post(`${process.env.VUE_APP_API}mercato/acquista/${this.id_giocatore}`,
          `id_squadra=${this.squadra_id}&crediti=${this.crediti_acquisto}`).then(response=>{
            this.$store.dispatch('setStatus');

            this.showToast();
      }).catch(error=>{
        //console.log(error.response.data.detail)
        this.showError(error.response.data.detail);
      });
    },
    showToast: function (){
      this.$bvToast.toast('Il giocatore X è stato acquistato da y a z crediti', {
        autoHideDelay: 2000,
        title: 'Giocatore acquistato correttamente',
        headerClass: 'header-toast',
        variant: 'success'
      })
    },
    showError: function (error) {
      this.$bvToast.toast(error, {
        autoHideDelay: 2000,
        title: 'Errore nell\'acquisto',
        headerClass: 'header-toast',
        variant: 'danger'
      })
    }
  },
  computed: {
    squadre: function (){
      return this.$store.getters.getSquadre;
    },
    id_giocatore: function (){
      return this.$store.getters.getIdEstratto;
    }
  },
	mounted() {
	},
};
</script>
<style>
  .card > header{
    font-size: 24px;
  }
</style>

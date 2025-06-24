<template>
  <div class="container-fluid bg-dark" style="width: 100%; min-height: 100vh">
    <b-tabs card>
      <!-- Primo tab: Rosa -->
      <b-tab title="Rosa" active>
        <div class="text-center text-white">
          <p class="h1">{{ personalData.nome_squadra }}</p>
          <p class="h1">
            {{ personalData.crediti_spesi }}/{{ personalData.crediti_rimanenti }} &nbsp;
            {{ personalData.crediti_rimanenti + personalData.crediti_spesi }}
          </p>
        </div>

        <div class="row text-center">
          <b-table borderless striped dark responsive :items="personalData.portieri" :fields="fields" tbody-tr-class="h2" head-variant="light" class="mb-4"></b-table>
          <b-table borderless striped dark responsive :items="personalData.difensori" :fields="fields" tbody-tr-class="h2" head-variant="light" class="mb-4"></b-table>
          <b-table borderless striped dark responsive :items="personalData.centrocampisti" :fields="fields" tbody-tr-class="h2" head-variant="light" class="mb-4"></b-table>
          <b-table borderless striped dark responsive :items="personalData.attaccanti" :fields="fields" tbody-tr-class="h2" head-variant="light" class="mb-4"></b-table>
        </div>
      </b-tab>

      <!-- Secondo tab: Svincolati -->
      <b-tab title="Svincolati" @click="getSvincolati">
        <div class="my-3">
          <b-form-group label="Filtra per nome:" label-class="text-white">
            <b-form-input v-model="filter" type="search" placeholder="Cerca giocatore..."></b-form-input>
          </b-form-group>

          <b-tabs card>
            <b-tab title="Portieri">
              <b-table :items="svincolati.portieri" :fields="fieldsSvincolati" :filter="filter" striped dark responsive></b-table>
            </b-tab>
            <b-tab title="Difensori">
              <b-table :items="svincolati.difensori" :fields="fieldsSvincolati" :filter="filter" striped dark responsive></b-table>
            </b-tab>
            <b-tab title="Centrocampisti">
              <b-table :items="svincolati.centrocampisti" :fields="fieldsSvincolati" :filter="filter" striped dark responsive></b-table>
            </b-tab>
            <b-tab title="Attaccanti">
              <b-table :items="svincolati.attaccanti" :fields="fieldsSvincolati" :filter="filter" striped dark responsive></b-table>
            </b-tab>
          </b-tabs>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Personal",
  data() {
    return {
      personalData: {
        portieri: [],
        difensori: [],
        centrocampisti: [],
        attaccanti: [],
        nome_squadra: "",
        crediti_spesi: 0,
        crediti_rimanenti: 0,
      },
      svincolati: {
        portieri: [],
        difensori: [],
        centrocampisti: [],
        attaccanti: [],
      },
      filter: "",
      fields: [
        { key: "nome_giocatore", label: "Giocatore", tdClass: 'text-white' },
        { key: "crediti", label: "Crediti", tdClass: 'text-white' }
      ],
      fieldsSvincolati: [
        { key: "nome_giocatore", label: "Giocatore", tdClass: 'text-white' },
        { key: "squadra", label: "Squadra", tdClass: 'text-white' }
      ]
    };
  },
  methods: {
    getPersonal() {
      axios.get(this.$apiBaseUrl + `personal/${this.$route.params.otp}`)
        .then(response => {
          this.personalData = response.data;
        });
    },
    getSvincolati() {
      if (this.svincolati.portieri.length > 0) return; // evita doppie richieste
      axios.get(this.$apiBaseUrl + `svincolati`)
        .then(response => {
          this.svincolati = response.data;
        });
    }
  },
  mounted() {
    this.getPersonal();
  }
};
</script>

<style scoped>
</style>

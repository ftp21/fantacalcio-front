<template>
  <div class="container-fluid bg-dark" style="width: 100% ; min-height: 100vh">
    <div class="row flex-fill text-center">
      <p class="h1 text-white w-100"> {{personalData.nome_squadra}}</p>
      <p class="h1 text-white w-100"> {{personalData.crediti_spesi}}/{{personalData.crediti_rimanenti}} &nbsp; {{personalData.crediti_rimanenti+personalData.crediti_spesi}}</p>
    </div>
    <div class="row flex-fill text-center">
      <b-table borderless striped dark responsive thead-class=""  tbody-tr-class="h2"  :items=personalData.portieri :fields="fields" thead-tr-class="h2" head-variant="light" style="padding-top: 50px"></b-table>
    </div>
    <div class="row flex-fill text-center">
      <b-table borderless striped dark responsive thead-class=""  tbody-tr-class="h2"  :items=personalData.difensori :fields="fields" thead-tr-class="h2" head-variant="light" style="padding-top: 50px"></b-table>
    </div>
    <div class="row flex-fill text-center">
      <b-table borderless striped dark responsive thead-class=""  tbody-tr-class="h2"  :items=personalData.centrocampisti :fields="fields" thead-tr-class="h2" head-variant="light" style="padding-top: 50px"></b-table>
    </div>
    <div class="row flex-fill text-center">
      <b-table borderless striped dark responsive thead-class=""  tbody-tr-class="h2"  :items=personalData.attaccanti :fields="fields" thead-tr-class="h2" head-variant="light" style="padding-top: 50px"></b-table>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Personal",
  data() {
    return {
      personalData : "",
      fields: [
        { key: "nome_giocatore", label: "Giocatore", tdClass: 'text-white'},
        { key: "crediti", label: "Crediti", tdClass: 'text-white'},
      ]
    };
  },
  methods: {
    getPersonal: function () {
      axios.get(this.$apiBaseUrl + `personal/${this.$route.params.otp}`).then(
          response =>{
            this.personalData = response.data;
          }

      )
    },
  },
  mounted() {
    this.getPersonal();
  }
}
</script>

<style scoped>

</style>
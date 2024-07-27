<template>
  <div class='container' style="padding-top: 10px" >
    <b-row>
      <b-col sm="6">
        <b-form-group label="Listone:" label-cols-sm="2" label-size="xl">
          <b-form-file
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Scegli il file del listone"
              drop-placeholder="Trascina qui il file..."
              id="file"
              ref="fileAdd"
          ></b-form-file>
          <div class="mt-3"><b-button v-b-modal:confirm-upload >Carica</b-button></div>

        </b-form-group>
      </b-col>
      <b-col sm="6">
        <div id="dati_listone" v-if="login">
          <p>Totali: {{totali}}</p>
          <p>Portieri: {{portieri}}</p>
          <p>Difensori: {{difensori}}</p>
          <p>Centrocampisti: {{centrocampisti}}</p>
          <p>Attaccanti: {{attaccanti}}</p>

        </div>

      </b-col>
    </b-row>

    <b-modal id="confirm-upload" title="Importa Listone" @ok="submitFile()" >
      <p class="my-4">Tutte le rose e gli acquisti verranno cancellati, confermi? </p>
    </b-modal>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "UploadListone",
  data() {
    return {
      file1: null,
      login: false,
      totali: 0,
      attaccanti: 0,
      centrocampisti: 0,
      difensori: 0,
      portieri: 0
    }
  },
  methods:{
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.$refs.fileAdd.files[0]);
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post(this.$apiBaseUrl + `listone`, formData, { headers }).then(response=>{
        this.login=true;
        this.portieri=response.data.portieri;
        this.difensori=response.data.difensori;
        this.centrocampisti=response.data.centrocampisti;
        this.attaccanti=response.data.attaccanti;
        this.totali=response.data.totale;
      });
    }
  }
}

</script>

<style scoped>

</style>
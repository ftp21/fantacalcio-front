<template>
  <div>
    <b-table borderless striped dark responsive thead-class=""  tbody-tr-class="h2"  :items="rose" :fields="fields" thead-tr-class="h2" head-variant="light" style="padding-top: 50px">
      <template v-slot:cell(crediti_rimanenti)="{item}" >
        {{item.crediti_rimanenti}}
      </template>

    </b-table>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "RosePublic",
  data() {
    return {
      fields: [
        { key: "nome", label: "Squadra", tdClass: 'text-white'},
        { key: "composizione.portieri", label: "P" , tdClass: 'text-danger'},
        { key: "composizione.difensori", label: "D" , tdClass: 'text-warning'},
        { key: "composizione.centrocampisti", label: "C" , tdClass: 'text-primary'},
        { key: "composizione.attaccanti", label: "A" , tdClass: 'text-success' },
        // { key: "crediti_rimanenti", label: "Rimanenti" , tdClass: 'text-white'},
        // { key: "crediti_spesi", label: "Spesi" , tdClass: 'text-white'},
      ],
    };
  },
  watch: {
    crediti_nascosti: { //<-- Edited
      handler: function(newVal, oldVal) {
        if (!newVal){
          this.fields.push(
              { key: "crediti_rimanenti", label: "Rimanenti" , tdClass: 'text-white'},
              { key: "crediti_spesi", label: "Spesi" , tdClass: 'text-white'},
          )
        }
      },
    },
  },
  mounted(){

  },
  computed: mapState({
    rose: state => state.socket.rose,
    status: state => state.socket.info,
    crediti_nascosti: state => state.socket.crediti_nascosti
  })
}
</script>

<style scoped>


</style>
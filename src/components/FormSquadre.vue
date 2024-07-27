<template>
  <div class="table_content flex flex-col">
    <table class="card">
      <tr>
        <td>Nome</td>
        <td>ID</td>
        <td>Modifica Nome</td>
        <td>Cancella</td>

      </tr>
      <tr v-for="(squadra, index) in squadre" :key="squadra.id">
        <td>{{ squadra.nome }}</td>
        <td>{{ squadra.id }}</td>
        <td>
            <b-button @click="modificaSquadra(index,squadra)">Modifica</b-button>
        </td>
        <td>
            <b-button @click="cancellaSquadra(index,squadra)">Cancella</b-button>
        </td>
      </tr>
    </table>
    <div class="add_squadra flex">
        <input type="text" v-model="addSquadra">
        <b-button @click="creaSquadra">Aggiungi Squadra</b-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      addSquadra: '',
    };
  },
  methods: {
    creaSquadra: function () {
      axios.post(this.$apiBaseUrl + `squadre`, `nome=${this.addSquadra}`).then(
          response => {
            //console.log(response);
            axios.get(this.$apiBaseUrl + `squadre`).then(response=>{
              this.$store.commit('setSquadre',response.data);
            })
            this.addSquadra = '';
          }).catch(e => alert(e));
    },
    modificaSquadra: function (index, squadra) {
      let nuovoNome = prompt('Rinomina la tua squadra');
      axios.put(this.$apiBaseUrl + `squadre`, `id_squadra=${squadra.id}&nome=${nuovoNome}`).then(response => {
        //console.log(response);
        axios.get(this.$apiBaseUrl + `squadre`).then(response=>{
          this.$store.commit('setSquadre',response.data);
        })
      }).catch(e=>{
        console.log(e)})
    },
    cancellaSquadra: function (index, squadra) {
      // //console.log(index)
      // //console.log(squadra.id)
      let idSquadra = parseInt(squadra.id);
      //console.log(idSquadra)
      axios.delete(this.$apiBaseUrl + `squadre/${idSquadra}`).then((response) => {
        //console.log(response)
        axios.get(this.$apiBaseUrl + `squadre`).then(response=>{
          this.$store.commit('setSquadre',response.data);
        })
      })

    },
  },
  computed: {
    squadre: function (){
      return this.$store.getters.getSquadre
    }
  },
  mounted() {
    axios.get(this.$apiBaseUrl + `squadre`).then((response) => {
      // //console.log(response.data);
      this.$store.commit('setSquadre', response.data);
    });
  }

};
</script>

<style lang="scss" scoped>

.table_content {
  justify-content: center;
  align-items: center;
}

table {
  background-color: rgba(51, 51, 51, 0.6);
  border: 1px solid white;
  margin: 10px;
  padding: 5px 0px;
  color: white;
  width: 50%;
  justify-content: center;
  align-items: center;

  td {
    padding: 10px 0px;
  }
}

</style>

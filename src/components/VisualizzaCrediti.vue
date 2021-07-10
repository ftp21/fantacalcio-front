<template>


  <div class="visualizza_crediti h-100">
    <b-card
        header="Visualizza crediti"
        header-tag="header"
        class="h-100"
    >
      <b-card-text>
        <label name="squadra">Squadra</label>
        <b-form-select v-model="squadra_id">
          <option v-for="squadra in squadre" :key="squadra.id" v-bind:value='squadra.id' >{{squadra.nome}}</option>
        </b-form-select>
        <label>Crediti</label>
        <p>{{squadra_crediti > 0 && visible ? squadra_crediti : 'Non disponibile' }}</p>
        <b-button @click='visualizza'>Visualizza</b-button>
      </b-card-text>

    </b-card>




  </div>
</template>
<script>
import axios from 'axios';

export default {
  data(){
    return{
      squadra_id: '',
      squadra_crediti: '',
      visible: false,
    }
  },
  methods: {
    visualizza(){
      let squadra_id = this.squadra_id;
      if(squadra_id != ''){
        axios.get(`${process.env.VUE_APP_API}rosa/${squadra_id}`).then(response=>{
        //console.log(response.data[0]);
        this.squadra_crediti = response.data.crediti_rimanenti;
        this.visible = !this.visible;
      })
      }
    }
  },
  mounted() {

	},
	computed: {
    squadre: function (){
      return this.$store.getters.getSquadre;
    },
	}
};
</script>

<style lang="scss">
.card{
  color: black;
}
/*.visualizza_crediti {
  .main {
    height: 100%;
    .squadre {
      height: 100%;
      justify-content: space-around;
      align-items: center;
      select {
        width: 50%;
        height: 30px;
      }
      button {
        padding: 5px 5px;
      }
    }
  }
}*/
</style>

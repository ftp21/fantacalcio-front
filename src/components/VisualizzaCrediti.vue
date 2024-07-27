<template>


  <div class="visualizza_crediti h-100">
    <b-card
        no-body
        header="Visualizza crediti"
        header-tag="header"
        class="h-100"
    >
      <b-card-body>
        <b-form-group>
          <label>Squadra</label>
          <b-form-select v-model="squadra_id">
            <option v-for="squadra in squadre" :key="squadra.id" v-bind:value='squadra.id' >{{squadra.nome}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <label>Crediti</label>
          <transition name="fade" :duration="{ enter: 1000, leave: 1000 }">
            <p class="h2 text-center" v-if="visible">{{squadra_crediti > 0 && visible ? squadra_crediti : '' }}</p>
          </transition>

        </b-form-group>
      </b-card-body>
      <b-card-footer>
        <b-button @click='visualizza'>Visualizza</b-button>
      </b-card-footer>
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
        axios.get(this.$apiBaseUrl + `rosa/${squadra_id}`).then(response=>{
        //console.log(response.data[0]);
        this.squadra_crediti = response.data.crediti_rimanenti;
        this.visible = true;
          setTimeout(() => this.visible = false, 5000);
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}

.fade-enter,
.fade-leave-to
  /* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>

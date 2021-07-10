<template>
    <div class="container" style="padding-top: 10px">
        <b-row class="equal"
        >
          <b-col sm="6">
            <InfoGiocatore></InfoGiocatore>
          </b-col>
          <b-col sm="3">
            <Acquista></Acquista>

          </b-col>
          <b-col sm="3">
            <VisualizzaCrediti></VisualizzaCrediti>
          </b-col>

        </b-row>
        <b-row style="padding-top:15px">
          <b-col sm="6">
            <Mescola></Mescola>
          </b-col>
          <b-col sm="6">
            <UltimoAcquisto></UltimoAcquisto>
          </b-col>
        </b-row>
    </div>
</template>

<script>
import Acquista from "../components/Acquista";
import InfoGiocatore from "../components/InfoGiocatore.vue";
import Mescola from "../components/Mescola.vue";
import UltimoAcquisto from "../components/UltimoAcquisto.vue";
import VisualizzaCrediti from "../components/VisualizzaCrediti.vue";
import store from '../store';

export default {
  name: "Home",

  components: {
    Acquista,
    InfoGiocatore,
    Mescola,
    UltimoAcquisto,
    VisualizzaCrediti

  
  },
  data(){
    return {
      stato: "",
      store: store,
    }
  },
	computed: {
    initial_config: function () {
      return this.$store.getters.getInit;
    },
	},
	mounted() {
    this.$store.dispatch('setSquadre');
    // if(this.initial_config==1){
    //   window.location='/impostazioni'
    // }

	},
  created() {
    //this.status();
    // console.log(JSON.stringify(this.$store.getters.getStatus));


  },
  methods: {
    // status: function(){
    //   axios.get(`${process.env.VUE_APP_API}status`).then(response=>{
    //     // this.$store.commit('setStatus',response.data.info);
    //     this.$store.commit('setGiocatoreAttuale', response.data.estratto.id);
    //     // this.$store.commit('setUltimoAcquisto', response.data.ultimo_acquisto);
    //
    //   })
    // }

  }
};
</script>
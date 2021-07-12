<template>
  <div class="w-100 text-center">
    <b-card
        header="Ultimo Acquisto"
        header-tag="header"
        class="bg-trasparent w-75 mx-auto"

    >
      <b-card-text>
        <div class="h1">
          <p class="text-primary">{{ultimoAcquisto.nome_giocatore}} </p>
          <p>{{ultimoAcquisto.fanta_squadra}}</p>
          <p>{{ultimoAcquisto.crediti}}</p>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>


<script>


import {mapState} from "vuex";

export default {
  data() {
    return {
    };
  },
  methods: {
   
  },
  mounted(){
  },
  computed: mapState({

    ultimoAcquisto: state => state.socket.acquisto,
    status: state => state.socket.info
  })
};
</script>



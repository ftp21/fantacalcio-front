<template>
  <div class="ultimo_acquisto h-100">
    <b-card
        header="Ultimo Acquisto"
        header-tag="header"
        class="h-100"
    >
      <b-card-text>
        <b-row>
          <b-col>
            <b-img fluid :src="ultimoAcquisto.campioncino" alt="">
            </b-img>
          </b-col>
          <b-col>
            <p>Giocatore: {{ultimoAcquisto.nome_giocatore}} </p>
            <p>Squadra: {{ultimoAcquisto.fanta_squadra}}</p>
            <p>Crediti: {{ultimoAcquisto.crediti}}</p>
          </b-col>

        </b-row>
      </b-card-text>
    </b-card>

  </div>
</template>


<script>


export default {
  data() {
    return {
    };
  },
  methods: {
   
  },
  mounted(){
  },
  computed: {
    ultimoAcquisto: function () {
      return this.$store.getters.getAcquisto
    }
  },
};
</script>



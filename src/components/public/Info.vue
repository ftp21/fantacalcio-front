<template>
  <div class="w-100">
    <b-card
        header="Info Giocatore"
        header-tag="header"
        class=""
    >
      <template #header>
        Info Giocatore <span class="float-right" v-if="status">{{status.estratti || 0}}/{{status.totali || 0}}</span>
      </template>
      <b-card-text>
        <b-row>
          <b-col sm="6">
            <b-img :src="estratto.campioncino" fluid height="10%"></b-img>
          </b-col>
          <b-col sm="6">
            <div class="info_giocatore_right flex flex-col h1">
              <p class="text-danger">{{estratto.nome_giocatore}}</p>
              <p class="h2">{{estratto.ruolo}}</p>
              <p class="h2">{{estratto.squadra}}</p>

            </div>
          </b-col>
        </b-row>

      </b-card-text>

    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Info",
  computed: mapState({
    estratto: state => state.socket.estratto,
    status: state => state.socket.info
  })
}

</script>

<style scoped>

</style>
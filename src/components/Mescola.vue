<template>
  <div class="mescola h-100">
    <b-card
        no-body
        header="Mescola"
        header-tag="header"
        class="h-100 d-flex flex-column"
    >
<!--      <b-collapse visible id="collapse-3">-->
          <b-card-body >
            <b-row>
              <b-col>
                <p>
                  <b-form-checkbox
                  type="checkbox"
                  id="ruolo1"
                  name="ruolo1"
                  v-model="mescola.portieri"
                  >
                    Portieri</b-form-checkbox>
                </p>
                <p>
                  <b-form-checkbox
                      type="checkbox"
                      id="ruolo2"
                      name="ruolo2"
                      v-model="mescola.difensori"
                  >
                    Difensori</b-form-checkbox>
                </p>
                <p>
                  <b-form-checkbox
                      type="checkbox"
                      id="ruolo3"
                      name="ruolo3"

                      v-model="mescola.centrocampisti"

                  >
                    Centrocampisti</b-form-checkbox>
                </p>
                <p>
                  <b-form-checkbox
                      type="checkbox"
                      id="ruolo4"
                      name="ruolo4"
                      v-model="mescola.attaccanti"
                  >
                    Attaccanti</b-form-checkbox>
                </p>

              </b-col>
              <b-col sm="6">
                <p>
                  <b-form-checkbox
                      id="order"
                      name="order"
                      v-model="mescola.alfabetico"
                      >Ordine alfabetico</b-form-checkbox>


                </p>

              </b-col>

            </b-row>


          </b-card-body>
          <b-card-footer>
            <b-button v-on:click="mescola_giocatori()">Mescola</b-button>
          </b-card-footer>
<!--      </b-collapse>-->
  </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {

    };
  },
  methods: {
    mescola_giocatori: function () {
      axios.post(`${process.env.VUE_APP_API}mescola`, `portieri=${this.mescola.portieri}&attaccanti=${this.mescola.attaccanti}&centrocampisti=${this.mescola.centrocampisti}&difensori=${this.mescola.difensori}&alfabetico=${this.mescola.alfabetico}`).then(
        response => {

          this.$store.commit('setMescola',this.mescola);
          this.$store.dispatch('setStatus');
        }).catch(e=> console.log(e));
      //this.status();
    },

  },
  computed: {
    mescola: function (){
      return this.$store.getters.getMescola;
    },
  },
  mounted(){

  }

};
</script>
<style scoped>

</style>

<!--<style lang="scss">-->
<!--.mescola {-->
<!--  .main {-->
<!--    height: 100%;-->
<!--    .mescola_left,-->
<!--    .mescola_right {-->
<!--      width: 50%;-->
<!--      div {-->
<!--        padding: 5px 10px;-->
<!--        input {-->
<!--          margin-right: 10px;-->
<!--        }-->
<!--      }-->
<!--      .buttons {-->
<!--        button {-->
<!--          padding: 5px 5px;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--    -->
<!--  }-->
<!--}-->
<!--</style>-->

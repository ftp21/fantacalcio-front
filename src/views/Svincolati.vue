<template>
    <div class="container flex flex-col">
      <div class="input_squadra">
        <h2>Cerca Giocatore:</h2>
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Cerca giocatore"></b-form-input>
      </div>
      <b-card no-body>
        <b-tabs card>

          <b-tab title="Portieri" active>

            <b-card-text>
              <b-table ref="table" :items="svincolati.portieri" :fields="fields"  :filter="filter" striped>
                <template v-slot:cell(acquista)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <p><b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id)">Acquista</b-button></p>
                </template>
              </b-table>
            </b-card-text>
          </b-tab>
          <b-tab title="Difensori">
            <b-card-text>
              <b-table :items="svincolati.difensori" :fields="fields"  :filter="filter">
                <template v-slot:cell(acquista)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id)">Acquista</b-button>
                </template>
              </b-table>
              <!--              <b-table :items="svincolati.difensori" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
          <b-tab title="Centrocampisti">
            <b-card-text>
              <b-table :items="svincolati.centrocampisti" :fields="fields"  :filter="filter">
                <template v-slot:cell(acquista)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id)">Acquista</b-button>
                </template>
              </b-table>
              <!--              <b-table :items="svincolati.centrocampisti" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
          <b-tab title="Attaccanti">
            <b-card-text>
              <b-table :items="svincolati.attaccanti" :fields="fields"  :filter="filter">
                <template v-slot:cell(acquista)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id)">Acquista</b-button>
                </template>
              </b-table>
              <!--              <b-table :items="svincolati.attaccanti" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <b-modal id="modal-1" title="BootstrapVue" @ok="acquista(id_giocatore_acquisto)" @cancel="id_giocatore_acquisto=0">
        <p class="my-4">Il giocatore verrà acquistato dalla squadra: </p>
        <b-form-select v-model="squadra_acquisto">
          <option v-for="squadra in squadre" :key="squadra.id" v-bind:value='squadra.id' >{{squadra.nome}}</option>
        </b-form-select>
        <p>a questo prezzo</p>
        <b-form-input v-model="prezzo_acquisto" placeholder="Prezzo d'acquisto"></b-form-input>
      </b-modal>

      <!--      <Tabelle :squadre='squadre' :svincolati="svincolati" @recallApi="svincolatiAll"></Tabelle>-->
    </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Svincolati",
  components: {
  },
  data() {
    return {
      prezzo_acquisto: 0,
      squadra_acquisto: "",
      svincolati: [],
      filter: "",
      fields: [
        // 'id_fanta_squadra',
        // 'fanta_squadra',
       // 'id',
        // 'id_giocatore',
        'nome_giocatore',
        'squadra',
        'acquista'
        //'ruolo',
        //'campioncino',
        //"campioncino"
      ],

      id_giocatore_acquisto: 0
    };
  },
  methods:{
    acquista:function (){

      axios.post(`${process.env.VUE_APP_API}mercato/acquista/${this.id_giocatore_acquisto}`,
          `id_squadra=${this.squadra_acquisto}&crediti=${this.prezzo_acquisto}`).then(response=>{
        this.$store.dispatch('setStatus');
        this.getSvincolati();
        this.showToast();

      }).catch(error=>{
        //console.log(error.response.data.detail)
        this.showError(error.response.data.detail);
      });
    },
    showToast: function (){
      this.$bvToast.toast('Il giocatore X è stato acquistato da y a z crediti', {
        autoHideDelay: 2000,
        title: 'Giocatore acquistato correttamente',
        headerClass: 'header-toast',
        variant: 'success'
      })
    },
    showError: function (error) {
      this.$bvToast.toast(error, {
        autoHideDelay: 2000,
        title: 'Errore nell\'acquisto',
        headerClass: 'header-toast',
        variant: 'danger'
      })
    },
    setModal(id){
      this.id_giocatore_acquisto=id;
    },
    getSvincolati(){
      axios.get(`${process.env.VUE_APP_API}svincolati`).then(response=>{
        // //console.log(response.data);
        this.svincolati = response.data;
      })
    }
  },
  mounted() {
    // axios.get(`${process.env.VUE_APP_API}squadre`).then((response) => {
    //   // //console.log(response.data);
    //   let squadre = response.data;
    //   // //console.log(squadre);
    //   squadre.forEach((element) => {
    //     this.squadre.push(element);
    //   });
    // });
    this.getSvincolati();
  },
  computed: {
    squadre: function () {
      return this.$store.getters.getSquadre;
    },
  }
};
</script>

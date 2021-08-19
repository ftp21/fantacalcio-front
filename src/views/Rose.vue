<template>
  <div>
    <div class="container flex flex-col" style="padding-top: 10px">

      <div class="input_squadra">
        <b-form-group>
          <h2>Seleziona Squadra:</h2>
          <b-form-select name="squadra" v-model="squadra_id" @change='giocatori_squadra()'>
            <option v-for="squadra in squadre" :key="squadra.id" v-bind:value='squadra.id' >{{squadra.nome}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <h2>Crediti:</h2>
          <p>Crediti Rimanenti: {{this.crediti_rimanenti}}</p>
          <p>Crediti Spesi: {{this.crediti_spesi}}</p>
        </b-form-group>
        <b-form-group>
          <h2>Cerca Giocatore:</h2>
          <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Cerca giocatore"></b-form-input>
        </b-form-group>

      </div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Portieri" active>
            <b-card-text>
              <b-table ref="table" :items="rosa_attuale.portieri" :fields="fields"  :filter="filter">
                <template v-slot:cell(svincola)="data">
<!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id_giocatore)">Svincola</b-button>
                </template>
              </b-table>
            </b-card-text>
          </b-tab>
          <b-tab title="Difensori">
            <b-card-text>
              <b-table :items="rosa_attuale.difensori" :fields="fields"  :filter="filter">
                <template v-slot:cell(svincola)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id_giocatore)">Svincola</b-button>
                </template>
              </b-table>
<!--              <b-table :items="rosa_attuale.difensori" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
          <b-tab title="Centrocampisti">
            <b-card-text>
              <b-table :items="rosa_attuale.centrocampisti" :fields="fields"  :filter="filter">
                <template v-slot:cell(svincola)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id_giocatore)">Svincola</b-button>
                </template>
              </b-table>
<!--              <b-table :items="rosa_attuale.centrocampisti" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
          <b-tab title="Attaccanti">
            <b-card-text>
              <b-table :items="rosa_attuale.attaccanti" :fields="fields"  :filter="filter">
                <template v-slot:cell(svincola)="data">
                  <!--                  <b-button variant="danger" @click="deleteItem(data.item.id)">Delete</b-button>-->
                  <b-button variant="danger"  v-b-modal.modal-1 @click="setModal(data.item.id_giocatore)">Svincola</b-button>
                </template>
              </b-table>
<!--              <b-table :items="rosa_attuale.attaccanti" :fields="fields"></b-table>-->
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <div>

      </div>
      <b-modal id="modal-1" title="Svincola" @ok="svincola(id_giocatore_svincolo)" @cancel="id_giocatore_svincolo=0">
        <p class="my-4">Il giocatore verrà svincolato confermi? </p>
      </b-modal>


    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Rose",
  components: {
  },
  data() {
    return {
      showDismissibleAlert: false,
      filter: "",
      squadra_id:'',
      fields: [
          // 'id_fanta_squadra',
          // 'fanta_squadra',
          'crediti',
         // 'id_giocatore',
          'nome_giocatore',
          'squadra',
          //'ruolo',
          //'campioncino',
          "svincola"
     ],
      rosa_attuale: {
        'portieri' : [],
        'difensori' : [],
        'centrocampisti': [],
        'attaccanti' : []
      },
      id_giocatore_svincolo: 0,
      crediti_rimanenti: 0,
      crediti_spesi: 0
    };
  },
  methods:{
     
      giocatori_squadra:function(){
         axios.get(`${process.env.VUE_APP_API}rosa/${this.squadra_id}`).then((response) => {
       // //console.log(response.data);
           this.rosa_attuale.portieri = response.data.portieri;
           this.rosa_attuale.difensori = response.data.difensori;
           this.rosa_attuale.centrocampisti = response.data.centrocampisti;
           this.rosa_attuale.attaccanti = response.data.attaccanti;
           this.crediti_rimanenti=response.data.crediti_rimanenti;
           this.crediti_spesi=response.data.crediti_spesi;
       });
      },
    setModal(id){
        this.id_giocatore_svincolo=id;
    },
    svincola(id_giocatore){
      axios.post(`${process.env.VUE_APP_API}mercato/svincola/${id_giocatore}`).then(response=>{
        //console.log(response.data);
        this.$store.dispatch('setStatus');
        this.giocatori_squadra();
        this.$refs.table.refresh();

      })
    }
  },
  mounted() {
    // axios.get(`${process.env.VUE_APP_API}squadre`).then((response) => {
    //   // //console.log(response.data);
    //   let squadre = response.data;
    //   //console.log(squadre);
    //   squadre.forEach((element) => {
    //     this.squadre.push(element);
    //   });
    // });
  },
  computed: {
    squadre: function () {
      return this.$store.getters.getSquadre;
    },
  }
};
</script>

<!--<style lang="scss">-->
<!--.squadra {-->
<!--  width: 100%;-->
<!--}-->
<!--.input_squadra {-->
<!--  width: 100%;-->
<!--  select {-->
<!--    width: 100%;-->
<!--  }-->
<!--}-->
<!--</style>-->

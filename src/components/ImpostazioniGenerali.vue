<template>
  <div class='container' style="padding-top: 10px">
    <b-card bg-variant="light" class="">
      <b-form-group
          label-cols-lg="3"
          label="Impostazioni Asta"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
          content-cols-sm="6"
      >
        <b-form-group
            label="Portieri:"
            label-for="portieri"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input type="number" min=1 v-model=portieri id="portieri"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Difensori:"
            label-for="difensori"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input type="number" min=1 v-model=difensori id="difensori"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Centrocampisti:"
            label-for="centrocampisti"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input type="number" min=1 v-model=centrocampisti id="centrocampisti"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Attaccanti:"
            label-for="attaccanti"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input type="number" v-model=attaccanti min=1 id="attaccanti"></b-form-input>
        </b-form-group>
        <b-form-group
            label="Crediti totali:"
            label-for="crediti_totali"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input type="number" min=1 v-model=crediti id="crediti_totali"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Modificatori:"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-checkbox  v-model=raggruppa_portieri><span id="raggruppa_portieri">Raggruppa portieri</span></b-form-checkbox>
          <b-form-checkbox v-model=crediti_visibili><span id="crediti_visibili" >Nascondi crediti</span></b-form-checkbox>
        </b-form-group>

        <b-form-group
            label=""
            label-cols-sm="3"
            label-align-sm="right"
                    >
          <b-button @click="setConfig">Salva</b-button>

        </b-form-group>



      </b-form-group>
      <br/>
        <b-input-group prepend="Squadra" class="mt-3">
          <b-form-input v-model=nome_squadra></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="aggiungi_squadra()">Aggiungi</b-button>
          </b-input-group-append>
          <b-table ref="table"  :items="squadre" :fields="fields" >
            <template v-slot:cell(code)="data">

            </template>
            <template v-slot:cell(rimuovi)="data">
              <b-button variant="danger" v-b-modal.modal-cancellazione @click="setModal(data.item.id)"  >Cancella</b-button>
            </template>
            <template v-slot:cell(rinomina)="data">
              <b-button variant="info"  v-b-modal.modal-rinomina @click="setModal(data.item.id)">Rinomina</b-button>
            </template>
            <template v-slot:cell(share)="data">
              <p>
                <b-link :href="`https://${url}/personal/${data.item.code}`"><font-awesome-icon :icon="[ 'fab', 'link' ]" size="2x"></font-awesome-icon></b-link>
                <b-link :href="`whatsapp://send?text=https://${url}/personal/${data.item.code} Con questo link questa sera vedrai la situazione della tua rosa e dei tuoi crediti. ATTENZIONE: Il link è personale, non mostrarlo a gli altri partecipanti`"><font-awesome-icon :icon="[ 'fab', 'whatsapp-square' ]"  style="color: #25d366"  size="2x"></font-awesome-icon></b-link>
                <b-link :href="`tg://msg?text=https://${url}/personal/${data.item.code} Con questo link questa sera vedrai la situazione della tua rosa e dei tuoi crediti. ATTENZIONE: Il link è personale, non mostrarlo a gli altri partecipanti`"><font-awesome-icon :icon="[ 'fab', 'telegram' ]" style="color: #0088cc" size="2x"></font-awesome-icon></b-link>
              </p>

            </template>

          </b-table>
        </b-input-group>



    </b-card>





    <b-modal id="modal-cancellazione" title="Cancellazione squadra" @ok="cancella_squadra(id_squadra_cancellazione)" @cancel="id_squadra_cancellazione=0">
      <p class="h2">Tutti i giocatori della squadra verranno svincolati.
      </p>
      <p><h2>Confermi?</h2></p>

    </b-modal>

    <b-modal id="modal-rinomina" title="Rinomina squadra" @ok="rename_squadra()" @cancel="id_squadra_cancellazione=0">
      <p>Nuovo nome per la squadra:</p>
      <b-form-input v-model=new_nome_squadra></b-form-input>
    </b-modal>
    <b-tooltip target="raggruppa_portieri" placement="right" triggers="hover">Non verranno estratti i singoli portieri ma le squadre. Aggiornare il numero dei portieri in base a quante squadre si vuole acquistare</b-tooltip>
    <b-tooltip target="crediti_visibili" placement="right">Non visualizza le informazioni dei crediti nella pagina pubblica</b-tooltip>

  </div>
</template>
<script>
import axios from 'axios';




export default {
  data() {
    return {
      url: window.location.host,
      crediti: '',
      raggruppa_portieri: false,
      portieri: '',
      difensori: '',
      centrocampisti: '',
      attaccanti: '',
      crediti_visibili: false,
      fields: [
        //'id',
        'nome',
        'rimuovi',
          'rinomina',
          'share'
      ],
      id_squadra_cancellazione: 0,
      nome_squadra: "",
      new_nome_squadra: ""

    };
  },

  methods: {
    rename_squadra: function (index) {
      axios.put(`${process.env.VUE_APP_API}squadre/${this.id_squadra_cancellazione}`, `nome=${this.new_nome_squadra}`).then(response => {
        this.$store.dispatch('setSquadre');
        this.new_nome_squadra="";
      }).catch(e=>{
        console.log(e)})
    },
    cancella_squadra: function (index) {
      //console.log(idSquadra)
      axios.delete(`${process.env.VUE_APP_API}squadre/${this.id_squadra_cancellazione}`).then((response) => {
        this.$store.dispatch('setSquadre');
      })

    },
    aggiungi_squadra: function () {
      axios.post(`${process.env.VUE_APP_API}squadre`, `nome=${this.nome_squadra}`).then(
          response => {
            this.$store.dispatch('setSquadre');
          }).catch(e => alert(e));
    },
    setConfig: function () {
      axios.post(`${process.env.VUE_APP_API}configurazione`, `crediti_totali=${this.crediti}&raggruppa_portieri=${this.raggruppa_portieri}&portieri=${this.portieri}&difensori=${this.difensori}&centrocampisti=${this.centrocampisti}&attaccanti=${this.attaccanti}&crediti_nascosti=${this.crediti_visibili}`).then(
          response => {
            this.$bvToast.toast('Configurazione salvata correttamente', {
              autoHideDelay: 2000,
              title: 'Configurazione',
              headerClass: 'header-toast',
              variant: 'success'
            });
            //console.log(response);
          }).catch(e => alert(e));
    },

    getConfig: function () {
      axios.get(`${process.env.VUE_APP_API}configurazione`).then(
          response => {
            this.crediti=response.data.crediti_totali;
            this.portieri=response.data.portieri;
            this.difensori=response.data.difensori;
            this.centrocampisti=response.data.centrocampisti;
            this.attaccanti=response.data.attaccanti;
            this.raggruppa_portieri=response.data.raggruppa_portieri;
            this.crediti_visibili=response.data.nascondi_crediti;
            //console.log(response);
          }).catch(e => alert(e));
    },
    setModal(id){
      this.id_squadra_cancellazione=id;
    },
  },
  computed: {
    squadre: function (){
      return this.$store.getters.getSquadre;
    },
  },
  mounted() {
    this.getConfig();
    this.$store.dispatch('setSquadre');
  }

};
</script>
<style scoped>


</style>



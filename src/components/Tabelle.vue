<template>
  <div class="ruoli flex flex-col">
    <input type="text" v-model="filtro">
    <div class="ruoli_giocatore flex w-100" >
      <b-tabs >
        <b-tab title="All" class="ruolo_giocatore" @click="all_players()"></b-tab>
        <b-tab title="Portieri"class="ruolo_giocatore" @click="portieri()"></b-tab>
        <b-tab title="Difensori" class="ruolo_giocatore" @click="difensori()"></b-tab>
        <b-tab title="Centrocampisti" class="ruolo_giocatore" @click="centrocampisti()"></b-tab>
        <b-tab title="Attaccanti"class="ruolo_giocatore" @click="attaccanti()"></b-tab>
        <div class="tabella_giocatori">
          <table class="table">
            <thead>
            <tr class='row_giocatore'>
              <th scope="col">Nome Giocatore</th>
              <th scope="col">Crediti d'acquisto</th>
              <th scope="col">Ruolo</th>
              <th scope="col" v-if="currentRouteName === 'Svincolati'">Squadra</th>
              <th scope="col">{{currentRouteName === 'Svincolati' ? 'Assegna' : 'Svincola'}}</th>
            </tr>
            </thead>
            <tbody>
            <tr class='row_giocatore' :key='giocatore.id' v-for='(giocatore,index) in filteredPlayers' v-if="giocatore.ruolo === ruolo || ruolo === ''">
              <td scope="row">{{giocatore.nome_giocatore}}</td>
              <td scope="row" v-if="currentRouteName === 'Rose'">{{giocatore.crediti}}</td>
              <td scope="row" v-else>
                <input type="number" min="0" v-model.number="crediti_acquisto[index]">
              </td>
              <td scope="row">{{giocatore.ruolo}}</td>
              <td v-if="currentRouteName === 'Svincolati'">
                <select name="" id="" v-model="squadra_id_test[index]" >
                  <option :key="squadra.id" v-for="squadra of squadre" v-bind:value="squadra.id">
                    {{ squadra.nome }}
                  </option>
                </select>
              </td>
              <b-button @click="svincola(giocatore.id, squadra_id_test, crediti_acquisto, index)">{{currentRouteName === 'Svincolati' ? 'Assegna' : 'Svincola'}}</b-button>
            </tr>
            </tbody>
          </table>
        </div>
      </b-tabs>

    </div>
    

  </div>
</template>
<script>
import axios from "axios";

export default {
props: ['squadre','squadra_id', 'rosa_attuale'],
data(){
    return {
      ruolo: '',
      crediti_acquisto: {},
      squadra_id_test: {},
      filtro:'',
    }
},
methods: {
  
  portieri: function(){
    this.ruolo = 'Portiere';
  },
  all_players: function(){
    this.ruolo = '';
  },
  difensori: function(){
    this.ruolo = 'Difensore';
  },
  attaccanti: function(){
  this.ruolo = 'Attaccante';
  },
  centrocampisti: function(){
  this.ruolo = 'Centrocampista';
  },
  svincola: function (id,squadra_id_test, crediti_acquisto, index){
    if(this.currentRouteName === 'Rose'){
      axios.put(`${process.env.VUE_APP_API}mercato/svincola/${id}`).then(response=>{
        //console.log(response.data);

      })
    }
    else if(this.currentRouteName === 'Svincolati'){
      axios.put(`${process.env.VUE_APP_API}mercato/acquista/${id}`, `squadra=${squadra_id_test[index]}&costo=${crediti_acquisto[index]}`).then(response=>{
        //console.log(response.data);
        axios.get(`${process.env.VUE_APP_API}listone`).then(response=>{
          //console.log(response.data);
          let giocatori = response.data;
          giocatori.forEach(element => {
            if(element.id == id){
              let nome = element.nome_giocatore;
              (this.squadre).forEach(squadra => {
                //console.log(squadra.id);
                //console.log(squadra_id_test[index]);
                if(squadra.id == squadra_id_test[index]){
                  let nome_squadra = squadra.nome;
                  alert(`il giocatore ${nome} e' stato acquistato da ${nome_squadra}`)
                  this.squadra_id_test[index] = {};
                  this.crediti_acquisto[index] = {};
                }
              })
            }
          });

        })
      }).catch(error=>{
        //console.log(error);
        alert(error.detail);
      })
    }
    //console.log(this.$emit('recallApi'))
    this.$emit('recallApi');
  },
  capitalizeFLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
},
  computed: {
     currentRouteName() {
        return this.$route.name;
    },
    filteredPlayers: function(){
      if(this.rosa_attuale){
       return this.rosa_attuale.filter((giocatore) => {
         console.log(         this.capitalizeFLetter(this.filtro)
       )
         return giocatore.nome_giocatore.match(this.capitalizeFLetter(this.filtro));
       })}
       else {
         return []
       }
    }
  },
};
</script>

<style lang="scss">
.ruoli {
  width: 100%;
  height: 300px;
  .ruoli_giocatore {
    margin-top:25px;
    margin-bottom:-2px;
    margin-right:1rem;
    margin-left: 1rem;
    justify-content: space-between;
    .ruolo_giocatore {
      width: 20%;
      height: 30px;
      border:none;
      opacity:0.6;
      &:hover{
        opacity:1;
        border:solid 1px #595959;
        background-color:#cccccc;
        cursor: pointer;
      }
    }
  }

  .tabella_giocatori {
    width: 100%;
    margin-top:0;
    table {
      width: 100%;
      .row_giocatore{
        background-color: white;
      }
    }
  }
}
</style>
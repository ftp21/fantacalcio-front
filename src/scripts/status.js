import axios from "axios";

const getStatus =
    axios.get(`${process.env.VUE_APP_API}status`).then(response=>{
        this.$store.commit('setGiocatoreAttuale', response.data.estratto);
        this.$store.commit('setUltimoAcquisto', response.data.ultimo_acquisto);

    })

export default { getStatus }
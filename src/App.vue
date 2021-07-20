<template>
  <div id="app" class="app">
    <Navbar v-if=homePage() ></Navbar>
  <router-view />
  </div>
</template>

<script>
import store from './store';
import Navbar from "./components/Navbar.vue";



export default {
  name: "App",
  store: store,
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Asta Fantacalcio',
  },
  methods:{
    homePage() {
      if(this.$route.path == "/public" ) {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    Navbar,

  },
  created() {
  },
  computed: {

	},
	mounted() {
    if(this.$route.path != "/public" ) {
      this.$store.dispatch('setStatus');
      this.$store.dispatch('setSquadre');
    }

	},
};
</script>


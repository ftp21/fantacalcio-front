<template>
  <div id="app" class="app">
    <Navbar></Navbar>
  <router-view />
  </div>
</template>

<script>
import store from './store';
import Navbar from "./components/Navbar.vue";



export default {
  name: "App",
  store: store,

  components: {
    Navbar,

  },
  created() {
    document.title = "Fantacalcio"
  },
  computed: {

	},
	mounted() {
    this.$store.dispatch('setStatus');
    this.$store.dispatch('setSquadre');


	},
};
</script>


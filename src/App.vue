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
  methods:{
    homePage() {
      if(this.$route.path.includes('/manage/')  ) {
        return true
      } else {
        return false
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
    if(this.$route.path != "/public" || !this.$route.path.includes('/personal/') ) {
      this.$store.dispatch('setStatus');
      this.$store.dispatch('setSquadre');
    }

	},
};
</script>


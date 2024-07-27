<template>
  <b-navbar type="dark" variant="dark" >
    <b-navbar-brand href="/manage/index">Home</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/manage/rose">Rose</b-nav-item>
      <b-nav-item to="/manage/svincolati">Svincolati</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" >
      <b-nav-item to="/manage/upload_listone">Upload Listone</b-nav-item>
      <b-nav-item to="/manage/impostazioni">Impostazioni</b-nav-item>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          Download
        </template>
        <b-dropdown-item :href="svincolati">Svincolati</b-dropdown-item>
        <b-dropdown-item :href="fanta" target="_blank">File Fantagazzetta</b-dropdown-item>
        <b-dropdown-item :href="listone">Listone</b-dropdown-item>
        <b-dropdown-item :href="acquisti">Rose</b-dropdown-item>
      </b-nav-item-dropdown>

    </b-navbar-nav>

  </b-navbar>
</template>
<script>

export default {
  name: "Navbar",

  components: {
  },
  data(){
    return {
      svincolati: '',
      fanta: '',
      listone: '',
      acquisti: ''
    }
  },
  computed: {

  },
  mounted() {
    this.svincolati=this.$apiBaseUrl+'export/svincolati';
    this.fanta=this.$apiBaseUrl+'export/fanta';
    this.listone=this.$apiBaseUrl+'export/listone';
    this.acquisti=this.$apiBaseUrl+'export/acquisti';

  },
  created() {
  },
  methods: {

  }
};
</script>

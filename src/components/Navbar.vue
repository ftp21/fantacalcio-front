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
    this.svincolati=process.env.VUE_APP_API+'export/svincolati';
    this.fanta=process.env.VUE_APP_API+'export/fanta';
    this.listone=process.env.VUE_APP_API+'export/listone';
    this.acquisti=process.env.VUE_APP_API+'export/acquisti';

  },
  created() {
  },
  methods: {

  }
};
</script>

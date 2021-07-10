<template>
  <b-navbar type="dark" variant="dark" >
    <b-navbar-brand href="/">Home</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/rose">Rose</b-nav-item>
      <b-nav-item to="/svincolati">Svincolati</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" >
      <b-nav-item to="/impostazioni">Impostazioni</b-nav-item>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          Download
        </template>
        <b-dropdown-item href="#">Svincolati</b-dropdown-item>
        <b-dropdown-item href="#">File Fantagazzetta</b-dropdown-item>
        <b-dropdown-item href="#">Listone</b-dropdown-item>
        <b-dropdown-item href="#">Zip unico</b-dropdown-item>
      </b-nav-item-dropdown>

    </b-navbar-nav>

  </b-navbar>
</template>


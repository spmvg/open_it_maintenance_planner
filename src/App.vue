<template>
  <div id="app">
    <NavBar style="navbar" />
    <div class="container-fluid px-0 mx-0">
      <div class="row px-0 mx-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './generic/NavBar.vue';

  export default {
    name: 'App',
    components: {
      NavBar
    }
  }
</script>

<style>
  @import 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap';
  @import 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap';

  .navbar {
    height: 56px;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ddd;
    background-color: #181c20;
  }

  html, body {
    background-color: #181c20 !important;
  }

  p, span {
    font-family: "Roboto", serif;
  }
  li, ul {
    font-family: "Roboto", serif;
  }
  h1 {
    font-family: "Open Sans", sans-serif;
  }
  h2 {
    font-family: "Open Sans", sans-serif;
  }
  h3 {
    font-family: "Open Sans", sans-serif;
  }
  h4 {
    font-family: "Open Sans", sans-serif;
  }
  h5 {
    font-family: "Open Sans", sans-serif;
  }
  h6 {
    font-family: "Open Sans", sans-serif;
  }
  caption {
    font-family: "Open Sans", sans-serif;
  }

  .left-aligned-col {
    text-align: left;
  }

  .centered-col {
    text-align: center;
  }

  .centered-span {
    font-size: 20pt;
    vertical-align: middle;
  }

  .settings-box {
    background-color:rgb(43, 43, 43);
    align-items: center;
    display: flex;
    justify-content: center;
  }


  .small-link {
    font-size: 12px;
    color: #bbb;
  }
  .small-link:hover {
    color: #eee;
  }
</style>

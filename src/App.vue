<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import AOS from 'aos'


export default {
  name: 'App',

  created() {
    AOS.init()

  },

  mounted(){
    AOS.refresh();
  }
}
</script>

<style lang="sass">
  @import "./assets/all";
</style>

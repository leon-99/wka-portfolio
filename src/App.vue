<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Import mobile scroll handler
import './utils/mobileScrollHandler'
</script>

<style scoped>
#app {
  min-height: 100vh;
  position: relative;
}
</style>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Navbar/>
  <RouterView />
  <Footer />
</template>

<style scoped>
</style>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Navbar v-if="$route.name !== 'Login'"/>
  <RouterView />
</template>

<style scoped>
</style>

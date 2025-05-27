<template>
  <v-app>
    <AppBar v-if="route.name !== 'Login'" />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './components/AppBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.background {
  background-color: #18181c;
}
</style>

<template>
  <v-app>
    <v-main style="background-color: #18181c;">
      <v-container class="fill-heigh" style="max-width: 900px;">
        <Timeline />
        <PostForm />
      </v-container>
    </v-main>
</v-app>
</template>

<script lang="ts" setup>
import Timeline from '@/components/Timeline.vue'
import PostForm from '../../components/PostForm.vue'
</script>

<style scoped>
h1 {
  color: #a50034;
}

.bar-margin {
  margin-left: 340px;
  margin-right: 340px;
}

.subcard {
  background-color: black !important;
  color: white !important;

}
</style>

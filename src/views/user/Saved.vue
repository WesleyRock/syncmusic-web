<template>
  <v-container fluid>
    <h2 class="mb-4 title_color">Posts Salvos</h2>

    <v-card
      v-for="post in savedPosts"
      :key="post.id"
      class="mb-4 pa-4 card_background"
    >
      <v-row no-gutters align="center">
        <v-avatar size="48">
          <v-img :src="post.user.avatar || 'https://i.pravatar.cc/150'" />
        </v-avatar>
        <div class="ml-3">
          <div class="font-weight-bold text_white">{{ post.user.name }}</div>
          <div class="text-caption text_white">
            {{ dayjs(post.created_at).fromNow() }}
          </div>
        </div>
      </v-row>
      <v-card-text class="mt-2 text_white">
        <div>{{ post.content }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn icon color="white">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <span class="text_white"></span>

        <v-btn icon color="white">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <span class="text_white"></span>

         <v-btn 
          icon 
          color="green"
          @click="removeFromSaved(post.id)" 
          >
            <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchSavedPosts, toggleSaved } from '../../services/saved';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const savedPosts = ref<any[]>([]);

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const removeFromSaved = async (postId: number) => {
  try {
    await toggleSaved(postId);
    savedPosts.value = savedPosts.value.filter(p => p.id !== postId);
   
  } catch (error) {
     console.log(postId)
    console.error('Erro ao remover dos salvos:', error);
  }
};

onMounted(async () => {
  const { data } = await fetchSavedPosts();
  savedPosts.value = data;
});

</script>

<style scoped>
.card_background {
  background-color: black;
}

.text_white {
  color: white;
}

.title_color {
  color: green;
}
</style>

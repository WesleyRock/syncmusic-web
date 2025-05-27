
<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        size="large"
        color="#4caf50"
        class="fab"
      >
        <v-icon size="32">mdi-music</v-icon>
      </v-btn>
    </template>

    <v-card color="black">
       <v-btn icon elevation="0" color=black> 
          <v-icon @click="dialog = false" size="small">mdi-close</v-icon>
        </v-btn>
      <v-card-title class="text-h6 green_main">
        Criar uma publicação
      </v-card-title>

      <v-card-text>
        <v-textarea
          v-model="content"
          label="O que você está pensando?"
          auto-grow
          counter="280"
          maxlength="280"
        ></v-textarea>

       <!--<v-text-field
          v-model="searchQuery"
          append-inner-icon="mdi-magnify"
          label="Buscar música"
           @update:search-input="handleSearch"
          variant="solo"
          bg-color="#18181c"
          class="mb-4"
        />

        <v-list v-if="searchResults.length">
          <v-list-item
            v-for="(track, index) in searchResults"
            :key="index"
          >
            <v-avatar>
              <v-img :src="track.album.images[0]?.url"></v-img>
            </v-avatar>

            <v-list-item-title>{{ track.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ track.artists[0]?.name }}
            </v-list-item-subtitle>

            <template v-slot:append>
              <v-btn
                icon="mdi-play"
                v-if="track.preview_url"
                :href="track.preview_url"
                target="_blank"
                variant="text"
              ></v-btn>
              <v-btn
                icon="mdi-spotify"
                :href="track.external_urls.spotify"
                target="_blank"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>-->
      </v-card-text>

      <v-autocomplete
        v-model="selectedMusic"
        :items="searchResults"
        item-title="name"
        item-value="id"
        label="Selecione uma música"
        placeholder="Busque por nome ou artista"
        :loading="loading"
        bg-color="#18181c"
        clearable
        append-inner-icon="mdi-magnify"
        @click:append-inner="handleSearch"
      >
        <template v-slot:item="{ item, props }">
          <v-list-item v-bind="props">
            <v-list-item-avatar>
              <v-img :src="item.raw.album.images[0]?.url" />
            </v-list-item-avatar>
            <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.raw.artists[0]?.name }}</v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-card-actions class="justify-end">
        <v-btn color="#4caf50" class="text-body-1" @click="handlePost">Postar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createPost } from '../services/post';
import emitter from '../eventBus';
import { searchMusic } from '../services/spotify';
import type { TrackType } from '../types/TrackType';

const dialog = ref(false);
const content = ref('');
const music = ref('');

const searchQuery = ref('');
const searchResults = ref<TrackType[]>([]);
const selectedMusic = ref<any>(null);
const loading = ref(false);


const handleSearch = async (query: string) => {
  if (!query) {
    searchResults.value = [];
    return;
  }

  loading.value = true;
  try {
    const results = await searchMusic(query);
    searchResults.value = results;
  } catch (error) {
    console.error('Erro na busca de músicas', error);
  } finally {
    loading.value = false;
  }
};

const handlePost = async () => {
  if (!content.value) return;

  try {
    await createPost({
      content: content.value,
      music: music.value || null,
    });

    // Emite o evento para atualizar a timeline
    emitter.emit('postCreated');

    // Reset
    content.value = '';
    music.value = '';
    dialog.value = false;
  } catch (error) {
    console.error('Erro ao criar post', error);
  }
};


</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 60px;
  right: 80px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
}

.green_main {
  color: #1eaf23;
}

.btn_text {
  font-family: sans-serif !important;
}
</style>

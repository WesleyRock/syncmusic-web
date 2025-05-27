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
      <v-btn icon elevation="0" color="black" @click="dialog = false">
        <v-icon size="small">mdi-close</v-icon>
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
          bg-color="#18181c"
        />

        <v-autocomplete
          v-model="selectedMusic"
          :items="musics"
          item-title="nameMusic"
          item-value="id"
          label="Selecione uma música"
          placeholder="Escolha uma música"
          bg-color="#18181c"
          clearable
        >
          <template v-slot:item="{ item, props }">
            <v-list-item v-bind="props">
              <v-list-item-avatar>
                <v-img :src="item.image" />
              </v-list-item-avatar>
              <v-list-item-title>{{ item.nameMusic }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.nameArtist }}</v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="#4caf50" class="text-body-1" @click="handlePost">
          Postar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import emitter from '../eventBus';
import { createPost } from '../services/post';
import { fetchMusics } from '../services/music';

const dialog = ref(false);
const content = ref('');
const selectedMusic = ref<any>(null);
const musics = ref([]);

onMounted(async () => {
  const { data } = await fetchMusics();
  musics.value = data;
});

const handlePost = async () => {
  if (!content.value) return;

  const music = selectedMusic.value
    ? musics.value.find((m: any) => m.id === selectedMusic.value)
    : null;

  try {
    await createPost({
      content: content.value,
      music: music,
    });

    emitter.emit('postCreated');

    content.value = '';
    selectedMusic.value = null;
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
</style>

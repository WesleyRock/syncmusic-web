
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

        <v-text-field
          v-model="music"
          label="Escolha uma Música (opcional)"
          prepend-inner-icon="mdi-music"
        ></v-text-field>
      </v-card-text>

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

const dialog = ref(false);
const content = ref('');
const music = ref('');

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

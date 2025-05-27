<template>
  <v-container>
    <v-card class="mb-4 pa-4 card_background" v-for="post in filteredPosts" :key="post.id">
      <v-row align="center">
        <v-col cols="6" class="d-flex">
          <v-avatar size="48">
            <v-img :src="post.user.avatar"></v-img>
          </v-avatar>
          <div class="ml-3">
            <div class="font-weight-bold text_white">{{ post.user.name }}</div>
            <div class="text-caption text_white">{{ dayjs(post.created_at).fromNow() }}</div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="ml-3 d-flex justify-end">
            <v-btn icon color="black" @click="openEditDialog(post)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              color="black"
              v-if="post.user.id === currentUserId"
              @click="handleDelete(post.id)">
                <v-icon v-icon color="red">mdi-delete-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-card-text class="mt-2 text_white">
        <div>{{ post.content }}</div>

        <div v-if="post.music" class="mt-3">
          <v-card :color="post.music.colorCard">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="text-h5">
                      {{ post.music.nameMusic }}
                    </v-card-title>

                    <v-card-subtitle>{{ post.music.nameArtist }}</v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        class="ms-2"
                        icon="mdi-play"
                        variant="text"
                      ></v-btn>
                    </v-card-actions>
                  </div>

                  <v-avatar
                    class="ma-3"
                    rounded="0"
                    size="125"
                  >
                    <v-img :src="post.music.image"></v-img>
                  </v-avatar>
                </div>
              </v-card>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :icon="isPostLiked(post.id) ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="isPostLiked(post.id) ? 'red' : 'white'"
          variant="text"
          @click="toggleLike(post)"
        ></v-btn>
        <span class="text_white">{{ post.likes_count }}</span>
        <v-btn icon color="white">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <span class="text_white">{{ post.comments_count }}</span>

        <v-btn 
          icon 
          :color="post.isSaved ? 'green' : 'white'"
          @click="toggleSave(post)" 
          >
            <v-icon v-if="post.isSaved">mdi-bookmark</v-icon>
            <v-icon v-else>mdi-bookmark-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="editDialog" width="500">
      <v-card color="black">
        <v-card-title class="text-h6 green_main">
          Editar Publicação
        </v-card-title>

        <v-card-text>
          <v-textarea
            v-model="editedContent"
            label="Conteúdo"
            auto-grow
            counter="280"
            maxlength="280"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="editDialog = false">Cancelar</v-btn>
          <v-btn color="#4caf50" @click="handleEdit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getPosts, deletePost  } from '../services/post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { likePost, unlikePost } from '../services/like';
import emitter from '../eventBus';
import { computed } from 'vue';
import { useSearchStore } from '../stores/search';
import { toggleSaved } from '../services/saved';
import { updatePost } from '../services/post'

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

const posts = ref<any[]>([]);
const likedPosts = ref<number[]>([]);
const isPostLiked = (postId: number) => likedPosts.value.includes(postId);
const currentUserId = Number(localStorage.getItem('user_id'));
const searchStore = useSearchStore();

const editDialog = ref(false)
const editedContent = ref('')
const editingPostId = ref<number | null>(null)

const fetchPosts = async () => {
  try {
    const response = await getPosts();
    posts.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar posts', error);
  }
};

const filteredPosts = computed(() => {
  if (!searchStore.search) {
    return posts.value;
  }
  return posts.value.filter(post =>
    post.content.toLowerCase().includes(searchStore.search.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchStore.search.toLowerCase())
  );
});

const toggleLike = async (post: any) => {
  try {
    if (isPostLiked(post.id)) {
      await unlikePost(post.id);
      likedPosts.value = likedPosts.value.filter((id) => id !== post.id);
      post.likes_count = Math.max(post.likes_count - 1, 0); // Evita número negativo
    } else {
      await likePost(post.id);
      likedPosts.value.push(post.id);
      post.likes_count++;
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;

      if (status === 409) {
        console.warn('Post já estava curtido, sincronizando estado...');
        if (!isPostLiked(post.id)) {
          likedPosts.value.push(post.id);
          post.likes_count++;
        }
      } else {
        console.error('Erro na requisição:', error.response.data);
      }
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
};

const handleDelete = async (postId: number) => {
  try {
    await deletePost(postId);
    posts.value = posts.value.filter(p => p.id !== postId);
  } catch (error) {
    console.error('Erro ao deletar post', error);
  }
};

const toggleSave = async (post: any) => {
  try {
    await toggleSaved(post.id);
    post.isSaved = !post.isSaved;
  } catch (error) {
    console.error('Erro ao salvar:', error);
  }
};

const openEditDialog = (post: any) => {
  editingPostId.value = post.id
  editedContent.value = post.content
  editDialog.value = true
}

const handleEdit = async () => {
  if (!editingPostId.value) return;

  try {
    await updatePost(editingPostId.value, { content: editedContent.value });
    const post = posts.value.find(p => p.id === editingPostId.value);
    if (post) post.content = editedContent.value;

    editDialog.value = false;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
  }
};

onMounted(fetchPosts);


onMounted(() => {
  emitter.on('postCreated', fetchPosts);
});

onUnmounted(() => {
  emitter.off('postCreated', fetchPosts);
});

</script>

<style scoped>
.card_background {
  background-color: black;
}

.text_white {
  color: white;
}
</style>

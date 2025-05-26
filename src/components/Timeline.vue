<template>
  <v-container>
    <v-card class="mb-4 pa-4 card_background" v-for="post in posts" :key="post.id">
      <v-row no-gutters align="center">
        <v-avatar size="48">
          <v-img :src="post.user.avatar"></v-img>
        </v-avatar>
        <div class="ml-3">
          <div class="font-weight-bold text_white">{{ post.user.name }}</div>
          <div class="text-caption text_white">{{ post.time }}</div>
        </div>
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
          :class="fav ? 'text-red' : 'text-white'"
          icon="mdi-heart"
          variant="text"
          @click="fav = !fav"
                  >
        </v-btn>
        <span class="text_white">{{ post.likes }}</span>

        <v-btn icon color="white">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <span class="text_white">{{ post.comments }}</span>

         <v-btn icon color="white">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const posts = [
  {
    id: 1,
    user: { name: 'Wesley', avatar: 'https://i.pravatar.cc/150?img=3' },
    time: '5 minutos atrás',
    content: 'Curtindo muito essa playlist hoje!',
    music: { 
      nameMusic: 'Halcyon Days', 
      nameArtist: 'Ellie Goulding', 
      image: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png', 
      colorCard: '#952175'
    },
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    user: { name: 'Ana', avatar: 'https://i.pravatar.cc/150?img=5' },
    time: '2 horas atrás',
    content: 'Essa música me salvou hoje 🔥',
    music: { 
        nameMusic: 'Supermodel', 
        nameArtist: 'Foster the People', 
        image: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg', 
        colorCard: '#1F7087'
      },
    likes: 20,
    comments: 5,
  },
  {
    id: 3,
    user: { name: 'Lucas', avatar: 'https://i.pravatar.cc/150?img=8' },
    time: 'Ontem',
    content: 'Descobri esse som hoje e já virou vício 🎧',
    music: { 
        nameMusic: 'Midnight Queen', 
        nameArtist: 'Sarcófago', 
        image: 'https://i.pinimg.com/736x/3d/80/b9/3d80b941218f367b53dbdc1d4b621111.jpg', 
        colorCard: '#01074e'
      },
    likes: 30,
    comments: 8,
  },
]
const fav = ref(false)

</script>

<style scoped>
.card_background {
  background-color: black;
}

.text_white {
  color: white;
}
</style>

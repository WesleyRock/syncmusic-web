<template>
  <v-container fluid>
    <v-card class="pa-4 ma-10" rounded="lg" color="black">
      <v-card-title class="text-h4 mb-6 font-weight-bold ">Meu Perfil</v-card-title>
      <v-row align="center">
        <v-row class="ml-5">
          <v-col cols="1" class="d-flex justify-center">
            <v-avatar size="170" >
              <v-img :src="profile.avatar || 'https://i.pravatar.cc/150'" />
            </v-avatar>
          </v-col>
          <v-col cols="10" class="ml-5">
            <div>
              <p class="font-weight-bold title_color">Nome</p>
              <v-text-field
                :model-value="profile.name"
                variant="solo"
                bg-color="#18181c"
                width="640"
                readonly
              ></v-text-field>
            </div>
            <div>
              <p class="font-weight-bold title_color">Email</p>
              <v-text-field
                :model-value="profile.email"
                variant="solo"
                bg-color="#18181c"
                width="640"
                readonly
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <p class="font-weight-bold title_color">Descrição</p>
            <v-textarea class="mr-10" label="Digite!" variant="solo-filled" bg-color="#18181c"></v-textarea>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
    <v-card color="black" class="mx-15">
      <h3 class="mb-4 mt-5 mx-15 title_color">Meus Posts</h3>
      <v-card
        v-for="post in profile.posts"
        :key="post.id"
        class="mb-4 mx-16 pa-4 bg_color"
      >
        <small>{{ dayjs(post.created_at).fromNow() }}</small>
        <div class="mt-3 ml-2">{{ post.content }}</div>
        <v-card-actions>
        <v-btn
          icon="mdi-heart"
          color="white"
          variant="text"
        ></v-btn>
        <span class="text_white"></span>
        <v-btn icon color="white">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <span class="text_white"></span>

         <v-btn icon color="white">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { fetchMyProfile } from '../../services/user';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const profile = ref<any>({ posts: [] });
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

onMounted(async () => {
 const { data } = await fetchMyProfile();
    profile.value = {
    ...data,
    posts: data.posts.sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  };
});

</script>
<style scoped>
.card_background {
  background-color: black;
  color: white;
}
.bg_color {
  background-color: #18181c !important;
  color: white;
}

.title_color {
  color: green;
}
</style>


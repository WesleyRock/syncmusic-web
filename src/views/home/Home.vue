<template>
  <v-app>
    <v-app-bar
      app
      color="#111112"
    >
      <v-container class="d-flex justify-center align-center bar-margin">
        <v-row>
          <v-col cols="2" class="d-flex mt-2">
            <v-icon class="ml-5 mr-1" size="x-large" color="green">mdi-spotify</v-icon>
            <v-app-bar-title>SyncMusic</v-app-bar-title>
          </v-col>
          <v-col cols="3" class="d-flex mt-3">
            <h4>Suporte</h4>
            <h4 class="ml-5">Feedback</h4>
          </v-col>
          <v-col cols="7" class="d-flex justify-end">
            <v-text-field
              append-inner-icon="mdi-magnify"
              max-width="200"
              height="50"
              density="compact"
              label="Pesquisar"
              variant="solo"
              class="mr-8 "
              bg-color="black"
              hide-details
              single-line
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="bottom"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon> 
              <v-icon v-bind="props" size="x-large">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card min-width="300" class="subcard">
            <v-list class="subcard">
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                subtitle="@santhewes"
                title="Wesley Rock"
              >
              </v-list-item>
            </v-list>
            <v-list
              :lines="false"
              density="compact"
              class="subcard"
              nav
            >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="#1DB954"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
           <v-list class="subcard">
              <v-list-item
                title="Sair"
              >
                  <template v-slot:prepend>
                <v-icon icon="mdi-logout "></v-icon>
              </template>
              </v-list-item>
            </v-list>
        </v-card>
      </v-menu>
    </v-container>
  </v-app-bar>

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
import { ref } from 'vue'

const menu = ref(false)
 const items = [
    { text: 'Meu Perfil', icon: 'mdi-account-outline' },
    { text: 'Salvos', icon: 'mdi-bookmark-multiple-outline' },
    { text: 'Configurações', icon: 'mdi-cog' }
  ]
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

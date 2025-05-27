<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" width="400">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email" />
        <v-text-field label="Senha" v-model="password" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="#a50034" @click="handleLogin" :loading="loading" block>Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../services/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    loading.value = true;
    const response = await login(email.value, password.value);
    localStorage.setItem('token', response.data.access_token);
    router.push('/');
  } catch (error) {
    console.error('Erro no login', error);
    alert('Login falhou, verifique suas credenciais');
  } finally {
    loading.value = false;
  }
};
</script>

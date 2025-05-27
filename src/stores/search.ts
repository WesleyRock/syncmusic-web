import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const search = ref('');

  const setSearch = (value: string) => {
    search.value = value;
  };

  return { search, setSearch };
});
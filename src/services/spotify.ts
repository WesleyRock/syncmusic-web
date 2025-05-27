import api from "./api";

export const searchMusic = async (query: string) => {
  const response = await api.get('/spotify/search', {
    params: { q: query },
  });

  const tracks = response.data.tracks;
  
  if (!tracks || !tracks.items) {
    console.log('DEBUG:', response.data);
    throw new Error('Resposta inválida da API do Spotify');
  }

  return tracks.items;
};
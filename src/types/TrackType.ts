export interface TrackType {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  preview_url: string;
  external_urls: { spotify: string };
}
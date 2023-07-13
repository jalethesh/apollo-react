import { Song } from '$application/components/pages/Main/SetList/store';

export interface SongListMint {
  data: Song[];
  assetsName: string;
  assetMimeType: string;
  unitName: string;
  description: string;
}

export interface SongMint {
  song: string;
  isPlayed: boolean;
}

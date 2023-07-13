import { atom } from 'jotai';

import { songs } from './setlist.mock';

export type YesOrNo = 'yes' | 'no';

export interface Song {
  id: number;
  appId?: number;
  songId?: number;
  index: number;
  image: string | null;
  artist: string;
  title: string;
  isPlayed?: YesOrNo;
  isNeutral?: boolean;
  draggable?: boolean;
  order: number;
}

const songsList = songs();
export const songsAtom = atom<Song[]>(songsList);
export const songsOrderListAtom = atom<number[]>(
  songsList.map((song) => song.index)
);

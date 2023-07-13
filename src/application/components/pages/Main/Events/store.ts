import { atom } from 'jotai';

import { Query } from '$application/lib/generated/gqlTypes';

import { Song } from '../../Main/SetList/store';

export interface Event {
  id: string;
  image: string;
  slug: string;
  date: Date;
  artist: string;
  venue: string;
  distance: string;
  location: { latitude: string; longitude: string };
  setlist: Song[];
}

export const eventsAtom = atom<Query['setlists'] | undefined>(undefined);

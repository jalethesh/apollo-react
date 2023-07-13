import fetchJsonp from 'fetch-jsonp';

interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface Datum {
  error?: any;
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
}

export interface GetTrackResponse {
  data: Datum[];
  total: number;
  next: string;
}

interface Data {
  artist: string;
  track: string;
}

export const getArtistTracks = async (data: Data): Promise<GetTrackResponse> => {
  const artistSearch = await fetchJsonp(
    `https://api.deezer.com/search/track/?q=artist:"${data.artist}" track:"${data.track}"&output=jsonp`
  ).then((response) => response.json() as Promise<GetTrackResponse>);

  return artistSearch;
};

export const getAllTracks = async (data: Data): Promise<GetTrackResponse> => {
  const allTracksSearch = async () => {
    let allTracks = [] as Datum[];

    const searchGetNext = async (nextUrl: string) => {
      let response;
      try {
        response = await fetchJsonp(nextUrl);
      } catch {
        // on error e.g. timeout, retry the search
        await searchGetNext(nextUrl);
      }

      const { data: nextData, next } =
        (await response.json()) as GetTrackResponse;

      const tracks = (nextData || []).filter((item) => item.type === 'track');
      allTracks = allTracks.concat(tracks);

      if (next) {
        await searchGetNext(next);
      }
    };

    await searchGetNext(
      `https://api.deezer.com/search/track/?q="${data.track}"&output=jsonp`
    );

    return allTracks;
  };

  const allTracksData = await allTracksSearch();

  return {
    data: [...(allTracksData as any)],
  } as any;
};

export const getTrackByID = async (id: number): Promise<Datum> => {
  return fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`).then(
    (response) => response.json()
  ) as Promise<Datum>;
};

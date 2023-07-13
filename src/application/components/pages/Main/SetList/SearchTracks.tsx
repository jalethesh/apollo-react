import { useRef, useState, useEffect } from 'react';

import {
  Box,
  darken,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { uniqBy } from 'lodash';
import { useMutation } from 'react-query';
import { useClickAway } from 'react-use';

import SearchBar from '$application/components/atoms/Searchbar';
import {
  Datum,
  getAllTracks,
  getArtistTracks,
} from '$application/lib/repoQueries/getTracks';

interface SearchTracksProps {
  artist: string;
  onSelect: (track: Datum) => void;
}

export const SearchTracks = ({ artist, onSelect }: SearchTracksProps) => {
  const {
    mutateAsync: handleGetAllTracks,
    data: allTracksData,
    isLoading: isAllLoading,
  } = useMutation(getAllTracks);

  const {
    mutateAsync: handleGetArtistTracks,
    data: artistTracksData,
    isLoading: isArtistLoading,
  } = useMutation(getArtistTracks);

  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const [artistSongs, setArtistSongs] = useState<Datum[]>([]);
  const [allSongs, setAllSongs] = useState<Datum[]>([]);

  const searchHandler = (searchPhrase: string) => {
    setSearch(searchPhrase);
    if (searchPhrase.length >= 3) {
      setShowList(true);
      handleGetArtistTracks({ artist, track: searchPhrase });
      handleGetAllTracks({ artist, track: searchPhrase });
    }
  };

  const searchRef = useRef<HTMLDivElement>(null);
  const searchDropDownRef = useRef<HTMLDivElement>(null);
  const closeShowList = () => setShowList(false);
  useClickAway(searchRef, closeShowList);

  const listHandler = (track: Datum) => {
    onSelect(track);
    closeShowList();
  };

  const updateSearchDropdown = (e: any) => {
    if (e.target?.height < 500) {
      if (searchDropDownRef.current) {
        searchDropDownRef.current.style.maxHeight = '83vh';
      }
    } else {
      if (searchDropDownRef.current) {
        searchDropDownRef.current.style.maxHeight = '65vh';
      }
    }
  };

  useEffect(() => {
    window.visualViewport?.addEventListener('resize', (event) =>
      updateSearchDropdown(event)
    );
    return () => {
      window.visualViewport?.removeEventListener('orientationchange', (event) =>
        console.log(event.target)
      );
    };
  }, []);

  useEffect(() => {
    setArtistSongs(
      uniqBy(artistTracksData?.data, 'title').filter(
        (item) => item && item.artist.name === artist
      )
    );
    setAllSongs(
      uniqBy(allTracksData?.data, 'title')
        .filter((item) => item && item.artist.name !== artist)
        .sort((a, b) => (a.artist.name < b.artist.name ? -1 : 1))
    );
  }, [artist, artistTracksData, allTracksData]);

  const handleClear = () => {
    setSearch('');
    setShowList(false);
  };

  return (
    <Box sx={{ position: 'relative' }} ref={searchRef}>
      <SearchBar
        value={search}
        onChange={searchHandler}
        onClear={handleClear}
        placeholder="Songs"
      />
      {showList && (
        <List
          sx={{
            paddingLeft: '25.5px',
            paddingRight: '25.5px',
            pt: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
          }}
        >
          <Box
            ref={searchDropDownRef}
            sx={{
              position: 'relative',
              background: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
              maxHeight: '65vh',
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '7px',
                height: ' 7px',
              },
              '::-webkit-scrollbar-button': {
                width: ' 7px',
                height: '7px',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: ' #5a5a60',
                border: '0px solid transparent',
                borderRadius: '10px',
                filter: 'none',
                transition: 'background-color 0.25s, filter 0.25s',
              },
              '::-webkit-scrollbar-thumb:active': {
                filter: 'brightness(100%)',
              },
              '::-webkit-scrollbar-track': {
                background: 'transparent',
                border: '0px none transparent',
                borderRadius: '10px',
              },
              '::-webkit-scrollbar:hover': {
                background: 'transparent',
                width: '7px',
                height: '7px',
              },
              '::-webkit-scrollbar-track:active': {
                background: 'transparent',
              },
              '::-webkit-scrollbar-corner': {
                background: 'transparent',
              },
              scrollbarWidth: 'none' /* fireFox */,
              ' ::-webkit-scrollbar': {
                display: 'none' /* Chrome and Safari */,
              },
            }}
          >
            {/* {((artistSongs && artistSongs.length > 0) || isArtistLoading) && ( */}
            <Divider
              sx={{
                background: 'white',
                color: (theme) => theme.palette.grey[300],
                '&.MuiDivider-root': {
                  marginTop: '5px',
                  paddingRight: '7px',
                },
                '&.MuiDivider-root::before': {
                  display: 'none',
                },
                '& > .MuiDivider-wrapper': {
                  paddingLeft: '17px',
                  paddingRight: '7px',
                  fontSize: '14px',
                },
              }}
              textAlign="left"
            >
              {artist} Songs
            </Divider>
            {/* )} */}
            {isArtistLoading ? (
              <Box
                sx={{
                  minHeight: '50px',
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : artistSongs && artistSongs.length > 0 ? (
              artistSongs.map((d, idx) => (
                <ListItem
                  key={idx}
                  onClick={() => listHandler(d)}
                  sx={{
                    background: '#fff',
                    cursor: 'pointer',
                    '&:hover': { background: darken('#ccc', 0.1) },
                    padding: '5px 16px',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: '43px',
                        height: '43px',
                        borderRadius: '4px',
                      }}
                      src={d.album?.cover_small}
                    />
                  </ListItemAvatar>
                  <Box>
                    <Typography
                      sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '250px',
                      }}
                    >
                      {d.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: (theme) => theme.palette.grey[300],
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {d.artist?.name}
                    </Typography>
                  </Box>
                  <Divider>All Songs</Divider>
                </ListItem>
              ))
            ) : (
              <Box
                sx={{
                  color: (theme) => theme.palette.grey[300],
                  textAlign: 'center',
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                No Results
              </Box>
            )}

            <Divider
              sx={{
                background: 'white',
                color: (theme) => theme.palette.grey[300],
                '&.MuiDivider-root': {
                  paddingRight: '7px',
                },
                '&.MuiDivider-root::before': {
                  display: 'none',
                },
                '& > .MuiDivider-wrapper': {
                  paddingLeft: '17px',
                  paddingRight: '7px',
                  fontSize: '14px',
                },
              }}
              textAlign="left"
            >
              All Artists&apos; Songs
            </Divider>

            {isAllLoading ? (
              <Box
                sx={{
                  minHeight: '50px',
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                <CircularProgress />
              </Box>
            ) : allSongs && allSongs.length > 0 ? (
              allSongs.map((d, idx) => (
                <ListItem
                  key={idx}
                  onClick={() => listHandler(d)}
                  sx={{
                    background: '#fff',
                    cursor: 'pointer',
                    '&:hover': { background: darken('#ccc', 0.1) },
                    padding: '5px 16px',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: '43px',
                        height: '43px',
                        borderRadius: '4px',
                      }}
                      src={d.album?.cover_small}
                    />
                  </ListItemAvatar>
                  <Box>
                    <Typography
                      sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '250px',
                      }}
                    >
                      {d.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: (theme) => theme.palette.grey[300],
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {d.artist?.name}
                    </Typography>
                  </Box>
                  <Divider>All Songs</Divider>
                </ListItem>
              ))
            ) : (
              <Box
                sx={{
                  color: (theme) => theme.palette.grey[300],
                  textAlign: 'center',
                  padding: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                No Results
              </Box>
            )}
          </Box>
        </List>
      )}
    </Box>
  );
};

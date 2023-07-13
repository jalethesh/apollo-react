import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import TimeAgo from 'javascript-time-ago';
import { get } from 'lodash-es';
import { useRouter } from 'next/router';

import NoIcon from '$application/assets/img/noIcon.svg';
import YesIcon from '$application/assets/img/yesIcon.svg';
import { metadataDataType } from '$application/components/pages/Wallet/NFTTab';
import { Datum, getTrackByID } from '$application/lib/repoQueries/getTracks';
import { NFTQuery } from '$application/lib/repoQueries/queries';
import { hideScrollBar } from '$application/utils/css/hideScrollBar';

interface IsPlayedType {
  id: number;
  isPlayed: boolean;
}
export const NFTDetails = () => {
  const router = useRouter();

  const [nftDetail, setNFTData] = useState<metadataDataType>();
  const [songs, setSongs] = useState<Datum[]>([]);
  const [isPlayedList, setIsPlayedList] = useState<IsPlayedType[]>([]);
  const { data: NFTResultList } = useQuery(NFTQuery);

  const backHandler = () => {
    router.push('/wallet');
  };

  useEffect(() => {
    if (!NFTResultList || !router.query.id) return;
    const nftResultData = NFTResultList.nfts.find(
      (e) => e.index === Number(router.query.id)
    );

    if (!nftResultData) return;
    const data: metadataDataType = JSON.parse(nftResultData.metadata!);
    setNFTData(data);
  }, [NFTResultList, router.query.id, router.query.slug]);

  const getSongDetails = async () => {
    if (!nftDetail || !nftDetail.properties) return;
    for (const [key, value] of Object.entries(nftDetail.properties)) {
      if (key.includes('app')) {
        const appid = Number(key.split('_')[2]);
        if (appid) {
          try {
            const songDetails = await getTrackByID(appid);
            setIsPlayedList((e) => [
              ...e,
              { id: appid, isPlayed: value as boolean },
            ]);
            if (songDetails.id) {
              setSongs((prevSongs) => [...prevSongs, songDetails]);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (songs.length > 1) return;
    getSongDetails();
  }, [nftDetail]);

  const timeAgo = new TimeAgo('en-US');
  if (!nftDetail) return <Loading />;
  return (
    <StyledBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        background: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          '& > span': { width: '100% !important', height: '100% !important' },
          position: 'relative',
        }}
      >
        <ArrowBackIcon
          sx={{
            position: 'absolute',
            color: '#fff',
            zIndex: 1,
            top: '1rem',
            cursor: 'pointer',
            left: '1rem',
          }}
          onClick={backHandler}
        />
        <CardMedia
          component="img"
          src={nftDetail?.properties?.thumbnail ?? ''}
          sx={{
            height: 400,
            width: 1,
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 3,
          pb: 0,
        }}
      >
        <Typography variant="h1">{nftDetail?.properties.title}</Typography>
        <Box sx={{ my: 1 }}>
          <Typography variant="caption">SHOW DATE</Typography>
          <Typography variant="body1">
            {dayjs(nftDetail?.properties.votedAt).format('dddd, DD MMM HH:mm')}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="caption">VENUE</Typography>
          <Typography variant="body1">
            {nftDetail?.properties.cityName}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption">VENUE CHECK IN</Typography>
          <Typography variant="body1">
            {nftDetail?.properties?.checkinLat &&
            nftDetail?.properties?.checkinLong
              ? `Verified (${Number(nftDetail.properties.checkinLat).toFixed(
                  2
                )}, ${Number(nftDetail.properties.checkinLong).toFixed(2)})`
              : 'Not Verified'}
          </Typography>
        </Box>
        {nftDetail && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3">Your Voted Setlist</Typography>
            <Typography variant="caption">
              Voted{' '}
              {timeAgo.format(
                new Date(get(nftDetail, 'properties.votedAt', ''))
              )}
            </Typography>
            <List>
              {songs?.map((item, idx) =>
                item && item.album ? (
                  <ListItem key={item.title} sx={{ px: 0 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: (theme) => theme.palette.grey[300],
                        minWidth: '1rem',
                        mr: 1,
                      }}
                    >
                      {idx + 1}
                    </Typography>
                    <ListItemAvatar>
                      <AvatarImg
                        alt={item.title}
                        src={item.album.cover_small}
                        width="48px"
                        height="48px"
                      />
                    </ListItemAvatar>
                    <Box
                      sx={{
                        height: 48,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          columnGap: '10px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          {isPlayedList[idx].id === item.id ? (
                            isPlayedList[idx].isPlayed ? (
                              <YesIcon />
                            ) : (
                              <NoIcon />
                            )
                          ) : null}
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'red`',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.artist.name}
                      </Typography>
                    </Box>
                  </ListItem>
                ) : null
              )}
            </List>
          </Box>
        )}
      </Box>
    </StyledBox>
  );
};

const Loading = () => (
  <Stack sx={{ height: 1, width: 1, m: 'auto' }}>
    <Stack sx={{ m: 'auto', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography>Loading...</Typography>
    </Stack>
  </Stack>
);

const AvatarImg = styled.img`
  border-radius: 10px;
`;

const StyledBox = styled(Box)`
  ${hideScrollBar}
  overflow-y: scroll;
`;

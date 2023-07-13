import { Fragment, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import TimeAgo from 'javascript-time-ago';
import { useRouter } from 'next/router';
import numeral from 'numeral';

import Loading from '$application/components/atoms/Loading';
import { NFTQuery } from '$application/lib/repoQueries/queries';

export interface Properties {
  title: string;
  city: string;
  thumbnail: string;
  cityName: string;
  votedAt: number;
  rewardAmount: number;
  [key: string]: string | number | boolean;
}

export interface metadataDataType {
  standard: string;
  description: string;
  mime_type: string;
  media_url: string;
  external_url: string;
  properties: Properties;
}

export interface metaType {
  id: number;
  meta: metadataDataType;
}

export const NFTTab = () => {
  const router = useRouter();

  const nftDetailHandler = (id) => {
    router.push(`/wallet/nft/${id}`);
  };
  const timeAgo = new TimeAgo('en-US');

  const [NFTsData, setNFTsData] = useState<metaType[]>();
  const { data: NFTData, loading } = useQuery(NFTQuery);

  useEffect(() => {
    if (!NFTData) return;
    if (NFTData.nfts.length === NFTsData?.length) return;
    const nfts: metaType[] = NFTData.nfts.map((nft) => {
      return {
        id: nft.index,
        meta: JSON.parse(nft.metadata),
      };
    });
    nfts.sort((a, b) => b.meta.properties.votedAt - a.meta.properties.votedAt);
    setNFTsData(nfts);
  }, [NFTData]);

  return (
    <List sx={{ height: 1, pb: 2 }}>
      {loading && <Loading />}
      {NFTsData?.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(200,200,200,.5)',
                borderRadius: '6px',
              },
            }}
            onClick={() => nftDetailHandler(item.id)}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ bgcolor: deepOrange[800] }}
                src={item?.meta.properties?.thumbnail}
              >
                {item?.meta?.properties?.thumbnail}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2">
                    {item?.meta?.properties?.title}
                  </Typography>
                  <Typography variant="body2">
                    {numeral(item?.meta?.properties?.rewardAmount).format(
                      '0,0'
                    )}
                  </Typography>
                </Stack>
              }
              secondary={timeAgo.format(item?.meta?.properties?.votedAt)}
              secondaryTypographyProps={{
                variant: 'body2',
                fontWeight: 400,
                color: 'rgba(60, 60, 67, 0.6)',
              }}
            />
          </ListItem>
          <Divider sx={{ color: '#f3f5f7', borderColor: '#f3f5f7' }} />
        </Fragment>
      ))}
    </List>
  );
};

import React, { useState } from 'react';

import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  CardMedia,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';

import Button from '$application/components/atoms/Button';
import Modal from '$application/components/atoms/Modal';
import { SetList, SongContract } from '$application/lib/generated/gqlTypes';
import { useGetDistance } from '$application/lib/hooks/useGetDistance';

import { stepsAtom } from '../pages/Main/store';

interface EventListItemType {
  id: number;
  title: string;
  image: string;
  cityName: string;
  distance: number;
  appId: number;
  lat: number;
  long: number;
  songs: SongContract[];
  rewardAmount: number;
  startDate: Date;
  endDate: Date;
  userInfo?: any;
  onStartVoting: () => void;
}

export const EventListItem = ({
  id,
  appId,
  title,
  image,
  cityName,
  distance,
  lat,
  long,
  songs,
  rewardAmount,
  startDate,
  endDate,
  userInfo,
  onStartVoting,
}: EventListItemType) => {
  const setNextStep = useUpdateAtom(stepsAtom);

  const data: SetList = {
    id,
    appId,
    image,
    lat,
    long,
    distance,
    rewardAmount,
    songs,
    cityName,
    title,
    startDate,
    endDate,
  };

  const distanceData = useGetDistance(
    { latitude: String(lat), longitude: String(long) },
    'mi'
  );
  const router = useRouter();

  const [openStartModal, setOpenStartModal] = useState(false);

  const onItemSelect = () => {
    router.push(`/event-detail/${id}`);
    setNextStep({
      step: 'eventsDetail',
      data,
    });
  };

  const onOpenStartVotingModal = (e) => {
    e.stopPropagation();
    setOpenStartModal(true);
  };

  const handleCloseStartModal = (e) => {
    e.stopPropagation();
    setOpenStartModal(false);
  };

  const handleOk = (e) => {
    e.stopPropagation();
    setOpenStartModal(false);
    onStartVoting();
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setOpenStartModal(false);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ alignItems: 'stretch', cursor: 'pointer', px: 0 }}
      onClick={onItemSelect}
    >
      <Modal open={openStartModal} onClose={handleCloseStartModal}>
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>
            Do you want to start voting for this show?
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              gap: 1,
            }}
          >
            <Button variant="contained" fullWidth onClick={handleOk}>
              OK
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <ListItemAvatar
        sx={{
          height: 110,
          width: 110,
          borderRadius: 3,
          overflow: 'hidden',
          mr: 3,
          mb: 1,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 1, height: 1 }}
          alt={title}
          src={image}
        />
      </ListItemAvatar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 1,
          flexGrow: 1,
          justifyContent: distanceData ? 'space-between' : 'flex-start',
          gap: distanceData ? 0 : '10px',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'SF Pro Text',
                opacity: 0.6,
                textTransform: 'uppercase',
                color: (theme) => theme.palette.grey[200],
              }}
            >
              {dayjs(startDate).format('ddd, DD MMM, HH:mm')}
            </Typography>
            {userInfo && userInfo?.isAdmin && (
              <FontAwesomeIcon
                icon={faCheckToSlot}
                color={appId !== 0 ? '#7ACC35' : undefined}
                onClick={
                  appId !== 0
                    ? () => undefined
                    : (e) => onOpenStartVotingModal(e)
                }
              />
            )}
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontFamily: 'SF Pro Text',
              fontSize: '17px',
              lineHeight: '22px',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: (theme) => theme.palette.grey[200],
              mb: 1,
              fontFamily: 'SF Pro Text',
              fontWeight: 400,
              fontSize: '17px',
              opacity: 0.6,
              lineHeight: '22px',
            }}
          >
            {cityName}
          </Typography>
          {distanceData && (
            <Typography
              sx={{
                color: (theme) => theme.palette.grey[200],
                opacity: 0.6,
                fontFamily: 'SF Pro Text',
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '22px',
              }}
            >
              {distanceData ? `${distanceData} Miles away` : ''}
            </Typography>
          )}
        </Box>
      </Box>
    </ListItem>
  );
};

export default EventListItem;

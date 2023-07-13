import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { get, size } from 'lodash-es';
import { useRouter } from 'next/router';

import StarIcons from '$application/assets/img/startIconGray.svg';
import Loading from '$application/components/atoms/Loading';
import { ShowsList } from '$application/components/pages/Main/Events/ShowsList';
import { setListsQuery } from '$application/lib/repoQueries/queries';

import { eventsAtom } from './Events/store';
import { locationAtom } from './store';

export interface EventsListStepData {
  name: string;
}

export const Events: React.FC = () => {
  const router = useRouter();
  const [events, setEvents] = useAtom(eventsAtom);
  const [location] = useAtom(locationAtom);

  const {
    data: eventsData,
    loading: eventsLoading,
    refetch,
  } = useQuery(setListsQuery, {
    variables: {
      filtration: { expired: false },
      location,
    },
  });

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (eventsData && size(eventsData.setlists) > 0) {
      setEvents(get(eventsData, 'setlists'));
    }
  }, [eventsData, setEvents]);

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: (theme) => theme.palette.grey[900],
        width: '100%',
        pb: 1,
      }}
    >
      {!events && eventsLoading && <Loading />}
      <StyledSkip onClick={() => router.push('/wallet')}>My Wallet</StyledSkip>
      <Box sx={{ mt: '85px', mb: 4 }}>
        <Typography variant="h1" sx={{ userSelect: 'none' }}>
          Shows
        </Typography>
        <Typography
          color="grey.200"
          variant="h5"
          sx={{ opacity: 0.6, userSelect: 'none' }}
        >
          In Your City
        </Typography>
      </Box>
      <Box
        sx={{
          p: '18px',
          color: '#6C6C70',
          background: 'rgba(235, 235, 245, 0.3)',
          borderRadius: 1,
          userSelect: 'none',
        }}
      >
        <Typography>
          <StarIcons />
          To get started, please select the venue / show you’re attending.
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', mt: 2 }}>
        <ShowsList allEvents={events} />
      </Box>
    </Box>
  );
};

const StyledSkip = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 999;
  right: 22px;
  padding: 4px 12px;
  font-weight: 600;
  cursor: pointer;
  background: rgba(60, 60, 67, 0.18);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  color: rgba(50, 50, 50);
  font-family: ${({ theme }) => theme.typography.fontFamily};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    top: 20px;
  }
`;

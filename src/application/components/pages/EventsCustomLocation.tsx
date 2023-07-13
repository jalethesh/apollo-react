import React from 'react';

import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';

import NavigationFill from '$application/assets/img/navfill.svg';
import NavigationRequest from '$application/assets/img/navRequest.svg';

import { eventsAtom } from '../pages/Main/Events/store';

import { ShowsList } from './Main/Events/ShowsList';

export const EventsCustomLocation: React.FC = () => {
  const events = useAtomValue(eventsAtom);

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overeflow: 'hidden',
      }}
    >
      <Box sx={{ mt: 3, mb: 4 }}>
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          Shows
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6C6C70' }}>
          In NYC
        </Typography>
      </Box>
      <Box
        sx={{
          p: '18px',
          color: '#6C6C70',
          fontSize: '1rem',
          lineHeight: '21px',
          background: 'rgba(235, 235, 245, 0.3)',
          borderRadius: 1,
        }}
      >
        <StyledNavigationRequest />
        please share your location to show your nearby events.
        <StyledButton
          fullWidth
          onClick={() => ({})}
          variant="contained"
          startIcon={<NavigationFill />}
        >
          Share Location
        </StyledButton>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', mt: 2 }}>
        <ShowsList allEvents={events} />
      </Box>
    </Box>
  );
};

const StyledButton = styled(Button)`
  background: #d4e6fc;
  color: #007aff;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 17px;
  border-radius: 10px;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  box-shadow: none;
  &:hover {
    color: #fff;
    background: #007aff;
    & path {
      fill: #fff;
    }
  }
`;

const StyledNavigationRequest = styled(NavigationRequest)`
  width: 16px;
  height: 16px;
  margin-bottom: -2px;
`;

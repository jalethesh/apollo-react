import { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import GetReward from '$application/assets/img/getReward.svg';
import { VoteListType } from '$application/components/pages/Main/SetList';
import { stepsAtom } from '$application/components/pages/Main/store';
import { SetList } from '$application/lib/generated/gqlTypes';
import { voteMutation } from '$application/lib/repoQueries/queries';

export interface RewardsStepData extends SetList {
  name?: string;
  voteList?: VoteListType;
}

export const Rewards = () => {
  const router = useRouter();

  const [NextStep] = useAtom(stepsAtom);
  const data = NextStep?.data;
  const checkIn = localStorage.getItem(`checkIn:${data.id}`);
  const location = localStorage.getItem('location');
  const locationObject = JSON.parse(location || '{}');

  const [submitVoting, { loading: submitVotingLoading }] =
    useMutation(voteMutation);

  useEffect(() => {
    if (!data.id) {
      router.push('/events');
    }
    submitVoting({
      variables: {
        checkin: checkIn === 'true',
        checkinLat: locationObject.lat.toString(),
        checkinLong: locationObject.long.toString(),
        setListId: data.id,
        votes: data?.voteList?.votes,
      },
    });
  }, [
    data,
    router,
    checkIn,
    submitVoting,
    locationObject.lat,
    locationObject.long,
  ]);

  const viewWalletHandler = () => {
    router.push('/wallet');
  };

  if (data?.voteList === undefined) {
    router.push('/events');

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          py: 5,
          width: 1,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflow: 'hidden',
          background: `linear-gradient(180deg, rgba(193, 243, 169, 0.15) 0%, rgba(83, 255, 2, 0) 27.34%), #FFFFFF;`,
        }}
      >
        {submitVotingLoading ? (
          <Stack sx={{ m: 'auto' }}>
            <CircularProgress sx={{ m: 'auto' }} />
            <Typography
              variant="body2"
              sx={{ mt: '50px', textAlign: 'center' }}
            >
              Your votes are being added to the official setlist record.
              <br />
              <br />
              This ensures the songwriters are paid accurate public performance
              royalties.
              <br />
              <br />
              Please stand by...
            </Typography>
          </Stack>
        ) : (
          <>
            <GetReward />
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', textTransform: 'capitalize', mt: 5 }}
            >
              2,000 SET Tokens
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6C6C70', mt: 0.5, mb: 2 }}
              component="p"
            >
              have been added to your account
            </Typography>
            <LightStyledButton onClick={viewWalletHandler} variant="contained">
              View Wallet
            </LightStyledButton>
          </>
        )}
      </Box>
    );
  }
};

const LightStyledButton = styled(Button)`
  background: #d4e6fc;
  color: #007aff;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  box-shadow: none;

  &:hover {
    color: #fff;
    background: #007aff;

    & path {
      fill: #fff;
    }
  }
`;

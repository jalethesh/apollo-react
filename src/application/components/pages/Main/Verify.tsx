import { useState } from 'react';

import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { get } from 'lodash-es';
// import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import validator from 'validator';

import GiftIcon from '$application/assets/img/gifIcon.svg';
import { PinInput } from '$application/components/atoms/PinInput';
import { VoteListType } from '$application/components/pages/Main/SetList';
import { login, verify } from '$application/lib/api';
import { accessTokenAtom } from '$application/lib/auth/store';
import { generateWalletQuery } from '$application/lib/repoQueries/queries';

import { stepsAtom } from './store';

export interface VerifyStepData {
  name?: string;
  voteList: VoteListType;
}

export const Verify = () => {
  const [NextStep, setNextStep] = useAtom(stepsAtom);
  const [loading, setLoading] = useState(false);
  const setAccessToken = useUpdateAtom(accessTokenAtom);
  const data = NextStep?.data as VerifyStepData;
  // const { enqueueSnackbar } = useSnackbar();
  const [pin, setPin] = useState('');
  const userPhoneNumber = get(NextStep, 'data.name');
  const router = useRouter();
  const [createWallet] = useMutation(generateWalletQuery);

  const onClaim = () => {
    setNextStep({
      step: 'rewards',
      data: { ...data, voteList: data.voteList } as any,
    });
    router.push('/rewards');
  };

  const onSubmit = async (newVal: string) => {
    setPin(newVal);
    try {
      setLoading(true);
      const { data: verifyResponseData } = await verify({
        phoneNumber: userPhoneNumber,
        code: newVal,
      });
      setAccessToken(verifyResponseData.accessToken);
      await createWallet({
        variables: {
          phoneNumber: userPhoneNumber,
        },
        context: {
          fetchOptions: {
            headers: {
              authorization: `Bearer ${verifyResponseData.accessToken}`,
            },
          },
        },
      });

      // enqueueSnackbar(`phone verified`, { variant: 'success' });
      setLoading(false);
      onClaim();
    } catch (e: any) {
      // enqueueSnackbar(e?.response?.data, { variant: 'error' });
      setPin('');
      console.log('verification failed ERROR: ', e?.response?.data);
      console.log(`failed Error: ${JSON.stringify(e)}`);
      setLoading(false);
    }
  };

  const sendNewCode = async () => {
    setPin('');
    await login({ phoneNumber: userPhoneNumber });
    // enqueueSnackbar(`Code sent to ${userPhoneNumber}`, { variant: 'success' });
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
  }
  // @ts-ignore
  else {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <Typography variant="h5" sx={{ mt: 7 }}>
          📲 Verify Your Account
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#6C6C70', mt: 2, mb: 2 }}
          component="p"
        >
          A text message with a verification code has been sent to:
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: 'center' }}
          component="p"
        >
          {userPhoneNumber}
        </Typography>
        <PinInput submitCB={onSubmit} />
        <StyledButton
          fullWidth
          variant="text"
          sx={{ mt: 2 }}
          onClick={sendNewCode}
        >
          send a new code
        </StyledButton>
        <Box sx={{ mt: 2, flex: 1 }} />
        <StyledButton
          fullWidth
          onClick={onClaim}
          disabled={validator.isEmpty(pin) || loading}
          startIcon={!loading && <GiftIcon />}
          variant="contained"
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: 'common.white',
                width: '20px !important',
                height: '20px !important',
              }}
            />
          ) : (
            'Claim 2,000 SET Tokens'
          )}
        </StyledButton>
      </Box>
    );
  }
};

const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-weight: 900;
  font-size: 17px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: none;
  height: 48px;

  &.MuiButton-contained {
    background: #007aff;
  }

  &.Mui-disabled {
    color: ${({ theme }) => theme.palette.grey[900]};
    background: rgba(0, 123, 255, 0.3);
  }

  &.MuiButton-text {
    color: #007aff;
    font-size: 0.875rem;
  }
`;

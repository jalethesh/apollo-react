import { useMemo, useState } from 'react';

import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useUpdateAtom } from 'jotai/utils';
import { useRouter } from 'next/router';
// import { useSnackbar } from 'notistack';
import validator from 'validator';

import { PinInput } from '$application/components/atoms/PinInput';
import { VoteListType } from '$application/components/pages/Main/SetList';
import { login, verify } from '$application/lib/api';
import { accessTokenAtom } from '$application/lib/auth/store';
import { generateWalletQuery } from '$application/lib/repoQueries/queries';

export interface VerifyStepData {
  name?: string;
  voteList: VoteListType;
}

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const setAccessToken = useUpdateAtom(accessTokenAtom);
  const router = useRouter();
  const [createWallet] = useMutation(generateWalletQuery);
  // const { enqueueSnackbar } = useSnackbar();
  const [pin, setPin] = useState('');
  const userPhoneNumber = useMemo(
    () => String(router.query.phoneNumber),
    [router.query.phoneNumber]
  );
  const onSubmit = async (newVal: string) => {
    if (!userPhoneNumber) return;
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
      });
      // enqueueSnackbar(`phone verified`, { variant: 'success' });
      setLoading(false);
      onClick();
    } catch (e: any) {
      // enqueueSnackbar(e?.response?.data, { variant: 'error' });
      setPin('');
      console.log('verification failed ERROR: ', e?.response?.data);
      setLoading(false);
    }
  };

  const onClick = async () => {
    const path = String(router.query.referrer);
    await router.push(path);
  };

  const sendNewCode = async () => {
    setPin('');
    await login({ phoneNumber: userPhoneNumber });
    // enqueueSnackbar(`Code sent to ${userPhoneNumber}`, { variant: 'success' });
  };

  // @ts-ignore
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
        onClick={onClick}
        disabled={validator.isEmpty(pin) || loading}
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
          'confirm'
        )}
      </StyledButton>
    </Box>
  );
};

export default Verification;

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

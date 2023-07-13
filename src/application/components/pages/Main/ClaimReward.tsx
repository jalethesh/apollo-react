import { ChangeEvent, useState } from 'react';

import styled from '@emotion/styled';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
// import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import validator from 'validator';

import 'react-phone-input-2/lib/material.css';
import CheckIcon from '$application/assets/img/checkIcon.svg';
import GiftIcon from '$application/assets/img/gifIcon.svg';
import { TabSelect } from '$application/components/atoms/TabSelect';
import { VoteListType } from '$application/components/pages/Main/SetList';
import { login } from '$application/lib/api';

import { stepsAtom } from './store';

export interface ClaimRewardStepData {
  name?: string;
  voteList: VoteListType;
}

const tabs = [
  { name: 'phone', label: 'Phone Number' },
  { name: 'email', label: 'Email' },
];
export const ClaimReward = () => {
  const [activeTab, setActiveTab] = useState('phone');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  // const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [steps, setStep] = useAtom(stepsAtom);
  const data = steps?.data as ClaimRewardStepData;
  const router = useRouter();

  const onChangeMail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };
  const onClearMail = () => {
    setEmail('');
  };

  const sanitizedPhoneNo = (unsanitizedPhoneNo) =>
    unsanitizedPhoneNo.charAt(0) === '+'
      ? unsanitizedPhoneNo
      : `+${unsanitizedPhoneNo}`;

  const onSubmit = async () => {
    if (!phoneNo) return;
    try {
      setLoading(true);
      await login({ phoneNumber: phoneNo });
      setStep({
        step: 'verify',
        data: { ...data, name: phoneNo, voteList: data.voteList },
      });
      router.push('/verify');
      setLoading(false);
      // enqueueSnackbar(`Code sent to ${phoneNo}`, {
      // variant: 'success',
      // });
    } catch (e: any) {
      // enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log(`login failed Error:${e}`);
      setLoading(false);
    }
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
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'SF Pro Text',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: '#6C6C70', textTransform: 'uppercase', mt: 7 }}
        >
          Thank you!
        </Typography>
        <Typography
          variant="h1"
          sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          <StyledGiftIcon />
          claim your reward
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#6C6C70', mt: 2, mb: 4 }}
          component="p"
        >
          In order to redeem your 2,000 SET tokens, create a SetPay account.
        </Typography>
        <TabSelect
          tabs={tabs}
          activeTab={activeTab}
          setSelected={setActiveTab}
        />
        <Box sx={{ mt: 2, flex: 1 }}>
          {activeTab === 'phone' ? (
            <PhoneInput
              country={'us'}
              value={phoneNo}
              onChange={(phone) => setPhoneNo(sanitizedPhoneNo(phone))}
            />
          ) : (
            <Input
              fullWidth
              placeholder="info@dev.com"
              value={email}
              onChange={onChangeMail}
              endAdornment={
                email ? (
                  <TextField
                    fullWidth
                    placeholder="info@dev.com"
                    value={email}
                    onChange={onChangeMail}
                    label="Email"
                    InputProps={{
                      endAdornment: email ? (
                        <StyledAdornment
                          onClick={() => onClearMail()}
                          position="end"
                        >
                          <CancelIcon />
                        </StyledAdornment>
                      ) : undefined,
                    }}
                  />
                ) : undefined
              }
            />
          )}
        </Box>
        <StyledButton
          fullWidth
          onClick={onSubmit}
          disabled={
            (activeTab === 'phone' && phoneNo === '') ||
            (activeTab === 'email' && !validator.isEmail(email)) ||
            loading
          }
          startIcon={!loading && <CheckIcon />}
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
            'Submit'
          )}
        </StyledButton>
      </Box>
    );
  }
};

const StyledGiftIcon = styled(GiftIcon)`
  width: 30px;
  height: 30px;
  margin-right: 4px;
`;

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
`;

const StyledAdornment = styled(InputAdornment)`
  &.MuiInputAdornment-root {
    margin: 8px;

    > svg {
      width: 16px;
      height: 16px;

      path,
      use {
        fill: ${({ theme }) => theme.palette.grey[300]};
      }
    }

    &.MuiInputAdornment-positionEnd {
      cursor: pointer;
    }
  }
`;

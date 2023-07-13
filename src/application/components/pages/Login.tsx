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
import { useRouter } from 'next/router';
// import { useSnackbar } from 'notistack';
import PhoneInput from 'react-phone-input-2';
import validator from 'validator';

import 'react-phone-input-2/lib/material.css';
import CheckIcon from '$application/assets/img/checkIcon.svg';
import { TabSelect } from '$application/components/atoms/TabSelect';
import { VoteListType } from '$application/components/pages/Main/SetList';
import { login } from '$application/lib/api';

export interface ClaimRewardStepData {
  name?: string;
  voteList: VoteListType;
}

const tabs = [
  { name: 'phone', label: 'Phone Number' },
  { name: 'email', label: '', disabled: true },
];
const Login = () => {
  const [activeTab, setActiveTab] = useState('phone');
  const [phoneNo, setPhoneNo] = useState('');

  const [email, setEmail] = useState('');
  // const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      // enqueueSnackbar(`Code sent to ${phoneNo}`, {
      // variant: 'success',
      // });
      await router.push({
        pathname: '/verification',
        query: { referrer: router.query.referrer ?? '/', phoneNumber: phoneNo },
      });
    } catch (e: any) {
      // enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log(`login failed Error:${JSON.stringify(e)}`);
      setLoading(false);
    }
  };

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
        variant="h1"
        sx={{
          fontWeight: 'bold',
          textTransform: 'capitalize',
          mx: 'auto',
          mt: 3,
          mb: 4,
        }}
      >
        Login
      </Typography>

      <TabSelect tabs={tabs} activeTab={activeTab} setSelected={setActiveTab} />
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
};

export default Login;

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

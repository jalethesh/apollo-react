import React from 'react';

import { Box, SxProps, Theme, Typography } from '@mui/material';
import numeral from 'numeral';

import GiftIcon from '$application/assets/img/gifIcon.svg';

interface RewardBoxProps {
  reward?: number;
  sx?: SxProps<Theme>;
}

export const RewardBox: React.FC<RewardBoxProps> = ({ reward, sx }) => {
  return (
    <Box
      sx={{
        p: '1rem',
        color: '#6C6C70',
        fontSize: '1rem',
        lineHeight: '21px',
        background: 'rgba(235, 235, 245, 0.3)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        mt: { sm: 2 },
        ...sx,
      }}
    >
      <GiftIcon />
      <Typography
        variant="body1"
        component="span"
        sx={{
          ml: 1,
          fontWeight: 'bold',
          color: '#6C6C70',
        }}
      >
        Reward:
      </Typography>
      <Typography
        variant="body1"
        component="span"
        sx={{
          ml: 1,
          color: '#6C6C70',
        }}
      >
        {`${numeral(reward).format('0,0')} (SetPay) SET Tokens`}
      </Typography>
    </Box>
  );
};

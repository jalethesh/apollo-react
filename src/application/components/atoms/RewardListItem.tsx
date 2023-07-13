import React from 'react';

import styled from '@emotion/styled';
import { Box, ListItem, Typography } from '@mui/material';

export interface RewardItemProps {
  image: string;
  title: string;
  amount: string;
}
export const RewardListItem: React.FC<RewardItemProps> = ({
  image,
  title,
  amount,
}) => {
  return (
    <ListItem
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 0,
        pr: 1,
        mb: 2,
      }}
    >
      <StyledImage src={image} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          my: 1,
          mx: 2,
          flexGrow: 1,
        }}
      >
        <Typography variant="body1">{title}</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: (theme) => theme.palette.grey[300],
          }}
        >
          {amount}
        </Typography>
      </Box>
    </ListItem>
  );
};

const StyledImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: 'cover';
`;

import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';

import CheckIcon from '$application/assets/img/checkIcon.svg';
import GiftIcon from '$application/assets/img/gifIcon.svg';

import { songsAtom } from '../pages/Main/SetList/store';

interface YesNoModalProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const AlmostDoneModal: React.FC<YesNoModalProps> = ({
  onSubmit,
  onBack,
}) => {
  const allSongs = useAtomValue(songsAtom);
  const total = allSongs.length;

  return (
    <StyledBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 0,
          marginBottom: '12px',
        }}
      >
        <Typography variant="h6">Almost Done!</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            p: 0,
            m: 0,
            columnGap: '8px',
          }}
        >
          <GiftIcon />
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.grey[300],
            }}
          >
            {`${total} / ${total}`}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: (theme) => theme.palette.grey[300],
        }}
      >
        Tap Back to edit your votes, otherwise tap Submit to complete your vote.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 5,
          columnGap: '24px',
        }}
      >
        <StyledButton
          onClick={onBack}
          variant="text"
          sx={{
            flexGrow: 1,
            flexBasis: 0,
          }}
        >
          Back
        </StyledButton>
        <StyledButton
          startIcon={<CheckIcon />}
          onClick={onSubmit}
          variant="contained"
          sx={{
            flexGrow: 2,
            flexBasis: 0,
          }}
        >
          Submit
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  &.MuiBox-root {
    border-radius: 24px 24px 0 0;
    background-color: ${({ theme }) => theme.palette.grey[800]};
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    height: 244px;
    padding: 24px;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 8px;
      transform: translateX(-50%);
      width: 32px;
      height: 3px;
      background-color: ${({ theme }) => theme.palette.grey[700]};
      border-radius: 3px;
      z-index: 999;
    }
  }
`;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-weight: 900;
  font-size: 17px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: none;
  width: 110px;
  height: 48px;
  &.MuiButton-contained {
    background: #007aff;
  }
  &.MuiButton-text {
    color: #007aff;
  }
`;

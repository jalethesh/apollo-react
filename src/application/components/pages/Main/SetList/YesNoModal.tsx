import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { darken } from 'polished';

import GiftIcon from '$application/assets/img/gifIcon.svg';
import NoIcon from '$application/assets/img/noIcon.svg';
import YesIcon from '$application/assets/img/yesIcon.svg';

import SongListItem from './SongListItem';
import { Song, songsAtom, songsOrderListAtom, YesOrNo } from './store';

interface YesNoModalProps {
  currentIndex: number;
  onSubmit: (currentItem: Song, decision: YesOrNo) => void;
  allSongs: Song[];
  songsOrder: number[];
}

export const YesNoModal: React.FC<YesNoModalProps> = ({
  currentIndex,
  onSubmit,
}) => {
  const allSongs = useAtomValue(songsAtom);
  const songsOrder = useAtomValue(songsOrderListAtom);
  const currentItem =
    allSongs.find((song) => song.index === songsOrder[currentIndex]) ??
    allSongs[0];

  const submitHandler = (decision: YesOrNo) => {
    onSubmit(currentItem, decision);
  };

  return (
    <StyledBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 0,
          m: '24px 24px 12px 24px',
        }}
      >
        <Typography variant="h6">Song Played?</Typography>
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
            {`${currentIndex} / ${allSongs.length}`}
          </Typography>
        </Box>
      </Box>
      <SongListItem
        {...currentItem}
        id={songsOrder[currentIndex]}
        draggable={false}
        isDragging={false}
        index={currentIndex + 1}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
          columnGap: '40px',
        }}
      >
        <StyledButton
          tone="yes"
          startIcon={<YesIcon />}
          onClick={() => submitHandler('yes')}
          variant="contained"
        >
          Yes
        </StyledButton>
        <StyledButton
          tone="no"
          startIcon={<NoIcon />}
          onClick={() => submitHandler('no')}
          variant="contained"
        >
          No
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

interface IStyledButton {
  tone: YesOrNo;
}
const StyledButton = styled(Button)<IStyledButton>`
  background: ${({ theme, tone }) =>
    tone === 'yes' ? theme.palette.success.light : theme.palette.error.light};
  color: ${({ theme, tone }) =>
    tone === 'yes' ? theme.palette.success.dark : theme.palette.error.dark};
  text-transform: capitalize;
  font-weight: 900;
  font-size: 17px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: none;
  width: 110px;
  height: 48px;
  &:hover {
    background: ${({ theme, tone }) =>
      tone === 'yes'
        ? darken(0.2, theme.palette.success.light)
        : darken(0.2, theme.palette.error.light)};
  }
`;

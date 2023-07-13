import React, { CSSProperties, forwardRef } from 'react';

import styled from '@emotion/styled';
import { Box, ListItem, Typography } from '@mui/material';

import DragSVG from '$application/assets/img/drag.svg';
import NeutralIcon from '$application/assets/img/neutralIcon.svg';
import NoIcon from '$application/assets/img/noIcon.svg';
import YesIcon from '$application/assets/img/yesIcon.svg';

import { Song } from './store';

interface SongListItemProps extends Song {
  isDragging: boolean;
  votingStatus?: boolean;
  onSongDelete?: () => void;
}
export const SongListItem = forwardRef<HTMLLIElement, SongListItemProps>(
  (props, ref) => {
    const { isDragging, votingStatus, onSongDelete } = props;

    const sortableItemStyle: CSSProperties = {
      boxShadow: isDragging ? '0px 0px 10px 5px #8a8a8a4a' : 'none',
      zIndex: isDragging ? 4 : 0,
    };
    return (
      <ListItem
        ref={ref}
        style={sortableItemStyle}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '8px',
          py: 0,
          px: 2,
          background: '#fff',
        }}
      >
        {props.draggable && <DragIcon />}
        <Typography
          variant="subtitle2"
          align="center"
          sx={{
            color: (theme) => theme.palette.grey[300],
            minWidth: '1rem',
          }}
        >
          {props.index}
        </Typography>
        <StyledImage alt={props.title} src={props.image ?? undefined} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            my: 1,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: '10px',
            }}
          >
            <Typography variant="body1" noWrap sx={{ maxWidth: 230 }}>
              {props.title}
            </Typography>
            {props.isPlayed &&
              (props.isPlayed === 'yes' ? <YesIcon /> : <NoIcon />)}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.palette.grey[300],
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props.artist}
          </Typography>
        </Box>
        {!votingStatus && props.isNeutral && props.draggable && (
          <NeutralIcon
            style={{ cursor: 'pointer ' }}
            onClick={() => onSongDelete?.()}
          />
        )}
      </ListItem>
    );
  }
);

SongListItem.displayName = 'SongListItem';

const DragIcon = styled(DragSVG)`
  cursor: grab;
`;
const StyledImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
`;

export default SongListItem;

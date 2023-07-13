import React from 'react';

import styled from '@emotion/styled';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Divider, Typography, useTheme } from '@mui/material';

import Avatar from '$application/components/atoms/Avatar';
import IconSwitcher from '$application/components/molecules/IconSwither';

interface ISetListElement {
  image: string;
  imageDescription?: string;
  title: string;
  subtitle: string;
  isPlaying?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
}

const SetListElement: React.FC<ISetListElement> = ({
  image,
  imageDescription,
  title,
  subtitle,
  isPlaying = false,
  isLiked = false,
  isDisliked = false,
}) => {
  const theme = useTheme();
  return (
    <>
      <RootContainer>
        <Avatar src={image} size="MD" alt={imageDescription} />
        <TextContainer>
          <Typography variant="h1" color={theme.palette.text.primary}>
            {title}
          </Typography>
          <Typography variant="h1" color={theme.palette.text.primary}>
            {subtitle}
          </Typography>
        </TextContainer>
        <ActionsContainer>
          <IconSwitcher
            defaultIcon={<PlayCircleOutlineIcon />}
            defaultVariant="Primary"
            activeIcon={<PlayCircleIcon />}
            activeVariant="Primary"
            isActive={isPlaying}
          />
          <IconSwitcher
            defaultIcon={<ThumbUpOffAltIcon />}
            defaultVariant="Primary"
            activeIcon={<ThumbUpAltIcon />}
            activeVariant="Success"
            isActive={isLiked}
          />
          <IconSwitcher
            defaultIcon={<ThumbDownOffAltIcon />}
            defaultVariant="Primary"
            activeIcon={<ThumbDownAltIcon />}
            activeVariant="Negative"
            isActive={isDisliked}
          />
        </ActionsContainer>
      </RootContainer>
      <Divider variant="fullWidth" color={theme.palette.grey[500]} />
    </>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const TextContainer = styled.div`
  flex-grow: 1;
  margin: 0 8px;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

export default SetListElement;

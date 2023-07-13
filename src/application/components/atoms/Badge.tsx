import React from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export interface BadgeProps {
  icon: JSX.Element;
  label?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, label, className }) => {
  const theme = useTheme();
  return (
    <RootWrapper className={className}>
      <IconWrapper>{icon}</IconWrapper>
      <Typography
        variant="body1"
        color={theme.palette.text.disabled}
        component="span"
      >
        {label}
      </Typography>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
`;

const IconWrapper = styled.div`
  ${({ theme }) => {
    return css`
      line-height: 0;
      > svg {
        width: 20px;
        height: 20px;
        path,
        use {
          fill: ${theme.palette.text.disabled};
        }
      }
    `;
  }}
`;

export default Badge;

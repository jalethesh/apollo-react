import React from 'react';

import styled from '@emotion/styled';
import { SxProps, Theme, Typography, TypographyStyle } from '@mui/material';

export interface TextListProps {
  header: string;
  items: string[];
  className?: string;
  headerSX?: SxProps<Theme>;
  itemSX?: SxProps<Theme>;
}

const TextList: React.FC<TextListProps> = ({
  header,
  items,
  className,
  itemSX,
  headerSX,
}) => {
  return (
    <div className={className}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...headerSX }}>
        {header}
      </Typography>
      {items.map((step, index) => (
        <StyledItem key={index} variant="body1" sx={itemSX}>
          {`${index + 1}. ${step}`}
        </StyledItem>
      ))}
    </div>
  );
};

const StyledItem = styled(Typography)<TypographyStyle>`
  &.MuiTypography-root {
    margin-left: 4px;
  }
`;

export default TextList;

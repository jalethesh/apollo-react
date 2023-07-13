import styled from '@emotion/styled';
import { Card as MuiCard, CardProps } from '@mui/material';

import { hideScrollBar } from '$application/utils/css/hideScrollBar';

const Card = styled(MuiCard)<CardProps>`
  ${hideScrollBar}
  height: 100%;
  border-radius: 12px;
  overflow-y: scroll;
`;

export default Card;

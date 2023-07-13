import styled from '@emotion/styled';
import { Container as MuiContainer, ContainerProps } from '@mui/material';

const Container = styled(MuiContainer)<ContainerProps>`
  &.MuiContainer-root {
    padding: 45px 20px;
    height: 100%;
  }
  @media (min-width: ${({ theme }) => `${theme.breakpoints.values.sm}px`}) {
    &.MuiContainer-root {
      padding: 104px 0 105px 0;
    }
  }
`;

export default Container;

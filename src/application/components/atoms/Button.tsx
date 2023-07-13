import styled from '@emotion/styled';
import { Button as MuiButton, ButtonProps, Theme } from '@mui/material';

export interface IButton extends ButtonProps {
  variant: 'contained' | 'outlined';
  disabled?: boolean;
}

const getBackgroundColor = (
  disabled: boolean,
  variant: 'contained' | 'outlined',
  theme: Theme
) => {
  if (variant === 'contained') {
    if (disabled) {
      return theme.palette.primary.light;
    } else {
      return theme.palette.primary.main;
    }
  } else {
    return 'transparent';
  }
};

const getTextColor = (
  disabled: boolean,
  variant: 'contained' | 'outlined',
  theme: Theme
) => {
  if (variant === 'contained') {
    return theme.palette.grey[900];
  } else {
    if (disabled) {
      return theme.palette.primary.light;
    } else {
      return theme.palette.grey[900];
    }
  }
};

const getBorder = (
  disabled: boolean,
  variant: 'contained' | 'outlined',
  theme: Theme
) => {
  if (variant === 'contained') {
    return 'none';
  } else {
    if (disabled) {
      return `1px solid ${theme.palette.primary.light}`;
    } else {
      return `1px solid ${theme.palette.primary.main}`;
    }
  }
};

const Button = styled(MuiButton)<IButton>`
  &.MuiButton-root {
		font-family: 'Lato';
		font-size: 1rem;
		font-weight 700;
		text-transform: capitalize;
    background-color: ${({ theme, disabled = false, variant }) =>
      getBackgroundColor(disabled, variant, theme)};
    color: ${({ theme, disabled = false, variant }) =>
      getTextColor(disabled, variant, theme)};
    border: ${({ theme, disabled = false, variant }) =>
      getBorder(disabled, variant, theme)};
  }
`;

export default Button;

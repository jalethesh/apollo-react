import { ChangeEvent, MouseEventHandler } from 'react';

import styled from '@emotion/styled';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Input, InputAdornment } from '@mui/material';

import MagnifyIcon from '$application/assets/img/magnifyIcon.svg';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  submitCB?: () => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = '',
  onChange,
  onClick,
  onClear,
}) => {
  const onChangeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
  };

  const onClearSearch = () => {
    onClear();
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: (theme) => theme.palette.grey[800],
        p: 2,
        backdropFilter: 'blur(40px)',
        padding: '16px 16px 0',
      }}
    >
      <StyledInput
        autoFocus={false}
        multiline={false}
        disableUnderline
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={onChangeValue}
        startAdornment={
          <StyledAdornment position="start">
            <MagnifyIcon />
          </StyledAdornment>
        }
        endAdornment={
          value ? (
            <StyledAdornment onClick={() => onClearSearch()} position="end">
              <CancelIcon />
            </StyledAdornment>
          ) : undefined
        }
      />
    </Box>
  );
};

const StyledInput = styled(Input)`
  &.MuiInput-root {
    background-color: ${({ theme }) => theme.palette.grey[600]};
    border-radius: 10px;
  }
`;

const StyledAdornment = styled(InputAdornment)`
  &.MuiInputAdornment-root {
    margin: 8px;
    > svg {
      width: 16px;
      height: 16px;
      path,
      use {
        fill: ${({ theme }) => theme.palette.grey[300]};
      }
    }
    &.MuiInputAdornment-positionEnd {
      cursor: pointer;
    }
  }
`;

export default SearchBar;

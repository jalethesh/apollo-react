import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

interface ValidateProps {
  minimal?: boolean;
  onVoting?: boolean;
  onValidate: () => void;
  disabled?: boolean;
}
export const Validate: React.FC<ValidateProps> = ({
  minimal = false,
  onVoting,
  onValidate,
  disabled,
}) => {
  return (
    <StyledBox $isMinimal={minimal}>
      {!minimal && (
        <>
          <Typography
            variant="h6"
            sx={{
              userSelect: 'none',
            }}
          >
            {onVoting ? 'Final step!' : 'Add & Reorder Setlist'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.grey[300],
              userSelect: 'none',
            }}
          >
            {onVoting
              ? 'Tap below to confirm that each song was performed during the set.'
              : 'Search and add new songs, or reorder setlist.'}
          </Typography>
        </>
      )}
      <StyledButton
        $isMinimal={minimal}
        onClick={onValidate}
        fullWidth
        variant="contained"
        disabled={disabled}
      >
        Validate Setlist
      </StyledButton>
    </StyledBox>
  );
};

interface IStyledBox {
  $isMinimal: boolean;
}
const StyledBox = styled(Box)<IStyledBox>`
  &.MuiBox-root {
    border-radius: 24px 24px 0 0;
    background-color: ${({ theme }) => theme.palette.grey[800]};
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({ $isMinimal }) => $isMinimal && '112px'};
    padding: 24px 24px 40px 24px;
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
  $isMinimal: boolean;
}

const StyledButton = styled(Button)<IStyledButton>`
  background: #007aff;
  text-transform: capitalize;
  font-weight: 900;
  font-size: 17px;
  border-radius: 10px;
  margin-top: ${({ $isMinimal }) => ($isMinimal ? '0.5rem' : '1.5rem')};
  display: flex;
  align-items: center;
`;

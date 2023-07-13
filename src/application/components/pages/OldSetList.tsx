import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { CardContent, Typography, TypographyStyle } from '@mui/material';

import Button from '$application/components/atoms/Button';
import DataList, {
  IDataList,
} from '$application/components/organisms/DataList';

export const OldSetList = () => {
  const theme = useTheme();

  return (
    <StyledCardContent>
      <StyledHeader gutterBottom variant="h2" component="h2">
        Setlist
      </StyledHeader>
      <StyledParagraph
        variant="body1"
        color={theme.palette.text.primary}
        component="p"
      >
        Tap the
        <Typography
          variant="body1"
          color={theme.palette.success.main}
          component="span"
        >
          Thumbs Up
        </Typography>
        next to each song to confirm it was played, otherwise tap the
        <Typography
          variant="body1"
          color={theme.palette.error.main}
          component="span"
        >
          Thumbs Down
        </Typography>
        if the song wasn’t played. Complete for all songs listed below to claim
        your reward.
      </StyledParagraph>
      <StyledDataList />
      <Button variant="contained" disabled fullWidth>
        Submit
      </Button>
    </StyledCardContent>
  );
};

const StyledHeader = styled(Typography)<TypographyStyle>`
  margin-bottom: 12px;
`;

const StyledParagraph = styled(Typography)<TypographyStyle>`
  margin-bottom: 8px;
`;

const StyledDataList = styled(DataList)<IDataList>`
  flex-grow: 1;
  margin-bottom: 22px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 20px 12px;
  height: 100%;
`;

export default OldSetList;

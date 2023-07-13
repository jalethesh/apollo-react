import styled from '@emotion/styled';
import { Box, Button, Stack, Typography } from '@mui/material';

import SetPaySVG from '$application/assets/SetPay.svg';

export const Home = () => (
  <Stack alignItems="center" sx={{ pt: 10, pb: 8, px: 3 }}>
    <SetPayTitle />
    <Box sx={{ pt: 8 }}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bolder', lineHeight: '1rem' }}
      >
        Ensure songwriters are paid fairly, accurately, and efficiently!
      </Typography>
      <Typography variant="body2" sx={{ pb: 2 }}>
        Songwriters earn royalties through the accurate tracking of what songs
        are played in a set. As a concert attendee, you can help confirm what
        songs were performed and ensure your favorite musicians are paid fairly.
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bolder', lineHeight: '1rem' }}
      >
        What is SetPay?
      </Typography>
      <Typography variant="body2" sx={{ pb: 2 }}>
        SetPay rewards concert attendees for tracking a concert’s setlist. Earn
        SetPay (SET) Tokens by keeping track of what songs are performed
        tonight. SET Tokens unlock cool artist-related rewards including
        merchandise, tickets, backstage passes, and digital collectables!
      </Typography>
      <Typography variant="body2" sx={{ pb: 12 }}>
        To get started share your location to find the event you attended:
      </Typography>
    </Box>
    <Box
      component="hr"
      sx={{ width: '100%', color: '#212121', opacity: 0.08 }}
    />
    <Button
      variant="outlined"
      color="primary"
      sx={{
        textTransform: 'capitalize',
        fontFamily: 'Lato',
        width: '301px',
        height: '42px',
        fontWeight: '900',
        borderRadius: '6px',
        color: (theme) => theme.palette.primary.main,
      }}
    >
      View Events Near Me
    </Button>
  </Stack>
);

const SetPayTitle = styled(SetPaySVG)`
  width: 147px;
  height: 41px;
`;

export default Home;

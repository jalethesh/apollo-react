import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      role="status"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;

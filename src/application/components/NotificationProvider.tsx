import { Grow } from '@mui/material';
import { SnackbarProvider } from 'notistack';

export interface NotificationProviderProps {
  children: any;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
  return (
    <>
      {/* @ts-ignore */}
      <SnackbarProvider
        dense
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={Grow}
        maxSnack={3}
      >
        {props.children}
      </SnackbarProvider>
    </>
  );
};

export default NotificationProvider;

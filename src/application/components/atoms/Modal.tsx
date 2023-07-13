import { ReactNode } from 'react';

import { Dialog } from '@mui/material';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: (e) => void;
}

const Modal = (props: ModalProps) => {
  const { children, open, onClose } = props;

  return (
    <Dialog
      open={open}
      disablePortal
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '330px',
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;

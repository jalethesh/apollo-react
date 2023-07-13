import { ReactNode, useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { Box, Typography, Button } from '@mui/material';
import { useAtom } from 'jotai';
import { get, size } from 'lodash-es';
import { useRouter } from 'next/router';

import Modal from '$application/components/atoms/Modal';
import { eventsAtom } from '$application/components/pages/Main/Events/store';
import { locationAtom } from '$application/components/pages/Main/store';
import { SetList } from '$application/lib/generated/gqlTypes';
import { setListsQuery } from '$application/lib/repoQueries/queries';

interface PropType {
  children: ReactNode;
}

const AlertModalProvider = (props: PropType) => {
  const { children } = props;

  const router = useRouter();
  const MINUTE_MS = 60000;

  const [location] = useAtom(locationAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [events, setEvents] = useAtom(eventsAtom);
  const [changedId, setChangedId] = useState<number | null>();
  const [changedTitle, setChangedTitle] = useState<string>('');

  const { data: eventsData } = useQuery(setListsQuery, {
    variables: {
      filtration: { expired: false },
      location,
    },
    pollInterval: MINUTE_MS,
  });

  const getChangedTitle = (oldSetLists: SetList[], newSetLists: SetList[]) => {
    let i: number, k: number;
    const n = oldSetLists.length,
      m = newSetLists.length;
    for (i = 0; i < n; i++) {
      for (k = 0; k < m; k++) {
        if (
          newSetLists[k].id === oldSetLists[i].id &&
          newSetLists[k].appId !== oldSetLists[i].appId
        ) {
          return newSetLists[k].id;
        }
      }
    }

    return null;
  };

  useEffect(() => {
    if (eventsData && size(eventsData.setlists) > 0) {
      setEvents(get(eventsData, 'setlists'));
      if (events && events.length > 0) {
        const id = getChangedTitle(events, eventsData?.setlists);
        if (id) {
          setOpenModal(true);
          setChangedId(id);
          setChangedTitle(
            eventsData?.setlists.find((item) => item.id === id)?.title
          );
        }
      }
    }
  }, [changedId, events, eventsData, setEvents]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleVote = () => {
    router.push(`/setlist/${changedId}`);
    setOpenModal(false);
  };

  return (
    <>
      {children}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>
            Voting for {changedTitle} has started, cast your vote now!
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Button variant="contained" fullWidth onClick={handleVote}>
              Vote Now
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AlertModalProvider;

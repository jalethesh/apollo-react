import { createRef, RefObject, useEffect, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { useRouter } from 'next/router';

import { AlmostDoneModal } from '$application/components/atoms/AlmostDoneModal';
import Modal from '$application/components/atoms/Modal';
import { locationAtom } from '$application/components/pages/Main/store';
import { SetList as SetListType } from '$application/lib/generated/gqlTypes';
import { useIsAuth } from '$application/lib/hooks/useAuth';
import { Datum } from '$application/lib/repoQueries/getTracks';
import {
  addSongContract,
  deleteSongContract,
  setListQuery,
  setListsQuery,
  reorderMutation,
} from '$application/lib/repoQueries/queries';

import { eventsAtom } from './Events/store';
import { SearchTracks } from './SetList/SearchTracks';
import { SongsList } from './SetList/SongsList';
import { Song, songsAtom, songsOrderListAtom, YesOrNo } from './SetList/store';
import { Validate } from './SetList/Validate';
import { YesNoModal } from './SetList/YesNoModal';
import { stepsAtom } from './store';

type ModalSteps = 'vote' | 'submit';

export interface VoteListType {
  setListId: number;
  votes: {
    id: number;
    vote: boolean;
  }[];
}
export const SetList = () => {
  const router = useRouter();
  const [location] = useAtom(locationAtom);
  const setListId = Number(router.query.artist);

  const [setList, setSetList] = useState<SetListType>();

  const [events, setEvents] = useAtom(eventsAtom);

  const { data: setListData, refetch } = useQuery(setListQuery, {
    variables: { setListId },
    pollInterval: 4000,
  });
  const { data: eventsData } = useQuery(setListsQuery, {
    variables: {
      filtration: { expired: false },
      location,
    },
  });
  const [handleAddSongContract, { data: addSongContractData }] =
    useMutation(addSongContract);
  const [handleReorderSongContract] = useMutation(reorderMutation);
  const [handleDeleteSongContract] = useMutation(deleteSongContract);

  const [, setNextStep] = useAtom(stepsAtom);

  const [allSongs, setAllSongs] = useAtom(songsAtom);
  const [selectedSongData, setSelectedSongId] = useState<number>();
  const songsOrder = useAtomValue(songsOrderListAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ModalSteps | undefined>(undefined);
  const [songVoteIndex, setSongVoteIndex] = useState(0);
  const [isAuth] = useIsAuth();
  const [refs, setRefs] = useState<Record<number, RefObject<HTMLLIElement>>>(
    []
  );

  // Events data
  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData?.setlists);
    }
  }, [eventsData, setEvents]);

  // Add song contract data
  useEffect(() => {
    if (addSongContractData) {
      setSelectedSongId(addSongContractData.newSongContract.id);
    }
  }, [addSongContractData, setSelectedSongId]);

  // Setlist data
  useEffect(() => {
    if (setListData) {
      setSetList(setListData.getSetlist);
    }
  }, [setListData, setSetList]);

  useEffect(() => {
    const newAllSongs = setListData?.getSetlist.songs.map((item, i) => ({
      ...item,
      index: item.order,
    }));
    if (newAllSongs) {
      setAllSongs(newAllSongs.sort((a, b) => a.order - b.order));
    }
    // eslint-disable-next-line prettier/prettier
    if (
      !setListData?.getSetlist.songs ||
      setListData?.getSetlist.songs.length === 0
    ) {
      return;
    }

    const createdRefs = newAllSongs.reduce((acc, value) => {
      acc[value.index] = createRef<HTMLLIElement>();
      return acc;
    }, {}) as Record<number, RefObject<HTMLLIElement>>;

    setRefs(createdRefs);
  }, [setListData?.getSetlist.songs]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleBackToEvents = () => {
    setNextStep({ step: 'eventsList' });
    router.push('/events');
  };

  useEffect(() => {
    if (modalStep === 'vote') {
      refs[songsOrder[songVoteIndex]].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [modalStep, songsOrder, songVoteIndex, refs]);

  const onListSubmit = async () => {
    if (!events) return;

    const targetEventIndex = events.findIndex(
      (e) => e.title === setList?.title
    );

    const list: VoteListType['votes'] = [];
    allSongs.forEach((song) => {
      list.push({
        id: song.id!,
        vote: song.isPlayed === 'yes' ?? false,
      });
    });

    if (isAuth) {
      setNextStep({
        step: 'rewards',
        data: {
          ...setList,
          voteList: { setListId: events[targetEventIndex].id, votes: list },
        },
      });
      router.push('/rewards');
    } else {
      setNextStep({
        step: 'claimReward',
        data: {
          ...setList,
          voteList: { setListId: events[targetEventIndex].id, votes: list },
        },
      });
      router.push('/register');
    }
  };

  const onBack = () => {
    setModalStep(undefined);
    setSongVoteIndex(0);
    setAllSongs((songs) =>
      songs.map((song) => ({ ...song, isPlayed: undefined }))
    );
  };

  const validateHandler = () => {
    if (setList?.appId === 0) {
      setOpenModal(true);
    } else {
      setModalStep('vote');
    }
  };

  const submitHandler = (submittedSong: Song, decision: YesOrNo) => {
    setAllSongs(
      allSongs.map((song) => {
        if (song.index === submittedSong.index) {
          song.isPlayed = decision;
        }
        return song;
      })
    );

    if (songVoteIndex === songsOrder.length - 1) return setModalStep('submit');
    setSongVoteIndex((prev) => prev + 1);
  };

  const getModalComponent = (type) => {
    switch (type) {
      case 'vote':
        return (
          <YesNoModal
            currentIndex={songVoteIndex}
            onSubmit={submitHandler}
            allSongs={setListData?.getSetlist.songs}
            songsOrder={songsOrder}
          />
        );
      case 'submit':
        return <AlmostDoneModal onSubmit={onListSubmit} onBack={onBack} />;
      default:
        return (
          <Validate
            onVoting={setList?.appId !== 0}
            onValidate={validateHandler}
            disabled={setListData?.getSetlist.songs.length === 0}
          />
        );
    }
  };

  const addTrackHandler = (track: Datum) => {
    if (
      setListData?.getSetlist.songs.findIndex(
        (song) => song.title === track.title
      ) < 0
    ) {
      handleAddSongContract({
        variables: {
          appId: 0,
          songId: track.id,
          setListId: setList?.id,
          image: track.album.cover_small,
          artist: track.artist.name,
          title: track.title,
          order: allSongs.length + 1,
        },
      }).then(() => refetch());
    }
  };

  const onDeleteSong = () => {
    handleDeleteSongContract({
      variables: {
        id: selectedSongData,
      },
    });
  };

  const handleChangeOrder = (items: Song[]) => {
    setAllSongs(items.sort((a, b) => a.order - b.order));

    const orderSongs = items.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    handleReorderSongContract({ variables: { setListId, songs: orderSongs } });
  };

  if (setList?.title === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          background: (theme) => theme.palette.grey[900],
          width: '100%',
        }}
      >
        {
          setList.appId === 0 ? (
            <SearchTracks artist={setList?.title} onSelect={addTrackHandler} />
          ) : (
            <Box sx={{ height: '30px' }} />
          ) // space when search box disappear
        }
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
          }}
        >
          {setList.title} Setlist
        </Typography>
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          {setListData && setListData?.getSetlist.songs.length > 0 ? (
            <SongsList
              refs={refs}
              votingStatus={setList.appId !== 0}
              draggable={setList?.appId === 0}
              allSongs={allSongs}
              onChange={handleChangeOrder}
              onDeleteSong={onDeleteSong}
            />
          ) : null}
        </Box>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              Voting will open after the show has finished. Check back soon!
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Button variant="contained" fullWidth onClick={handleOk}>
                OK
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleBackToEvents}
              >
                Back to Events
              </Button>
            </Box>
          </Box>
        </Modal>
        {getModalComponent(modalStep)}
      </Box>
    );
  }
};

import { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';
import styled from '@emotion/styled';
import {
  Button,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import DateTimeIconWhite from '$application/assets/img/dateTimeIconWhite.svg';
import LocationIconSVG from '$application/assets/img/locationIconWhite.svg';
import Modal from '$application/components/atoms/Modal';
import { SetList } from '$application/lib/generated/gqlTypes';
import { useGetDistance } from '$application/lib/hooks/useGetDistance';
import {
  alreadyVoted,
  setListQuery,
} from '$application/lib/repoQueries/queries';

import Badge from '../../atoms/Badge';
import TextList from '../../molecules/TextList';

import { stepsAtom } from './store';

export const SingleEvent = () => {
  const router = useRouter();

  const [steps, setNextStep] = useAtom(stepsAtom);
  const [setList, setSetList] = useState<SetList>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const data = steps?.data as SetList;

  const [getSetList, { data: setListData }] = useLazyQuery(setListQuery);

  const [getAlreadyVoted, { data: alreadyVotedData }] =
    useLazyQuery(alreadyVoted);

  useEffect(() => {
    if (setListData) {
      setSetList(setListData.getSetlist);
    }
  }, [setListData]);

  useEffect(() => {
    if (router.query.id) {
      const setListId = Number(router.query.id);
      getSetList({ variables: { setListId } });
    }
  }, [getSetList, router]);

  useEffect(() => {
    if (setList?.id) {
      getAlreadyVoted({ variables: { appId: setList?.id } });
    }
  }, [setList]);

  const distanceData = useGetDistance(
    { latitude: String(setList?.lat), longitude: String(setList?.long) },
    'mi'
  );

  const nextStepData = {
    ...setList,
    assetId: alreadyVotedData?.alreadyVoted.assetId,
  };

  const onCheckIn = () => {
    if (Number(distanceData) > 1) {
      setOpenModal(true);
      setMessage(
        `You appear to be too far away from ${setList?.cityName}. We can't verify you are at the venue.`
      );
    } else if (Number(distanceData) > 0) {
      setOpenModal(false);
      setDisabled(true);
      localStorage.setItem(`checkIn:${setList?.id}`, 'true');
    } else {
      setOpenModal(true);
      setMessage(
        "Access to your device's location has not been allowed. We can't verify you are at the venue."
      );
    }
  };

  const onClick = async () => {
    setNextStep({
      step: 'setList',
      data: nextStepData,
    });
    if (alreadyVotedData?.alreadyVoted.assetId !== 0) {
      router.push(`/wallet/nft/${alreadyVotedData?.alreadyVoted?.assetId}`);
    } else {
      router.push(`/setlist/${setList?.id}`);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!data?.id && steps?.step === 'eventsDetail') {
    router.push('/events');
    return (
      <CircularBox>
        <CircularProgress />
      </CircularBox>
    );
  } else {
    return (
      <>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography sx={{ textAlign: 'center', mb: 2 }}>
              {message}
            </Typography>
            <Button variant="contained" fullWidth onClick={handleCloseModal}>
              OK
            </Button>
          </Box>
        </Modal>
        <ImageWrapper>
          <CardMedia
            component="img"
            alt={setList?.title}
            src={setList?.image}
            sx={{ maxHeight: 375 }}
            width="100%"
          />
        </ImageWrapper>
        <Wrapper>
          <BackBox />
          <ContainerBox>
            <BoxWrapper>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  pb: { sm: 2 },
                }}
              >
                {setList?.title}
              </Typography>
              <Box sx={{ my: '1rem' }}>
                <Badge
                  icon={<DateTimeIconWhite />}
                  label={dayjs(setList?.startDate).format(
                    'dddd, DD MMM, HH:mm'
                  )}
                />
                <Badge
                  icon={<LocationIcon />}
                  label={`${setList?.cityName}${
                    Number(distanceData) > 0
                      ? `, ${distanceData} Miles away`
                      : ''
                  }`}
                />
              </Box>
              <TextList
                header="steps"
                items={[
                  'Add songs played during the show.',
                  'Verify the setlist.',
                  'Claim your reward!',
                ]}
                headerSX={{ lineHeight: '1.5rem', textTransform: 'uppercase' }}
              />
            </BoxWrapper>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <StyledButton
                onClick={onCheckIn}
                variant="contained"
                disabled={disabled}
              >
                Check In at {setList?.cityName}
              </StyledButton>
              <StyledButton onClick={onClick} variant="contained">
                {alreadyVotedData?.alreadyVoted.assetId &&
                alreadyVotedData?.alreadyVoted.assetId !== 0
                  ? 'View Your Vote'
                  : 'Event Setlist'}
              </StyledButton>
            </Box>
          </ContainerBox>
        </Wrapper>
      </>
    );
  }
};

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 24px 24px 0 0;
  height: 100%;
  padding-bottom: 20px;
`;

const LocationIcon = styled(LocationIconSVG)`
  width: 20px;
  height: 20px;
`;

const StyledButton = styled(Button)`
  background: #007aff;
  text-transform: unset;
  font-weight: 900;
  font-size: 17px;
  border-radius: 10px;
  width: 311px;
  min-height: 41.75px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  margin-top: -40px;
  background-color: white;
`;

const ImageWrapper = styled.div`
  border-radius: 8px;

  & > span {
    width: 100% !important;
    height: 123% !important;
  }

  width: 100%;
  height: 49%;
`;

const BoxWrapper = styled.div`
  width: 100%;
  padding: 1rem 1rem 0%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    gap: 1rem;
    padding: 2rem;
  }
`;

const BackBox = styled.div`
  width: 80%;
  height: 54px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(80px);
  border-radius: 33px;
  position: absolute;
  z-index: -1;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
`;

const CircularBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

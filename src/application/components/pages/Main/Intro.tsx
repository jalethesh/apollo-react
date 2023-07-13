import { useState } from 'react';

import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LocationIconSVG from '$application/assets/img/locationWhiteIco.svg';
import { Stepper } from '$application/components/atoms/Stepper';

import { steps } from './Intro/steps';
import { stepsAtom, locationAtom } from './store';

export interface ConfirmationStepData {
  name: string;
}

const defaultLocation = {
  lat: 40.7128,
  long: 74.006,
};

const saveLocation = (location) => {
  localStorage.setItem('location', JSON.stringify(location));
};

export const Intro = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [, setLocation] = useAtom(locationAtom);
  const { push } = useRouter();

  const setNextStep = useUpdateAtom(stepsAtom);
  const geolocationAPI = navigator.geolocation;

  const nextHandler = (skip: boolean) => {
    if (selectedStep < steps.length - 1 && !skip) {
      setSelectedStep(selectedStep + 1);
    } else {
      if (!geolocationAPI) {
        setLocation(defaultLocation);
        saveLocation(defaultLocation);
        setNextStep({ step: 'eventsList' });
        push('/events');
      } else {
        geolocationAPI.getCurrentPosition(
          (position) => {
            const { coords } = position;
            setLocation({ lat: coords.latitude, long: coords.longitude });
            saveLocation({ lat: coords.latitude, long: coords.longitude });
            setNextStep({ step: 'eventsList' });
            push('/events');
          },
          (error) => {
            setLocation(defaultLocation);
            saveLocation(defaultLocation);
            setNextStep({ step: 'eventsList' });
            push('/events');
          }
        );
      }
    }
  };

  const step = steps[selectedStep];
  const isLastStep = selectedStep === steps.length - 1;

  return (
    <>
      <ImageWrapper>
        <StyledSkip onClick={() => nextHandler(true)}>Skip</StyledSkip>
        <Image src={step.image} priority objectFit="cover" />
      </ImageWrapper>
      <Wrapper>
        <BackBox />
        <ContainerBox>
          <Box>
            <Typography
              variant="h2"
              sx={{
                pb: 2,
              }}
            >
              {step.head}
            </Typography>
            {step.description.map((desc, idx) => (
              <Typography variant="body1" sx={{ pb: 1 }} key={idx}>
                {desc}
              </Typography>
            ))}
          </Box>
          <Stepper
            steps={steps.length}
            selectedStep={selectedStep}
            onSelect={(val) => setSelectedStep(val)}
          />
          <StyledButton
            onClick={() => nextHandler(false)}
            variant="contained"
            startIcon={isLastStep ? <LocationIcon /> : undefined}
          >
            {!isLastStep ? 'Next' : 'Share Location'}
          </StyledButton>
        </ContainerBox>
      </Wrapper>
    </>
  );
};

const ContainerBox = styled.div`
  display: flex;
  background: #fff;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 24px 24px 0 0;
`;

const LocationIcon = styled(LocationIconSVG)`
  width: 20px;
  height: 20px;
`;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-weight: 900;
  font-family: 'SF Pro Display';
  font-size: 17px;
  border-radius: 10px;
  width: 311px;
  display: flex;
  align-items: center;
  margin: 2rem;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 416px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  width: 100%;
  height: 49%;

  & > span {
    width: 100% !important;
    height: 123% !important;
  }
`;

const Box = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 1;
  height: unset;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 304px;
    padding: 2rem;
  }
`;

export const StyledSkip = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 999;
  top: 25px;
  right: 20px;
  padding: 4px 8px;
  cursor: pointer;
  background: rgba(60, 60, 67, 0.18);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  color: ${({ theme }) => theme.palette.grey[900]};
  font-family: ${({ theme }) => theme.typography.fontFamily};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    top: 16px;
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

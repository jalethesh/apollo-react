import { atom } from 'jotai';

import { SetList } from '$application/lib/generated/gqlTypes';

import { ClaimRewardStepData } from './ClaimReward';
import { EventsListStepData } from './Events';
import { ConfirmationStepData } from './Intro';
import { VerifyStepData } from './Verify';

export interface ConfirmationStep {
  step: 'confirmation';
  data?: ConfirmationStepData;
}

export interface EventsListStep {
  step: 'eventsList';
  data?: EventsListStepData;
}

export interface EventsDetailStep {
  step: 'eventsDetail';
  data?: SetList;
}

export interface SetListStep {
  step: 'setList';
  data?: any;
}

export interface ClaimRewardStep {
  step: 'claimReward';
  data?: ClaimRewardStepData;
}

export interface VerifyStep {
  step: 'verify';
  data?: VerifyStepData;
}

export interface RewardsStep {
  step: 'rewards';
  data?: any;
}

export type StepAtom =
  | ConfirmationStep
  | EventsListStep
  | EventsDetailStep
  | SetListStep
  | ClaimRewardStep
  | VerifyStep
  | RewardsStep;

export const initialStep: StepAtom = {
  step: 'confirmation',
};

export interface LocationAtom {
  lat: number;
  long: number;
}

export const initialLocation: LocationAtom = {
  lat: 40.7128,
  long: -74.006,
};

export const stepsAtom = atom<StepAtom>(initialStep);
export const locationAtom = atom<LocationAtom>(initialLocation);

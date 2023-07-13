import { useAtomValue } from 'jotai';

import { ClaimReward } from './Main/ClaimReward';
import { Events } from './Main/Events';
import { Intro } from './Main/Intro';
import { Rewards } from './Main/Rewards';
import { SetList } from './Main/SetList';
import { SingleEvent } from './Main/SingleEvent';
import { stepsAtom } from './Main/store';
import { Verify } from './Main/Verify';

export const Main = () => {
  const { step } = useAtomValue(stepsAtom);
  switch (step) {
    case 'confirmation':
      return <Intro />;
    case 'eventsList':
      return <Events />;
    case 'eventsDetail':
      return <SingleEvent />;
    case 'setList':
      return <SetList />;
    case 'rewards':
      return <Rewards />;
    case 'verify':
      return <Verify />;
    case 'claimReward':
      return <ClaimReward />;
  }
};

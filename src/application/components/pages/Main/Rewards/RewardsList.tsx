import React from 'react';

import {
  RewardListItem,
  RewardItemProps,
} from '$application/components/atoms/RewardListItem';
import Scrollbar from '$application/components/atoms/Scrollbar';

interface SongsListProps {
  allRewards?: RewardItemProps[];
}

export const RewardsList: React.FC<SongsListProps> = ({ allRewards }) => {
  return allRewards ? (
    <Scrollbar height="100%">
      {allRewards.map((item, index) => (
        <>
          <RewardListItem
            key={index}
            image={item.image}
            title={item.title}
            amount={item.amount}
          />
        </>
      ))}
    </Scrollbar>
  ) : null;
};

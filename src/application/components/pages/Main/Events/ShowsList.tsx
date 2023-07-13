import React from 'react';

import { useMutation } from '@apollo/client';
import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import jwt_decode from 'jwt-decode'; // eslint-disable-line

import EventListItem from '$application/components/atoms/EventListItem';
import Loading from '$application/components/atoms/Loading';
import Scrollbar from '$application/components/atoms/Scrollbar';
import { accessTokenAtom } from '$application/lib/auth/store';
import { Query } from '$application/lib/generated/gqlTypes';
import { startSetListVoting } from '$application/lib/repoQueries/queries';

interface EventsListProps {
  allEvents?: Query['setlists'];
}

export const ShowsList: React.FC<EventsListProps> = ({ allEvents }) => {
  const [onStartSetListVoting, { loading: startVotingLoading }] =
    useMutation(startSetListVoting);
  const [ATatom] = useAtom(accessTokenAtom);

  const userInfo = ATatom ? jwt_decode(ATatom) : null;

  const onStartVoting = (setListId: number) => {
    onStartSetListVoting({
      variables: {
        setListId,
      },
    });
  };

  return allEvents ? (
    <>
      {startVotingLoading && <Loading />}
      <Scrollbar height="100%">
        {allEvents?.map((event, idx) => (
          <React.Fragment key={idx}>
            <EventListItem
              {...event}
              userInfo={userInfo}
              onStartVoting={() => onStartVoting(event.id)}
            />
            <Divider />
          </React.Fragment>
        ))}
      </Scrollbar>
    </>
  ) : null;
};

import React from 'react';

import styled from '@emotion/styled';
import { Divider, useTheme } from '@mui/material';

import { hideScrollBar } from '$application/utils/css/hideScrollBar';

import SetListElement from '../molecules/SetListElement';

export interface IDataList {
  data?: any[];
  className?: string;
}

// TODO: make the DataList generic
// TODO: add windowing to the DataList
const DataList: React.FC<IDataList> = ({ className }) => {
  const theme = useTheme();
  return (
    <ListWrapper className={className}>
      <Divider variant="fullWidth" color={theme.palette.grey[500]} />
      <SetListElement
        image="/songs/song04.png"
        title="August Twelve"
        subtitle="The Universe Smiles upon You"
      />
      <SetListElement
        image="/songs/song02.png"
        title="The Infamous Bill"
        subtitle="The Infamous Bill"
        isLiked
      />
      <SetListElement
        image="/songs/song05.png"
        title="Mr. White"
        subtitle="The Universe Smiles upon You"
        isPlaying
        isDisliked
      />
      <SetListElement
        image="/songs/song03.png"
        title="So We Won’t Forget"
        subtitle="Mordechai"
        isPlaying
        isLiked
      />
      <SetListElement
        image="/songs/song01.png"
        title="Lady and Man"
        subtitle="Con Todo El Mundo"
      />
      <SetListElement
        image="/songs/song07.png"
        title="Evan Finds the Third Room"
        subtitle="Con Todo El Mundo"
        isPlaying
      />
      <SetListElement
        image="/songs/song02.png"
        title="Pelota"
        subtitle="Mordechai"
        isDisliked
      />
      <SetListElement
        image="/songs/song03.png"
        title="August Twelve"
        subtitle="The Universe Smiles upon You"
        isDisliked
      />
      <SetListElement
        image="/songs/song04.png"
        title="White Gloves"
        subtitle="The Universe Smiles upon You"
        isPlaying
      />
      <SetListElement
        image="/songs/song05.png"
        title="August Twelve"
        subtitle="The Universe Smiles upon You"
        isPlaying
      />
      <SetListElement
        image="/songs/song06.png"
        title="August Twelve"
        subtitle="The Universe Smiles upon You"
        isLiked
      />
      <SetListElement
        image="/songs/song07.png"
        title="August Twelve"
        subtitle="The Universe Smiles upon You"
      />
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  ${hideScrollBar}
  overflow-y: scroll;
`;

export default DataList;

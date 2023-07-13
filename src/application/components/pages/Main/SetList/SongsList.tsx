import React, { RefObject, useEffect } from 'react';

import { Divider } from '@mui/material';
import { useAtom } from 'jotai';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import Scrollbar from '$application/components/atoms/Scrollbar';
import SongListItem from '$application/components/pages/Main/SetList/SongListItem';
import { reorder } from '$application/utils/reorder';

import { blockXAxios } from './SongsList/blockXAxios';
import { Song, songsOrderListAtom } from './store';

interface SongsListProps {
  draggable: boolean;
  allSongs: Song[];
  refs: Record<number, RefObject<HTMLLIElement>>;
  votingStatus: boolean;
  onChange: (songs: Song[]) => void;
  onDeleteSong: () => void;
}

export const SongsList = ({
  draggable,
  allSongs,
  refs,
  votingStatus,
  onChange,
  onDeleteSong,
}: SongsListProps) => {
  const [items, setItems] = useAtom(songsOrderListAtom);

  useEffect(() => {
    const newAllSongs = allSongs.map((item, i) => ({ ...item, index: i + 1 }));
    setItems(newAllSongs.map((song) => song.index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSongs]);

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newQuotes = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    // insert order to allsongs item.
    const newSongs = newQuotes.map((item, index) => ({
      ...allSongs[item - 1],
      order: index + 1,
    }));

    onChange(newSongs);
    setItems(newQuotes);
  };

  const deleteSongHandler = (id: number) => {
    setItems((_items) => _items.filter((item) => item !== id));
    onChange(allSongs.filter((song) => song.index !== id));
    onDeleteSong();
  };

  const onDragStart = () => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  return (
    <Scrollbar height="100%">
      <DragDropContext onDragStart={onDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="List">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {(items ?? []).map((id, idx) => (
                <React.Fragment key={id}>
                  <Draggable
                    draggableId={String(id)}
                    index={idx}
                    isDragDisabled={!draggable}
                  >
                    {(
                      dragProvided: DraggableProvided,
                      dragSnapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={blockXAxios(dragProvided.draggableProps.style)}
                      >
                        <SongListItem
                          ref={refs[id - 1]}
                          onSongDelete={() => deleteSongHandler(id)}
                          {...allSongs[id - 1]}
                          isDragging={dragSnapshot.isDragging}
                          index={idx + 1}
                          votingStatus={votingStatus}
                          draggable={draggable}
                        />
                      </div>
                    )}
                  </Draggable>
                  <Divider />
                </React.Fragment>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Scrollbar>
  );
};

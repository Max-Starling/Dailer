import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ListItem from '../ListItem';
import './Content.scss';

const childs = [];

childs.push({
  id: Math.floor(Math.random() * 10000),
  title: 'Сходить в лодэ',
  priority: 'low',
});

childs.push({
  id: Math.floor(Math.random() * 10000),
  title: 'Подойти к Репникову',
  priority: 'high',
});

childs.push({
  id: Math.floor(Math.random() * 10000),
  title: 'Тренировка',
  priority: 'medium',
});

// for (let i = 0; i < 5; i++) {
//   childs.push({
//     id: Math.floor(Math.random() * 10000),
//   })
// }

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default () => {
  const [childsStore, setChilds] = useState(childs);
  
  console.log('cs', childsStore);
  
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newChilds = reorder(
      childsStore,
      result.source.index,
      result.destination.index,
    );

    setChilds(newChilds);
  }

  const renderContentChild = (item, index) => {
    return (
      <ListItem
        key={index}
        index={index}
        {...item}
      >
      </ListItem>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {
          (provided, snapshot) => (
            <main
              ref={provided.innerRef}
              styleName="content"
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {childsStore.map(renderContentChild)}
              {provided.placeholder}
            </main>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}

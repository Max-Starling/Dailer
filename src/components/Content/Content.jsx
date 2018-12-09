import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import ListItem from 'components/ListItem';
import { getRepeatableTasks } from 'resources/repeatableTasks/repeatableTasks.selectors';
import './Content.scss';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

 const Content = (props) => {
  const [childs, setChilds] = useState([]);
  
  const fetchData = () => {
    const childsData = [...props.repeatableTasks];
    setChilds(childsData);
  };

  useEffect(fetchData, [props.repeatableTasks]);
  console.log('childs', childs);
  
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newChilds = reorder(
      childs,
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
              {childs.map(renderContentChild)}
              {provided.placeholder}
            </main>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => ({
  repeatableTasks: getRepeatableTasks(state),
});

export default connect(mapStateToProps)(Content)
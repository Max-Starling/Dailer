import React, { useState, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import ListItem from './components/ListItem';
import {
  getActiveRepeatableTasks,
  getInactiveRepeatableTasks,
} from 'resources/repeatableTasks/repeatableTasks.selectors';
import './RepeatableList.scss';
import { reorder } from 'helpers/reorder';

 const RepeatableList = (props) => {
  const [activeTasks, setActiveTasks] = useState([]);
  
  const fetchData = () => {
    const childsData = [...props.activeRepeatableTasks];
    setActiveTasks(childsData);
  };

  useEffect(fetchData, [props.activeRepeatableTasks]);
  
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newActiveTasks = reorder(
      activeTasks,
      result.source.index,
      result.destination.index,
    );

    setActiveTasks(newActiveTasks);
  }

  const renderTask = (item, index) => {
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
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {
            (provided, snapshot) => (
              <div
                ref={provided.innerRef}
                styleName="repeatable-list"
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                { !!activeTasks.length && <span styleName="status">Active</span> }
                {activeTasks.map(renderTask)}
                {/* <span styleName="status">Inactive</span>
                {props.inactiveRepeatableTasks.map(renderTask)} */}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      <div styleName="repeatable-list">
        { !!props.inactiveRepeatableTasks.length && <span styleName="status">Inactive</span> }
        {props.inactiveRepeatableTasks.map(renderTask)}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  activeRepeatableTasks: getActiveRepeatableTasks(state),
  inactiveRepeatableTasks: getInactiveRepeatableTasks(state),
});

export default connect(mapStateToProps)(RepeatableList)
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import ListItem from './components/ListItem';
import './RepeatableList.scss';
import { reorder } from 'helpers/reorder';

 const RepeatableList = React.memo((props) => {
  const [activeTasks, setActiveTasks] = useState([]);
  
  const fetchData = () => {
    const childsData = [...props.activeTasks];
    setActiveTasks(childsData);
  };

  useEffect(fetchData, [props.activeTasks]);

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
        key={item._id}
        index={index}
        {...item}
      >
      </ListItem>
    );
  };

  return (
    <>
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
                <div styleName="repeatable-list">
                  {activeTasks.map(renderTask)}
                </div>
                
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      <div styleName="repeatable-list">
        { !!props.inactiveTasks.length && <span styleName="status">Inactive</span> }
        {props.inactiveTasks.map(renderTask)}
      </div>
    </> 
  );
});

const query = gql`
  query Tasks {
    tasks {
      _id,
      title,
      frequency,
      status,
      startTime
    }
  }
`;

const queryConfig = {
  props: ({ data: { loading, tasks = [] } }) => ({
    loading,
    activeTasks: tasks.filter(item => item.status === 'active'),
    inactiveTasks: tasks.filter(item => item.status === 'inactive')
  })
};

export default graphql(query, queryConfig)(RepeatableList);

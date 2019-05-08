import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import ListItem from '../ListItem';
import './TaskList.scss';
import { reorder } from 'helpers/reorder';

 const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);

  const fetchData = () => {
    const childsData = [...props.tasks];
    setTasks(childsData);
  };

  useEffect(fetchData, [props.tasks]);

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index,
    );

    setTasks(newTasks);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              styleName="repeatable-list"
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              <div styleName="repeatable-list">
                {tasks.map(renderTask)}
              </div>
              
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  );
};

const query = gql`
  query Tasks {
    tasks {
      _id,
      title,
    }
  }
`;

const queryConfig = {
  props: ({ data: { loading, tasks = [] } }) => ({
    loading,
    tasks
  })
};

const withGraphql = graphql(query, queryConfig);

export default compose(React.memo, withGraphql, withRouter)(TaskList);

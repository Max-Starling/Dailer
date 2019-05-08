import { Fragment, useState } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Draggable } from 'react-beautiful-dnd';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import DetailsModal from '../DetailsModal';
import ConfirmModal from 'components/ConfirmModal';
import './ListItem.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  // transform: isDragging ? 'scale(1.5)' : '',
  ...draggableStyle,
});

const ListItem = ({
  index,
  _id,
  title,
  updateTask,
}) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onConfirmSubmit = () => {
    toggleConfirmVisibility();
    updateTask({
      variables: {
        _id,
      },
    });
  };

  return (
    <Fragment>
      <Draggable key={_id} draggableId={_id} index={index}>
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              styleName="item"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={toggleDetailsVisibility}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
              )}
              css={theme => ({
                color: theme.textColor, 
                ...theme.listItem,
              })}
            >
              {title}
            </div>
          )
        }
      </Draggable>
      <DetailsModal
        isVisible={isDetailsVisible}
        toggleVisibility={toggleDetailsVisibility}
        _id={_id}
        title={title}
      />
      <ConfirmModal
        isVisible={isConfirmVisible}
        toggleVisibility={toggleConfirmVisibility}
        text="Have you really finished this task and want to refresh the timer?"
        onSubmit={onConfirmSubmit}
      />
    </Fragment>
  );
};

const query = gql`
  mutation($_id: ID!) {
    updateTask(_id: $_id) {
      _id,
      title,
    }
  }
`;

const queryConfig = {
  name: 'updateTask',
  options: {
    refetchQueries: ['Tasks'],
  },
};

export default graphql(query, queryConfig)(ListItem);


import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Timer from '../../static/timer.js';
import './ListItem.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  transform: isDragging ? 'scale(1.5)' : '',
  ...draggableStyle,
});

export default ({
  index,
  id,
  title,
  priority,
}) => {
  
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {
        (provided, snapshot) => (
          <div
          ref={provided.innerRef}
          styleName="item__inner"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
          >
            {title}
            <Timer />
          </div>
        )
      }
    </Draggable> 
  );
}
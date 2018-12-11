import React, { Fragment, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Timer from 'static/timer.js';
import DetailsModal from 'components/DetailsModal';
import { calculateAngle } from 'helpers/calculateAngle';
import './ListItem.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  // transform: isDragging ? 'scale(1.5)' : '',
  ...draggableStyle,
});

export default ({
  index,
  id,
  title,
  priority,
  startDate,
  frequency,
}) => {
  
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  return (
    <Fragment>
      <Draggable key={id} draggableId={id} index={index}>
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              styleName="item__inner"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={toggleDetailsVisibility}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
              )}
            >
              {title}
              <Timer
                id={id}
                angle={calculateAngle(startDate, frequency)}
              />
            </div>
          )
        }
      </Draggable>
      <DetailsModal
        isVisible={isDetailsVisible}
        toggleVisibility={toggleDetailsVisibility}
        id={id}
        title={title}
        frequency={frequency}
      />
    </Fragment>
  );
}
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; 
import { Draggable } from 'react-beautiful-dnd';

import Timer from 'static/timer.js';
import DetailsModal from 'components/DetailsModal';
import ConfirmModal from 'components/ConfirmModal';
import { editRepeatableTask } from 'resources/repeatableTasks/repeatableTasks.actions';
import { calculateAngle } from 'helpers/calculateAngle';
import './ListItem.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  // transform: isDragging ? 'scale(1.5)' : '',
  ...draggableStyle,
});

const ListItem = ({
  index,
  id,
  title,
  priority,
  status,
  startDate,
  frequency,
  editRepeatableTask,
}) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const angle = calculateAngle(startDate, frequency);

  const onTimerClick = (event) => {
    event.stopPropagation();
    toggleConfirmVisibility();
  };

  const onConfirmSubmit = () => {
    toggleConfirmVisibility();
    editRepeatableTask({
      id,
      startDate: (new Date()).toISOString(),
    }); 
  };

  return (
    <Fragment>
      {
        status === 'active'
          ? 
            <Draggable key={id} draggableId={id} index={index}>
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
                  >
                    {title}
                    <div
                      styleName="item__timer"
                      onClick={onTimerClick}
                    >
                      <Timer
                        id={id}
                        angle={angle}
                      />
                    </div>
                  </div>
                )
              }
            </Draggable>
          :
            <div
              styleName="item item--inactive"
              onClick={toggleDetailsVisibility}
            >
              {title}
            </div>
      }
      <DetailsModal
        isVisible={isDetailsVisible}
        toggleVisibility={toggleDetailsVisibility}
        id={id}
        title={title}
        frequency={frequency}
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

const mapDispatchToProps = {
  editRepeatableTask,
};

export default connect(null, mapDispatchToProps)(ListItem);

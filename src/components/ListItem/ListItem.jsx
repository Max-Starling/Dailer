import React, { Fragment, useRef, useState } from 'react';
import cx from 'classnames';

import './ListItem.scss';

export default ({
  index,
  onDragStart,
  onDragEnter,
  onDrop,
  id,
  grabbedItem,
}) => {
  const [isActive, setIsActive] = useState(false);
  const itemRef = useRef(null);
  
  const onDragStartHandler = (event) => {
    // itemRef.current.style.display = 'none';
    // setTimeout(() => {
    //   itemRef.current.style.display = '';
    // }, 1);
    console.log('start', index);
    onDragStart(event, index, id, itemRef);
  }

  const onDragEnterHandler = (event, side) => {
    event.preventDefault();
    setIsActive(true);
    onDragEnter(index, itemRef);
  }

  const onDragOverHandler = (event) => {
    event.preventDefault();
  }

  const onDragLeaveHandler = (event) => {
    event.preventDefault();
    setIsActive(false);
  }

  const onDragEndHandler = (event) => {
    itemRef.current.style.display = '';
  }

  const onDropHandler = (event) => {
    setIsActive(false);
    onDrop(event, index);
  }

  return (
    <Fragment>
      <div
        styleName="item__inner"
        draggable="true"
        onDragStart={onDragStartHandler}
        // onDragOver={(e) => console.log(e.clientY)}
        ref={itemRef}
      >
        {id}
      </div>
    {
      // (grabbedItem !== index) &&
        <div
          droppable="true"
          onDragEnter={onDragEnterHandler}
          onDragLeave={onDragLeaveHandler}  
          onDragOver={onDragOverHandler}
          onDragEnd={onDragEndHandler}               
          onDrop={onDropHandler}
          style={{
            height: `${isActive ? '80' : '16'}px`,
            opacity: `${isActive ? '1' : '0'}`,
            visibility: `${grabbedItem === index || grabbedItem === index + 1 ? 'hidden' : 'visible'}`
          }}
          styleName={cx('droppable', isActive && 'droppable--active')}
        >
          {
            isActive &&
            <div
              styleName="droppable__inner"
            >
              +
            </div>
          }
        </div>
    }
    </Fragment> 
  );
}
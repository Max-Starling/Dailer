import React, { useState } from 'react';

import ListItem from '../ListItem';
import './Content.scss';

const childs = [];
for (let i = 0; i < 10; i++) {
  childs.push({
    id: Math.floor(Math.random() * 100),
  })
}

export default () => {
  const [grabbedItem, setGrabbedItem] = useState(null);
  const [childsStore, setChilds] = useState(childs);
  
  console.log('cs', childsStore);

  const onDragEnter = (index) => {
    // e.preventDefault();
    // console.log(index);
  };
  
  const onDrop = (event, index) => {
    // const id = event.dataTransfer.getData('id');
    // console.log(id);

    const newChilds = [...childsStore];
    console.log('compare', grabbedItem, index);
    if (grabbedItem > index) {
      newChilds.splice(grabbedItem, 1);
      newChilds.splice(index + 1, 0, childsStore[grabbedItem])
    } else {
      newChilds.splice(grabbedItem, 1);
      newChilds.splice(index, 0, childsStore[grabbedItem])
    }
    setChilds(newChilds);
    setGrabbedItem(null);
  };
  
  const onDragStart = (event, index, id, ref) => {
    // event.dataTransfer.setData('id', id);
    console.log('start', id, ref);
    setGrabbedItem(index);
  };

  const renderContentChild = (item, index) => {
    return (
      <ListItem
        key={index}
        index={index}
        onDragEnter={onDragEnter}                    
        onDrop={onDrop}
        onDragStart={onDragStart}
        id={item.id}
        grabbedItem={grabbedItem}
      >
      </ListItem>
    );
  };

  return (
    <main styleName="content">
      {/* <div styleName="content__add-button">+</div> */}
      {childsStore.map(renderContentChild)}
    </main>
  );
}

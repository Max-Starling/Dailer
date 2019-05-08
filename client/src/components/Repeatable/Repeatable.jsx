import React from 'react';
import Header from 'components/Header';
import AddModalWindow from './components/AddModalWindow';
import RepeatableList from './components/RepeatableList';

 const Repeatable = (props) => {
  return (
    <>
      <Header
        title="Repeatable"
        renderModalWindow={({ ...props }) => <AddModalWindow {...props} />}
      />
      <RepeatableList />
    </> 
  );
};

export default Repeatable;

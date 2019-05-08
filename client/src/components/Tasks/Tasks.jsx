import React from 'react';
import Header from 'components/Header';
import AddModalWindow from './components/AddModalWindow';
import TaskList from './components/TaskList';

 const Tasks = (props) => {
  return (
    <>
      <Header
        title="Tasks"
        renderModalWindow={({ ...props }) => <AddModalWindow {...props} />}
      />
      <TaskList />
    </> 
  );
};

export default Tasks;

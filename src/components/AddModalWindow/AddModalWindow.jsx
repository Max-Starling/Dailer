import React, { useState } from 'react'
import { connect } from 'react-redux';

import ModalWindow from 'components/ModalWindow';
import Input from 'components/Input';
import Button from 'components/Button';
import { addRepeatableTask } from 'resources/repeatableTasks/repeatableTasks.actions';
import './AddModalWindow.scss';

const AddModalWindow = ({
  toggleVisibility,
  isVisible,
  addRepeatableTask,
}) => {
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('7');

  const onFrequencyChange = e => setFrequency(e.target.value.replace(/[^0-9]/g, '').substr(0, 2));

  const onSave = () => {
    // console.log(frequency, title);
    if (frequency && title) {
      const now = new Date();
      // console.log(addRepeatableTask);
      addRepeatableTask({
        id: now.toISOString(),
        title,
        frequency,
        startDate: now.toISOString(),
        priority: 'medium',
      });
      toggleVisibility();
    }
  };

  return (
    <ModalWindow
      toggleVisibility={toggleVisibility}
      isVisible={isVisible}
    >
      <div styleName="add-modal">
        <p styleName="add-modal__title">Add task</p>
        <Input
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          label="Frequency (days)"
          value={frequency}
          onChange={onFrequencyChange}
        />
        <Button
          text="Save"
          onClick={onSave}
        />
      </div>
    </ModalWindow>
  )
};

const mapDispatchToProps = {
  addRepeatableTask,
};

export default connect(null, mapDispatchToProps)(AddModalWindow);

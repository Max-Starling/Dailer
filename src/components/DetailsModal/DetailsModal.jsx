import React, { useState } from 'react'
import { connect } from 'react-redux';

import ModalWindow from 'components/ModalWindow';
import Input from 'components/Input';
import Button from 'components/Button';
import { editRepeatableTask } from 'resources/repeatableTasks/repeatableTasks.actions';
import './DetailsModal.scss';

const DetailsModal = ({
  toggleVisibility,
  isVisible,
  editRepeatableTask,
  id,
  title: propsTitle,
  frequency: propsFrequency,
}) => {
  const [title, setTitle] = useState(propsTitle ? propsTitle : '');
  const [frequency, setFrequency] = useState(propsFrequency ? propsFrequency : '7');

  const onFrequencyChange = e => setFrequency(e.target.value.replace(/[^0-9]/g, '').substr(0, 2));

  const onSave = () => {
    if (frequency && title) {
      editRepeatableTask({
        id,
        title,
        frequency,
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
        <p styleName="add-modal__title">Details View</p>
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
  editRepeatableTask,
};

export default connect(null, mapDispatchToProps)(DetailsModal);

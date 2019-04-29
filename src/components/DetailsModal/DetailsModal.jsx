import React, { useState, useEffect } from 'react'
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
  _id,
  title: propsTitle,
  frequency: propsFrequency,
  status: propsStatus,
}) => {
  const [title, setTitle] = useState(propsTitle ? propsTitle : '');
  const [frequency, setFrequency] = useState(propsFrequency ? propsFrequency : '7');
  const [status, setStatus] = useState(propsStatus);

  const setData = () => {
    setTitle(propsTitle);
    setFrequency(propsFrequency);
    setStatus(propsStatus);
  };

  useEffect(setData, [isVisible]);

  const onFrequencyChange = e => setFrequency(e.target.value.replace(/[^0-9]/g, '').substr(0, 2));

  const onSave = () => {
    if (frequency && title) {
      editRepeatableTask({
        _id,
        title,
        frequency,
        status,
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
        <p
          styleName="add-modal__change-activity"
          role="presentation"
          onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}
        >
            {`Make ${status === 'active' ? 'inactive' : 'active'}`}
        </p>
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

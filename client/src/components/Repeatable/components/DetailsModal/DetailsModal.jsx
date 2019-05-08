import { useState, useEffect } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
/** @jsx jsx */
import { jsx } from '@emotion/core';

import ModalWindow from 'components/ModalWindow';
import Input from 'components/Input';
import Button from 'components/Button';
import './DetailsModal.scss';

const DetailsModal = ({
  toggleVisibility,
  isVisible,
  updateRepeatable,
  _id,
  title: propsTitle,
  frequency: propsFrequency,
  status: propsStatus,
}) => {
  const [title, setTitle] = useState(propsTitle ? propsTitle : '');
  const [frequency, setFrequency] = useState(propsFrequency ? propsFrequency : 7);
  const [status, setStatus] = useState(propsStatus);

  const setData = () => {
    setTitle(propsTitle);
    setFrequency(propsFrequency);
    setStatus(propsStatus);
  };

  useEffect(setData, [isVisible]);

  const onFrequencyChange = e => setFrequency(parseInt(e.target.value.replace(/[^0-9]/g, '').substr(0, 2)) || '');

  const onSave = () => {
    if (frequency && title) {
      updateRepeatable({
        variables: {
          _id,
          title,
          frequency,
          status,
        },
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
        <p
          styleName="add-modal__title"
          css={theme => ({ color: theme.textColor })}
        >
          Details View
        </p>
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
          css={theme => ({ color: theme.textColor })}
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

const query = gql`
  mutation($_id: ID!, $title: String, $status: String, $frequency: Int) {
    updateRepeatable(_id: $_id, title: $title, status: $status, frequency: $frequency) {
      _id,
      title,
      frequency,
      status,
      startTime
    }
  }
`;

const queryConfig = {
  name: 'updateRepeatable',
  options: {
    refetchQueries: ['Tasks'],
  },
};

export default graphql(query, queryConfig)(DetailsModal);

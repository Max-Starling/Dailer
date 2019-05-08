import { useState } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
/** @jsx jsx */
import { jsx } from '@emotion/core';

import ModalWindow from 'components/ModalWindow';
import Input from 'components/Input';
import Button from 'components/Button';
import './AddModalWindow.scss';

const AddModalWindow = ({
  toggleVisibility,
  isVisible,
  createRepeatable,
}) => {
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState(7);

  const onFrequencyChange = e => setFrequency(parseInt(e.target.value.replace(/[^0-9]/g, '').substr(0, 2)) || '');

  const onSave = async () => {
    if (frequency && title) {
      try {
        await createRepeatable({
          variables: {
            title,
            frequency,
          },
        });
      } catch (e) {
        console.log(e);
      }
      setTitle('');
      setFrequency(7);
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
          Add repeatable
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
        <Button
          text="Save"
          onClick={onSave}
        />
      </div>
    </ModalWindow>
  )
};

const query = gql`
  mutation ($title: String!, $frequency: Int!) {
    createRepeatable(title: $title, frequency: $frequency) {
      _id
      title
      frequency
      status
      startTime
    }
  }
`;

const queryConfig = {
  name: 'createRepeatable',
  options: {
    refetchQueries: ['Repeatables'],
  },
};

export default graphql(query, queryConfig)(AddModalWindow);

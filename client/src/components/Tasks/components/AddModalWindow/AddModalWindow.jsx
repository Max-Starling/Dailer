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
  createTask,
}) => {
  const [title, setTitle] = useState('');

  const onSave = async () => {
    if (title) {
      try {
        await createTask({
          variables: {
            title,
          },
        });
      } catch (e) {
        console.log(e);
      }
      setTitle('');
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
          Add task
        </p>
        <Input
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
  mutation ($title: String!) {
    createTask(title: $title) {
      _id
      title
    }
  }
`;

const queryConfig = {
  name: 'createTask',
  options: {
    refetchQueries: ['Tasks'],
  },
};

export default graphql(query, queryConfig)(AddModalWindow);

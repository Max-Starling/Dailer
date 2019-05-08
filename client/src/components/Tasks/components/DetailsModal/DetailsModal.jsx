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
  updateTask,
  _id,
  title: propsTitle,
}) => {
  const [title, setTitle] = useState(propsTitle ? propsTitle : '');

  const setData = () => {
    setTitle(propsTitle);
  };

  useEffect(setData, [isVisible]);

  const onSave = () => {
    if (title) {
      updateTask({
        variables: {
          _id,
          title,
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
        <Button
          text="Save"
          onClick={onSave}
        />
      </div>
    </ModalWindow>
  )
};

const query = gql`
  mutation($_id: ID!, $title: String) {
    updateTask(_id: $_id, title: $title) {
      _id,
      title,
    }
  }
`;

const queryConfig = {
  name: 'updateTask',
  options: {
    refetchQueries: ['Tasks'],
  },
};

export default graphql(query, queryConfig)(DetailsModal);

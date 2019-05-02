import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import './Settings.scss';

const Settings = ({
  updateSettings,
  account = {},
}) => {
  // console.log(account);
  // const [mode, setMode] = useState(account ? account : 7);

  const onSave = (mode) => {
    if (mode) {
      // setMode(mode);
      updateSettings({
        variables: {
          _id: account._id,
          mode,
        },
      });
    }
  };

  return (
    <div styleName="settings">
      Theme:
      <button onClick={() => onSave('dark')}>Dark</button>
      <button onClick={() => onSave('light')}>Light</button>
    </div>
  );
}

const query = gql`
  mutation($_id: ID!, $mode: String) {
    updateSettings(_id: $_id, mode: $mode) {
      mode
    }
  }
`;

const queryConfig = {
  name: 'updateSettings',
  options: {
    refetchQueries: ['Account'],
  },
};

export default graphql(query, queryConfig)(Settings);

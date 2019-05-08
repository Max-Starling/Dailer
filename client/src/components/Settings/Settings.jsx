import React from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Button from 'components/Button';
import Header from 'components/Header';

import './Settings.scss';
import GoogleSignOut from '../GoogleSignOutButton/GoogleSignOutButton';

const Settings = ({
  updateSettings,
}) => {

  const onSave = (mode) => {
    if (mode) {
      updateSettings({
        variables: {
          mode,
        },
      });
    }
  };

  return (
    <>
      <Header title="Settings" />
      <div styleName="settings">
        Theme:
        <div>
          <Button
            onClick={() => onSave('light')}
            text="Light"
          />
          <Button
            onClick={() => onSave('dark')}
            text="Dark"
          />
        </div>
        <GoogleSignOut />
      </div>
    </>
  );
}

const query = gql`
  mutation($mode: String) {
    updateSettings(mode: $mode) {
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

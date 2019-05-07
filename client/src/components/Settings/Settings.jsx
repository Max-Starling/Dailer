import React from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Button from 'components/Button';

import './Settings.scss';
import GoogleSignOut from '../GoogleSignOutButton/GoogleSignOutButton';

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

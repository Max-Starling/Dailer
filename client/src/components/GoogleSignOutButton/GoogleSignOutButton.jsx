import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const GoogleSignOut = ({ history, signOut }) => {
  const onClick = async () => {
    try {
      await signOut();
        
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.log('User signed out.');
      history.push({
        pathname: '/sign-in',
        state: { isAuthorized: false },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Button
      onClick={onClick}
      text="Sign Out"
    />
  );
}

const query = gql`
  mutation {
    signOut
  }
`;

const queryConfig = {
  name: 'signOut',
  options: {
    refetchQueries: ['Tasks'],
  },
};

const withGraphql =  graphql(query, queryConfig);

export default compose(withRouter, withGraphql)(GoogleSignOut);


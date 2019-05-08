import React from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import { ReactComponent as GoogleIcon } from 'static/google.svg';
import { DEFAULT_AUTHORIZED_ROUTE } from '../../AuthorizedRoutes';
import './GoogleSignInButton.scss';

const GoogleSignIn = ({ history, signIn }) => {
  const onSuccess = async (googleUser) => {
    await signIn({
      variables: {
        idToken: googleUser.getAuthResponse().id_token,
      },
    });
    history.push({
      pathname: DEFAULT_AUTHORIZED_ROUTE,
      state: { isAuthorized: true },
    });
  }

  const renderButton = (renderProps) => (
    <button
      onClick={renderProps.onClick}
      styleName="google-signin-button"
    >
      <div styleName="google-signin-button__icon"><GoogleIcon /></div>
      <div styleName="google-signin-button__text">Sign In</div>
    </button>
  );

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      render={renderButton}
      buttonText='Sign In'
      clientId='642122115167-leknpsabvq65p5vmfc9kcb72mcfg8cp5.apps.googleusercontent.com'
    />
  );
}

const query = gql`
  mutation ($idToken: String!) {
    signIn(idToken: $idToken)
  }
`;

const queryConfig = {
  name: 'signIn',
  options: {
    refetchQueries: ['Tasks'],
  },
};

const withGraphql =  graphql(query, queryConfig);

export default compose(withRouter, withGraphql)(GoogleSignIn);

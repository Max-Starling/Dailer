import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { withRouter } from "react-router-dom";
import { ReactComponent as GoogleIcon } from 'static/google.svg';
import { DEFAULT_AUTHORIZED_ROUTE } from '../../AuthorizedRoutes';
import './GoogleSignInButton.scss';

const GoogleSignIn = ({ history }) => {
  const onSuccess = async (googleUser) => {
    const id_token = googleUser.getAuthResponse().id_token;
    const res = await axios.post(
      'http://localhost:4000/login',
      { idToken: id_token },
      { withCredentials: true },
    );
    history.push({
      pathname: DEFAULT_AUTHORIZED_ROUTE,
      state: { isAuthorized: true },
    });
    console.log(res);
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

export default withRouter(GoogleSignIn);

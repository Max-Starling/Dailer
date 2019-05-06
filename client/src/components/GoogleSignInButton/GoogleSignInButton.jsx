import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { ReactComponent as GoogleIcon } from 'static/google.svg';
import './GoogleSignInButton.scss';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';

class GoogleSignIn extends React.Component {
  async onSuccess(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const res = await axios.post(
      'http://localhost:4000/login',
      { idToken: id_token },
      { withCredentials: true },
    );
    console.log(res);
  }

  renderButton = (renderProps) => (
    <button
      onClick={renderProps.onClick}
      styleName="google-signin-button"
    >
      <div styleName="google-signin-button__icon"><GoogleIcon /></div>
      <div styleName="google-signin-button__text">Sign In</div>
    </button>
  );

  render() {
    return (
      <>
      <div id={GOOGLE_BUTTON_ID} />
      <GoogleLogin
        onSuccess={this.onSuccess}
        render={this.renderButton}
        buttonText='Sign In'
        clientId='642122115167-leknpsabvq65p5vmfc9kcb72mcfg8cp5.apps.googleusercontent.com'
      />
      </>
    );
  }
}

export default GoogleSignIn;

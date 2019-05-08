import React from 'react';

import { ReactComponent as LogoIcon } from 'static/logo.svg';
import GoogleSignIn from '../GoogleSignInButton/GoogleSignInButton';
import './SignIn.scss';

const Settings = () => {
  return (
    <div styleName="sign-in">
      <div styleName="sign-in__logo">
        <LogoIcon />
      </div>
      <GoogleSignIn />
    </div>
  );
}

export default Settings;

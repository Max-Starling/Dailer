import React from 'react';
import axios from 'axios';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';

class GoogleSignIn extends React.Component {
  componentDidMount() {
    window.gapi.signin2.render(
      GOOGLE_BUTTON_ID,
      {
        width: 200,
        height: 50,
        onsuccess: this.onSuccess,
        theme: 'dark',
      },
    );
  }

  async onSuccess(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const res = await axios.post(
      'http://localhost:4000/login',
      { idToken: id_token },
      { withCredentials: true },
    );
    console.log(res);
  }

  render() {
    return (
      <div id={GOOGLE_BUTTON_ID}/>
    );
  }
}

export default GoogleSignIn;

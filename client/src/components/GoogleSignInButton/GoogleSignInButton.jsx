import React from 'react';

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
    const profile = googleUser.getBasicProfile();
    console.log("Name: " + profile.getEmail());
  }

  render() {
    return (
      <div id={GOOGLE_BUTTON_ID}/>
    );
  }
}

export default GoogleSignIn;

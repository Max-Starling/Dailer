import React from 'react';
import axios from 'axios';

class GoogleSignOut extends React.Component {
  async signOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();

    const res = await axios.post(
      'http://localhost:4000/logout',
      {},
      { withCredentials: true },
    );
    console.log(res);

    try {   
      await auth2.signOut();
      console.log('User signed out.');
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div onClick={this.signOut}>Sign out</div>
    );
  }
}

export default GoogleSignOut;

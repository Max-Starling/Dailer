import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';

const GoogleSignOut = ({ history }) => {
  const signOut = async () => {
    try {
      var auth2 = window.gapi.auth2.getAuthInstance();

      const res = await axios.post(
        'http://localhost:4000/logout',
        {},
        { withCredentials: true },
      );
      console.log(res);

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
      onClick={signOut}
      text="Sign Out"
    />
  );
}

export default withRouter(GoogleSignOut);

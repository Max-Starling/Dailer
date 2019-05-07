import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import SignIn from 'components/SignIn';
import Loading from 'components/Loading';
import AuthorizedRoutes from './AuthorizedRoutes';
import './App.css';

const App = ({ location }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fakeLoading = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  const checkAuth = () => {
    (async () => {
      fakeLoading();
      const { data } = await axios.get('http://localhost:4000/check', { withCredentials: true });
      setIsAuthorized(!!data.isAuthorized);
    })();
  };

  const updateAuth = () => {
    if (location.state && typeof location.state.isAuthorized === 'boolean') {
      setIsAuthorized(location.state.isAuthorized);
    }
  };

  useEffect(checkAuth, []);
  useEffect(updateAuth, [location.state])

  return (
    <>
      <Loading isLoaded={isLoaded} />
      {
        isAuthorized 
          ? <AuthorizedRoutes />
          : (
            <Switch>
              <Route
                exact
                path="/sign-in"
                render={SignIn}
              />
              <Route
                path="*"
                render={() => <Redirect to={{ pathname: "/sign-in" }} />}
              />
            </Switch>
          )
      }
    </>
  );
}

export default withRouter(App);

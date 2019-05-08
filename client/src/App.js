import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import gql from 'graphql-tag';
import { graphql, compose } from "react-apollo";

import SignIn from 'components/SignIn';
import Loading from 'components/Loading';
import AuthorizedRoutes from './AuthorizedRoutes';
import './App.css';

const App = ({ location, check }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fakeLoading = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  const updateAuth = () => {
    if (location.state && typeof location.state.isAuthorized === 'boolean') {
      setIsAuthorized(location.state.isAuthorized);
    }
  };

  const updateAuthOnCheck = () => {
    setIsAuthorized(check);
  }

  useEffect(fakeLoading, []);
  useEffect(updateAuth, [location.state])
  useEffect(updateAuthOnCheck, [check]);

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

const query = gql`
  query {
    check
  }
`;

const queryConfig = {
  props: ({ data: { check = false } }) => ({ check }),
};

const withGraphql = graphql(query, queryConfig);

export default compose(withGraphql, withRouter)(App);

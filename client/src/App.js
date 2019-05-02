import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from 'components/Header';
import Content from 'components/Content';
import Settings from 'components/Settings';
import RepeatableList from 'components/RepeatableList';
import Loading from 'components/Loading';
import themes from 'static/themes';
import './App.css';

const _id = '5ccaff97725968bb36279702';

const query = gql`
  query Account ($_id: ID!) {
    account (_id: $_id) {
      _id,
      settings {
        mode
      }
    }
  }
`;

const App = () => {
  const [currentTab, setCurrentTab] = useState('Repeatable');
  const [isLoaded, setIsLoaded] = useState(false);

  const fakeLoading = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  };

  // useEffect(fakeLoading, []);

  const renderRoute = (Component, tab, additionalProps) => (props) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
    }
    return <Component {...props} {...additionalProps} />;
  };

  // console.log(account);
  return (
    <Query query={query} variables={{ _id }}>
        {({
          loading,
          error,
          data: { account = { settings: {} } },
        }) => {
          if (loading) return null;
          fakeLoading();
          if (error) {
            console.log(error);
            return null;
          }

          const mode = account.settings.mode || 'light';
          return (
            <ThemeProvider theme={themes[mode]}> 
              <Loading isLoaded={isLoaded} />
              <Header currentTab={currentTab} />
              <Content>
                <Switch>
                  <Route
                    exact
                    path="/repeatable"
                    render={renderRoute(RepeatableList, 'Repeatable')}
                  />
                  <Route
                    exact
                    path="/settings"
                    render={renderRoute(Settings, 'Settings', { account })}
                  />
                  <Route
                    path="*"
                    render={() => <Redirect to={{ pathname: "/repeatable" }} />}
                  />
                </Switch>
              </Content>
            </ThemeProvider>
          )}
        }
    </Query>
  );
}

export default App;

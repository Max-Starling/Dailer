import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import gql from 'graphql-tag';
import { Query } from "react-apollo";

import Content from 'components/Content';
import Settings from 'components/Settings';
import Repeatable from 'components/Repeatable';
import Tasks from 'components/Tasks';
import themes from 'static/themes';
import './App.css';

const query = gql`
  query Account {
    currentAccount {
      email,
      settings {
        mode
      }
    }
  }
`;

export const DEFAULT_AUTHORIZED_ROUTE = '/repeatable';

const App = () => {
  return (
    <Query query={query}>
        {({
          loading,
          error,
          data,
        }) => {
          if (loading || !data || !data.currentAccount) return null;
          const { settings = {} } = data.currentAccount;
          if (error) {
            console.log(error);
            return null;
          }

          const mode = settings.mode || 'light';
          return (
            <ThemeProvider theme={themes[mode]}>
              <Content>
                <Switch>
                  <Route
                    exact
                    path="/repeatable"
                    component={Repeatable}
                  />
                  <Route
                    exact
                    path="/tasks"
                    component={Tasks}
                  />
                  <Route
                    exact
                    path="/settings"
                    render={() => <Settings />}
                  />
                  <Route
                    path="*"
                    render={() => <Redirect to={{ pathname: DEFAULT_AUTHORIZED_ROUTE }} />}
                  />
                </Switch>
              </Content>
            </ThemeProvider>
          )}
        }
    </Query>
  );
};

export default App;
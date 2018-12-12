import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Content from 'components/Content';
import RepeatableSettings from 'components/RepeatableSettings';
import RepeatableList from 'components/RepeatableList';
import './App.css';

const Link = styled.a`
  color: #61dafb;
`;

const App = () => {
  const [currentTab, setCurrentTab] = useState('Repeatable');

  const renderRoute = (Component, tab) => (props) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
    }
    return <Component {...props} />;
  };

  return (
    <Fragment>
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
            path="/repeatable/settings"
            render={renderRoute(RepeatableSettings, 'Settings')}
          />
          <Route
            path="*"
            render={() => <Redirect to={{ pathname: "/repeatable" }} />}
          />
          {/* <Route
            exact
            path="/tasks/settings"
            component={TasksSettings}
          /> */}
        </Switch>
      </Content>
    </Fragment>
  );
}

export default App;

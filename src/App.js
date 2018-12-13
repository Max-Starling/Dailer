import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Content from 'components/Content';
import RepeatableSettings from 'components/RepeatableSettings';
import RepeatableList from 'components/RepeatableList';
import Loading from 'components/Loading';
import './App.css';

const App = () => {
  const [currentTab, setCurrentTab] = useState('Repeatable');
  const [isLoaded, setIsLoaded] = useState(false);

  const fakeLoading = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  };

  useEffect(fakeLoading, []);

  const renderRoute = (Component, tab) => (props) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
    }
    return <Component {...props} />;
  };

  return (
    <Fragment>
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

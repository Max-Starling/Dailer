import React, { Fragment } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Content from './components/Content';

import './App.css';

const Link = styled.a`
  color: #61dafb;
`;
export default () => {
  return (
    <Fragment>
      <Header currentTab="Main" />
      <Content>

      </Content>
    </Fragment>
  );
}


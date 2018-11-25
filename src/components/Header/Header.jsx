import React from 'react'

import MenuIcon from '../../static/menu-icon.js';
import AddIcon from '../../static/add-icon.js';
import './Header.scss';

export default ({
  currentTab,
}) => {
  return (
    <div styleName="header-wrapper">
      <header styleName="header">
        <MenuIcon fill="#000" />
        <p styleName="header__title">{`< ${currentTab} >`}</p>
        <AddIcon fill="#000" />
      </header>
    </div>
  )
};

import React, { useState } from 'react'

import AddModalWindow from 'components/AddModalWindow';
import MenuIcon from 'static/menu-icon.js';
import AddIcon from 'static/add-icon.js';
import './Header.scss';

export default ({
  currentTab,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleAddModalVisibility = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  return (
    <div styleName="header-wrapper">
      <header styleName="header">
        <MenuIcon fill="#000" />
        <p styleName="header__title">{`< ${currentTab} >`}</p>
        <div
          role="presentation"
          styleName="header__icon"
          onClick={toggleAddModalVisibility}
        >
        <AddIcon fill="#000" />
        </div>
      </header>
      <AddModalWindow
        toggleVisibility={toggleAddModalVisibility}
        isVisible={isAddModalOpen}
      />
    </div>
  )
};

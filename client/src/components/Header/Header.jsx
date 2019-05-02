import React, { useState } from 'react'

import AddModalWindow from 'components/AddModalWindow';
import Sidebar from 'components/Sidebar';
import MenuIcon from 'static/menu-icon.js';
import AddIcon from 'static/add-icon.js';
import './Header.scss';

export default ({
  currentTab,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleAddModalVisibility = () => setIsAddModalOpen(!isAddModalOpen);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebarVisibility = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div styleName="header-wrapper">
      <header styleName="header">
        <div
          role="presentation"
          styleName="header__icon"
          onClick={toggleSidebarVisibility}
        >
          <MenuIcon fill="#000" />
        </div>
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
      <Sidebar
        toggleVisibility={toggleSidebarVisibility}
        isVisible={isSidebarOpen}
      />
    </div>
  )
};

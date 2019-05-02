import { useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import AddModalWindow from 'components/AddModalWindow';
import Sidebar from 'components/Sidebar';
import MenuIcon from 'static/menu-icon.js';
import AddIcon from 'static/add-icon.js';
import './Header.scss';

export default withTheme(({
  currentTab,
  theme,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleAddModalVisibility = () => setIsAddModalOpen(!isAddModalOpen);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebarVisibility = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div styleName="header-wrapper">
      <header
        styleName="header"
        css={{
          color: theme.textColor, 
          ...theme.header,
        }}
      >
        <div
          role="presentation"
          styleName="header__icon"
          onClick={toggleSidebarVisibility}
        >
          <MenuIcon fill={theme.textColor} />
        </div>
        <p
          styleName="header__title"
          css={{ color: theme.textColor }}
        >
          {`< ${currentTab} >`}
        </p>
        <div
          role="presentation"
          styleName="header__icon"
          onClick={toggleAddModalVisibility}
        >
        <AddIcon fill={theme.textColor} />
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
});

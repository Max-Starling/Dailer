import { useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';

// import AddModalWindow from 'components/AddModalWindow';
import Sidebar from 'components/Sidebar';
import MenuIcon from 'static/menu-icon.js';
import AddIcon from 'static/add-icon.js';
import './Header.scss';

export default withTheme(({
  title,
  theme,
  renderModalWindow,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalVisibility = () => setIsModalOpen(!isModalOpen);

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
          {`< ${title} >`}
        </p>
        <div
          role="presentation"
          styleName="header__icon"
          onClick={toggleModalVisibility}
        >
        {
          !!renderModalWindow && <AddIcon fill={theme.textColor} />
        }
        </div>
      </header>
      {
        typeof renderModalWindow === 'function' &&
          renderModalWindow({
            toggleVisibility: toggleModalVisibility,
            isVisible: isModalOpen,
          })
      }
      <Sidebar
        toggleVisibility={toggleSidebarVisibility}
        isVisible={isSidebarOpen}
      />
    </div>
  )
});

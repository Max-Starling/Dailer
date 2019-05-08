
// import React from 'react'
import { Link, withRouter } from 'react-router-dom';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import { compose } from 'react-apollo';

import CloseIcon from 'static/close-icon';
import SettingsIcon from 'static/settings-icon';
import './Sidebar.scss';

const tabs = [
  {
    path: '/repeatable',
    name: 'Repeatable',
  },
  {
    path: '/tasks',
    name: 'Tasks',
  }
];

const Sidebar = ({
  isVisible,
  toggleVisibility,
  theme,
  location,
}) => {
  const renderTab = ({ path, name }, index) => (
    <Link
      to={path}
      onClick={toggleVisibility}
      key={index}
    >
      <div
        styleName="menu__item menu-item"
        css={{
          background: path === location.pathname &&  theme.sidebar.activeTab,
        }}
      >
        <span
          styleName="menu-item__title"
          css={{
            color: theme.textColor,
          }}
        >
          {name}
        </span>
      </div>
    </Link>
  );

  return (
    <div styleName="sidebar-wrapper">
      <div styleName="overlay">
        <div
          styleName="overlay__inner"
          role="presentation"
          onClick={isVisible ? toggleVisibility : null}
          style={{
            opacity: `${isVisible ? '0.5' : '0'}`,
            visibility: `${isVisible ? 'visible' : 'hidden'}`,
          }}
        />
      </div>
      <div
        styleName="sidebar"
        style={{
          width: `${isVisible ? '320' : '0'}px`,
        }}
        css={{
          background: theme.menuBackground,
        }}
      >
        <div
          styleName="header"
          css={{
            color: theme.textColor, 
            ...theme.header,
          }}
        >        
          <div
            styleName="header__close-icon"
            role="presentation"
            onClick ={toggleVisibility}
          >
            <CloseIcon fill={theme.textColor} />
          </div>
          <p styleName="header__title">Menu</p>
          <div
            styleName="header__settings"
            role="presentation"
            onClick ={toggleVisibility}
          >
            <Link
              to="/settings"
              onClick={toggleVisibility}
              style={{ height: '26px' }}
            >
              <SettingsIcon fill={theme.textColor} />
            </Link>
          </div>
        </div>
        <div styleName="menu">
          {tabs.map(renderTab)}
        </div>
      </div>
    </div>
  )
};

export default compose(withTheme, withRouter)(Sidebar);


// import React from 'react'
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';

import CloseIcon from 'static/close-icon';
import SettingsIcon from 'static/settings-icon';
import './Sidebar.scss';

const Sidebar = ({
  isVisible,
  toggleVisibility,
  theme,
}) => {
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
          <Link
            to="/tasks"
            onClick={toggleVisibility}
          >
            <div styleName="menu__item menu-item">
            <span
              styleName="menu-item__title"
              css={{
                color: theme.textColor,
              }}
            >
              Tasks
            </span>
            </div>
          </Link>  
          <Link
            to="/repeatable"
            onClick={toggleVisibility}
          >
            <div styleName="menu__item menu-item">
              <span
                styleName="menu-item__title"
                css={{
                  color: theme.textColor,
                }}
              >
                Repeatable
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default withTheme(Sidebar);

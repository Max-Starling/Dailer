
import React from 'react'

import CloseIcon from 'static/close-icon.js';
import { ReactComponent as SettingsIcon } from 'static/settings5.svg';
import './Sidebar.scss';

const Sidebar = ({
  isVisible,
  toggleVisibility,
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
      >
        <div styleName="header">        
          <div
            styleName="header__close-icon"
            role="presentation"
            onClick ={toggleVisibility}
          >
            <CloseIcon fill="#000" />
          </div>
          <p styleName="header__title">Menu</p>
        </div>
        <div styleName="menu">
          <div styleName="menu__item menu-item">
            Tasks
            <SettingsIcon />
          </div>
          <div styleName="menu__item menu-item">
            Repeatable
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;

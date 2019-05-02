import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as LogoIcon } from 'static/logo.svg';
import './Loading.scss';

const Loading = ({
  isLoaded = false,
}) => (
  <div styleName="loading-wrapper">
    <div
      styleName="loading"
      style={{
        opacity: `${!isLoaded ? '1' : '0'}`,
        visibility: `${!isLoaded ? 'visible' : 'hidden'}`,
      }}
    >
      <div styleName="loading__icon">
        <LogoIcon />
      </div>
    </div>
  </div>
);

Loading.propTypes = {
  isLoaded: PropTypes.bool,
};  

Loading.defaultProps = {
  isLoaded: false,
};

export default Loading;

import { Fragment } from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import { withPropTypes } from 'helpers/withPropTypes';
import './ModalWindow.scss';

const propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
};

const defaultProps = {
  isVisible: false,
};

const ModalWindow = ({
  children,
  isVisible,
  toggleVisibility,
}) => {
  return (
    <div styleName="modal-window-container">
      {
        isVisible &&
          <Fragment>
            <div
              styleName="modal-window"
              css={theme => ({ ...theme.modalWindow })}
            >
              {children}
            </div>
            <div
              role="button"
              tabIndex={-1}
              onKeyPress={toggleVisibility}
              styleName="modal-overlay"
              onClick={toggleVisibility}
            />
          </Fragment>
      }
    </div>
  );
};

export default withPropTypes(ModalWindow, propTypes, defaultProps);

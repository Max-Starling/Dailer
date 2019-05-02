import React from 'react'
import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import ModalWindow from 'components/ModalWindow';
import Button from 'components/Button';
import './ConfirmModal.scss';

const ConfirmModal = ({
  isVisible,
  toggleVisibility,
  onSubmit,
  onCancel,
  text,
  submitButtonText,
}) => {

  return (
    <ModalWindow
      toggleVisibility={toggleVisibility}
      isVisible={isVisible}
    >
      <div styleName="confirm-modal">
        <p
          styleName="confirm-modal__title"
          css={theme => ({ color: theme.textColor })}
        >
          Confirm
        </p>
        <p 
          styleName="confirm-modal__subtitle"
          css={theme => ({ color: theme.textColor })}
        >
          {text}
        </p>
        <div styleName="buttons">
          <div styleName="buttons__item">
            <Button
              text="Cancel"
              onClick={onCancel ? onCancel : toggleVisibility}
            />
          </div>
          <div styleName="buttons__item"> 
            <Button
              text={submitButtonText}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  )
};

ConfirmModal.propTypes = {
  isVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  text: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string,
};

ConfirmModal.defaultProps = {
  isVisible: false,
  onCancel: null,
  submitButtonText: 'OK',
};

export default ConfirmModal;

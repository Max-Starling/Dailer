import { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  type,
  placeholder,
  label,
  disabled,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div styleName="input">
      {
        label &&
          <label
            htmlFor={label}
            styleName={cx('input__label', (isFocused || value) && 'input__label--active')}
            css={theme => ({
              color: theme.textColor,
              background: theme.modalWindow.background,
            })}
          >
           {label}
          </label>
      }
      <div styleName="input__outher">
        <input
          id={label}
          type={type}
          disabled={disabled}
          autoComplete="off"
          placeholder={placeholder}
          styleName="input__inner"
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          css={theme => ({
            color: theme.textColor,
            borderColor: theme.textColor,
            background: theme.modalWindow.background,
          })}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
  label: '',
  disabled: false,
  value: '',
};

export default Input;

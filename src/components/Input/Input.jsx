import React, { Component, useState } from 'react';
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

  console.log(isFocused);
  return (
    <div styleName="input">
      {
        label &&
          <label
            htmlFor={label}
            styleName={cx('input__label', (isFocused || value) && 'input__label--active')}
          >
           {label}
          </label>
      }
      <div styleName="input__outher">
        <input
          id={label}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          styleName="input__inner"
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
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

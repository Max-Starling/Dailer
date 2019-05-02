import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import './Button.scss';

const Button = ({
  type,
  text,
  onClick,
  disabled,
}) => {
  return (
    <div styleName="button">
      <button
        type={type}
        disabled={disabled}
        styleName="button__inner"
        css={theme => ({ color: theme.textColor, borderColor: theme.textColor })}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  text: '',
  type: 'button',
  disabled: false,
};

export default Button;

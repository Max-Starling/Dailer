import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import './Content.scss';

const Content = (props) => {
  return (
    <main
      styleName="content"
      css={theme => ({ background: theme.mainBackground })}
    >
      {props.children}
    </main>
  );
}

Content.propTypes = {
  children: PropTypes.node,
};

Content.defaultProps = {
  children: null,
};

export default Content;

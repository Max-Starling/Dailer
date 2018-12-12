import React from 'react';
import PropTypes from 'prop-types';

import './Content.scss';

const Content = (props) => {
  return (
    <main styleName="content">
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

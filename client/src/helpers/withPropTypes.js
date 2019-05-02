export const withPropTypes = (component, propTypes = {}, defaultProps = {}) => {
  component.propTypes = propTypes;
  component.defaultProps = defaultProps;
  return component;
};

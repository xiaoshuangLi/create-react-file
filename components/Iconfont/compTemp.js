module.exports = ({ low = false } = {}) => `
import React, { Component${low ? ', PropTypes' : ''} } from 'react';
${low ? '' : `import PropTypes from 'prop-types';`}
import classnames from 'classnames';

class Iconfont extends Component {
  static propTypes = {
    type: PropTypes.string,
    theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  };

  static defaultProps = {
    type: '',
    theme: 'default',
  };

  render() {
    const { type, theme, className, ...others } = this.props;
    const cls = classnames({
      iconfont: true,
      [\`iconfont-\${type}\`]: !!type,
      [\`theme-\${theme}\`]: !!theme,
      [className]: !!className,
    });

    return (
      <i className={cls} {...others} />
    );
  }
}

export default Iconfont;
`;

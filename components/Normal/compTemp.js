const common = require('../../common');

const { createComponentName, createClassName } = common;

const create = ({compName = '', className = '', low = false, page = false, name = '' } = {}) => `
import React, { Component${low ? ', PropTypes' : ''} } from 'react';
${low ? '' : `import PropTypes from 'prop-types';`}
import classnames from 'classnames';

class ${compName} extends Component {
  constructor(props) {
    super(props);
  }

  ${ page ? '' : 'static propTypes = {};' }

  ${ page ? '' : 'static defaultProps = {};' }

  state = {};

  render() {
    const { className${page ? '' : ', children, ...others'} } = this.props;

    const cls = classnames({
      '${className}': true,
      [className]: !!className,
    });

    return (
      <div className={cls}${page ? '' : ' {...others}'}>
        ${page? name : '{ children }'}
      </div>
    );
  }
}

export default ${compName};
`;

module.exports = (opts) => {
  const compName = createComponentName(opts);
  const className = createClassName(opts);

  const res = Object.assign({ compName, className }, opts);

  return create(res);
};

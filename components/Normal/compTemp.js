const common = require('../../common');

const { createComponentName, createClassName } = common;

const create = (opts = {}) => {
  const {
    compName = '',
    className = '',
    name = '',
    low = false,
    page = false,
    function: isFunction = false,
  } = opts;

  if (isFunction) {
    return `
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ${compName} = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    '${className}': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls} {...others}>
      ${page? name : '{ children }'}
    </div>
  );
});

${compName}.propTypes = {};

${compName}.defaultProps = {};

export default ${compName};
`;
  }

  return `
import React, { Component${low ? ', PropTypes' : ''} } from 'react';
${low ? 'DELETE_LINE' : `import PropTypes from 'prop-types';`}
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
};

module.exports = (opts) => {
  const compName = createComponentName(opts);
  const className = createClassName(opts);

  const res = Object.assign({ compName, className }, opts);

  return create(res);
};

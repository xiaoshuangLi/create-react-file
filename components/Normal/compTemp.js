const common = require('../../common');

const { createComponentName, createClassName } = common;

const hooksCode = `
import {
  useStableRef,
  usePrevious,
  useEventCallback,
  useDebounceCallback,
  useThrottleCallback,
} from './hooks';
`;

const create = (opts = {}) => {
  const {
    compName = '',
    className = '',
    name = '',
    low = false,
    page = false,
    hooks: isHooks = false,
    function: isFunction = false,
  } = opts;

  if (isFunction) {
    return `
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

${ isHooks ? hooksCode : 'DELETE_LINE' }
${ isHooks ? '' : 'DELETE_LINE' }
const ${compName} = React.forwardRef((props = {}, ref) => {
  ${ isHooks ? 'ref = useStableRef(ref);' : 'DELETE_LINE' }
  ${ isHooks ? '' : 'DELETE_LINE' }
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

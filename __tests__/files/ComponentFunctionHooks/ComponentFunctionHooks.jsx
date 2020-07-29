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

import {
  useStableRef,
  usePrevious,
  useEventCallback,
  useDebounceCallback,
  useThrottleCallback,
} from './hooks';

const ComponentFunctionHooks = React.forwardRef((props = {}, ref) => {
  ref = useStableRef(ref);

  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'components-component-function-hooks-render': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls} {...others}>
      { children }
    </div>
  );
});

ComponentFunctionHooks.propTypes = {};

ComponentFunctionHooks.defaultProps = {};

export default ComponentFunctionHooks;

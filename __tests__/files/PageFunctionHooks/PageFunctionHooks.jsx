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

const PageFunctionHooks = React.forwardRef((props = {}, ref) => {
  ref = useStableRef(ref);

  const { className } = props;

  const cls = classnames({
    'pages-page-function-hooks-render': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls}>
      PageFunctionHooks
    </div>
  );
});

PageFunctionHooks.propTypes = {};

PageFunctionHooks.defaultProps = {};

export default PageFunctionHooks;

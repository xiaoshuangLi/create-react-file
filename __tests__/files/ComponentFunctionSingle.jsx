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

const ComponentFunctionSingle = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'component-function-single': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls} {...others}>
      { children }
    </div>
  );
});

ComponentFunctionSingle.propTypes = {};

ComponentFunctionSingle.defaultProps = {};

export default ComponentFunctionSingle;

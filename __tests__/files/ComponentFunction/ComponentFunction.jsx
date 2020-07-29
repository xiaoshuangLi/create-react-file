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

const ComponentFunction = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'components-component-function-render': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls} {...others}>
      { children }
    </div>
  );
});

ComponentFunction.propTypes = {};

ComponentFunction.defaultProps = {};

export default ComponentFunction;

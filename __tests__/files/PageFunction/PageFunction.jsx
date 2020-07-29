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

const PageFunction = React.forwardRef((props = {}, ref) => {
  const { className } = props;

  const cls = classnames({
    'pages-page-function-render': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls}>
      PageFunction
    </div>
  );
});

PageFunction.propTypes = {};

PageFunction.defaultProps = {};

export default PageFunction;

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

const PageFunctionSingle = React.forwardRef((props = {}, ref) => {
  const { className } = props;

  const cls = classnames({
    'page-function-single': true,
    [className]: !!className,
  });

  return (
    <div ref={ref} className={cls}>
      PageFunctionSingle
    </div>
  );
});

PageFunctionSingle.propTypes = {};

PageFunctionSingle.defaultProps = {};

export default PageFunctionSingle;

import {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  createRef,
} from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export const useStableRef = (ref) => {
  return useMemo(() => {
    return ref || createRef(null);
  }, [ref]);
};

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useEventCallback = (fn) => {
  const ref = useRef(fn);

  ref.current = fn;

  return useCallback((...args) => {
    const { current } = ref;

    return current && current(...args);
  }, [ref]);
};

const useEventArgument = (arg) => {
  const keys = Object.keys(arg);
  const values = Object.values(arg);

  const objective = typeof arg === 'object';
  const dependencies = objective ? [...keys, ...values] : [arg];

  return useMemo(() => arg, dependencies);
};

const useEventArguments = (...args) => args.map(useEventArgument);

export const useDebounceCallback = (callback, ...args) => {
  args = useEventArguments(...args);
  callback = useEventCallback(callback);
  callback = useMemo(() => debounce(callback, ...args), args);

  return useCallback(callback, [callback]);
};

export const useThrottleCallback = (callback, ...args) => {
  args = useEventArguments(...args);
  callback = useEventCallback(callback);
  callback = useMemo(() => throttle(callback, ...args), args);

  return useCallback(callback, [callback]);
};

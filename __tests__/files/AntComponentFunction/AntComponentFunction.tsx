import type { FC } from '@alipay/bigfish/react';

import React from '@alipay/bigfish/react';
import classnames from '@alipay/bigfish/util/classnames';

import style from './style.less';

interface AntComponentFunctionProps {
  className?: string;
}

const AntComponentFunction: FC<AntComponentFunctionProps> = (props) => {
  const {
    className = '',
    children,
    ...others
  } = props;

  const cls = classnames({
    [style.antComponentFunction]: true,
    [className]: !!className,
  });

  return (
    <div className={cls} {...others}>
      { children }
    </div>
  );
};

export default AntComponentFunction;

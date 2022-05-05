'use strict';

const path = require('path');
const common = require(path.resolve(__dirname, '../common'));

const {
  createComponentName,
  createClassName,
  createModuleName,
} = common;

const createComponent = (opts = {}) => {
  const {
    name = '',
    className = '',
    moduleName = '',
    componentName = '',
  } = opts;

  return `
import type { FC } from '@alipay/bigfish/react';

import React from '@alipay/bigfish/react';
import classnames from '@alipay/bigfish/util/classnames';

import style from './style.less';

interface ${componentName}Props {
  className?: string;
}

const ${componentName}: FC<${componentName}Props> = (props) => {
  const {
    className = '',
    children,
    ...others
  } = props;

  const cls = classnames({
    [style.${moduleName}]: true,
    [className]: !!className,
  });

  return (
    <div className={cls} {...others}>
      { children }
    </div>
  );
};

export default ${ componentName };
`;
};

module.exports = (opts) => {
  const componentName = createComponentName(opts);
  const className = createClassName(opts);
  const moduleName = createModuleName(opts);

  const res = { componentName, className , moduleName, ...opts};

  return createComponent(res);
};

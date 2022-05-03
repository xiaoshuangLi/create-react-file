'use strict';

const path = require('path');
const common = require(path.resolve(__dirname, '../common'));

const { createComponentName } = common;

const create = ({ compName } = {}) => `
export * from './${compName}';
export { default } from './${compName}';
`;

module.exports = (opts) => {
  const compName = createComponentName(opts);

  return create({ compName });
};

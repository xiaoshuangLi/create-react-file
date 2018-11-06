const common = require('../../common');

const { createComponentName } = common;

const create = ({ compName } = {}) => `
import './${compName}.scss';

export * from './${compName}';
`;

module.exports = (opts) => {
  const compName = createComponentName(opts);

  return create({ compName });
};

const common = require('../common');

const { createReduxName } = common;

const create = ({ reduxName = '' } = {}) => `
export const ${reduxName}_ASSIGN_STATE = '${reduxName}_ASSIGN_PARAMS';
export const ${reduxName}_SET_STATE = '${reduxName}_SET_STATE';
`;

module.exports = (opts) => {
  const reduxName = createReduxName(opts);
  const res = Object.assign({ reduxName }, opts);

  return create(res);
};


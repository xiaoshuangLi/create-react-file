const common = require('../common');

const { createReduxName, createModuleName } = common;

const create = ({ reduxName = '', moduleName } = {}) => `
import { ${reduxName}_ASSIGN_STATE, ${reduxName}_SET_STATE } from '../constants';
import { createReducer } from '../func';

const initialState = {};

const ${moduleName} = createReducer(initialState, {
  [${reduxName}_ASSIGN_STATE](state, { data = {} } = {}) {
    const [attr = ''] = Object.keys(data);

    const obj = Object.assign({}, state[attr], data[attr]);

    return Object.assign({}, state, { [attr]: obj });
  },
  [${reduxName}_SET_STATE](state, { data = {} } = {}) {
    return Object.assign({}, state, data);
  },
});

export default {
  ${moduleName},
};
`;

module.exports = (opts) => {
  const reduxName = createReduxName(opts);
  const moduleName = createModuleName(opts);
  const res = Object.assign({ reduxName, moduleName }, opts);

  return create(res);
};



const common = require('../common');

const { createModuleName, createReduxName } = common;

const create = ({ reduxName = '', normalName = '' } = {}) => `
import { ${reduxName}_ASSIGN_STATE, ${reduxName}_SET_STATE } from '../constants';

// actionType => (默认值, state的key值) tab => 传入的参数
const actionStateByAttr = type => (dValue, attr) => (value = dValue) => ({
  type,
  data: attr === undefined ? value : { [attr]: value },
});

// assign state特定属性，针对为对象的属性使用 state.params = {}
const assignStateByAttr = actionStateByAttr(${reduxName}_ASSIGN_STATE);

// set state特定属性，类似重置, 清空
const setStateByAttr = actionStateByAttr(${reduxName}_SET_STATE);

export const ${normalName}SetAttr = setStateByAttr({}, 'Attr');

export const ${normalName}AssignAttr = assignStateByAttr({}, 'Attr');
`;

module.exports = (opts) => {
  const reduxName = createReduxName(opts);
  const normalName = createModuleName(opts);
  const res = Object.assign({ reduxName, normalName }, opts);

  return create(res);
};

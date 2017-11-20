const changeCase = require("change-case");

const createModuleName = (opts) => {
  const { name = '' } = opts;

  return changeCase.camelCase(name);
};

const createReduxName = (opts) => {
  const { name = '' } = opts;

  return changeCase.constantCase(name);
};

const createComponentName = (opts = {}) => {
  const { name = '' } = opts;

  return changeCase.pascalCase(name);
};

const createClassName = (opts = {}) => {
  const { page = false, name = '', parentName = '' } = opts;

  return changeCase.paramCase(`${page ? 'pages' : 'components'}-${parentName}-${name}-render`);
};

const clearLine = (code = '') => {
  return code.replace(/\n{3,}/g, '\n\n').replace(/^\n/, '');
};

module.exports = {
  createComponentName,
  createClassName,
  createModuleName,
  createReduxName,
  clearLine,
};
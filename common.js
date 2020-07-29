'use strict';

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
  const { page = false, single = false, name = '', parentName = '' } = opts;

  if (single) {
    return changeCase.paramCase(name);
  }

  return changeCase.paramCase(`${page ? 'pages' : 'components'}-${parentName}-${name}-render`);
};

const clearLine = (code = '') => {
  const res = code
    .replace(/^\n/g, '')
    .replace(/^([^(\n)]*DELETE_LINE[^(\n)]*)/g, '')
    .replace(/\n([^(\n)]*DELETE_LINE[^(\n)]*)/g, '')
    .replace(/\n+[\s\n]*\n/g, '\n\n');

  return res;
};

module.exports = {
  createComponentName,
  createClassName,
  createModuleName,
  createReduxName,
  clearLine,
};
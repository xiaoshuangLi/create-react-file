#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const changeCase = require("change-case");
const program = require("commander");

const components = require('./components');
const modules = require('./modules');
const redux = require('./redux');
const common = require('./common');

const { createComponentName, createClassName, createModuleName, clearLine } = common;
const { Normal } = components;

function wirte(path, code) {
  fs.writeSync(fs.openSync(path, "w"), clearLine(code));
};

function getOpts(name = '', parentName = '', cmd = {}) {
  return Object.assign({
    name,
    parentName,
  }, cmd);
}

function createComp(opts = {}) {
  const name = createComponentName(opts);
  const { single } = opts;

  const Comp = components[name];
  const res = Object.assign({}, Normal, Comp);
  const { compTemp, indexTemp, styleTemp } = res;

  let dir;
  let comp;

  if (single) {
    dir = path.resolve();
    comp = path.resolve(dir, `${name}.jsx`);

    return wirte(comp, compTemp(opts));
  }

  dir = path.resolve(name);
  comp = path.resolve(dir, `${name}.jsx`);
  const style = path.resolve(dir, `${name}.scss`);
  const index = path.resolve(dir, `index.js`);

  fs.mkdirSync(`./${name}`);

  wirte(comp, compTemp(opts));
  wirte(style, styleTemp(opts));
  wirte(index, indexTemp(opts));

  const others = Object.assign({}, res);

  delete others.compTemp;
  delete others.indexTemp;
  delete others.styleTemp;

  const keys = Object.keys(others);

  if (!keys.length) {
    return null;
  }

  keys.forEach((key) => {
    const value = others[key];

    const keyPath = path.resolve(dir, `${key}.jsx`);
    const keyTemp = typeof value === 'function' ? value(opts) : value;

    wirte(keyPath, keyTemp);
  });
}

function createModule(opts) {
  const { routeTemp } = modules;
  const { low } = opts;
  const name = createModuleName(opts);

  const dir = path.resolve(name);
  const route = path.resolve(dir, `route.${low ? 'js' : 'jsx' }`);

  fs.mkdirSync(`./${name}`);
  fs.mkdirSync(`./${name}/pages`);
  fs.mkdirSync(`./${name}/components`);

  wirte(route, routeTemp(opts));
}

function createRedux(opts) {
  const { actionsTemp, constantsTemp, reducersTemp, funcTemp } = redux;

  const dir = path.resolve('redux');
  const actions = path.resolve(dir, 'actions/index.js');
  const constants = path.resolve(dir, 'constants/index.js');
  const reducers = path.resolve(dir, 'reducers/index.js');
  const func = path.resolve(dir, 'func.js');

  fs.mkdirSync(`./redux`);
  fs.mkdirSync(`./redux/actions`);
  fs.mkdirSync(`./redux/constants`);
  fs.mkdirSync(`./redux/reducers`);

  wirte(actions, actionsTemp(opts));
  wirte(constants, constantsTemp(opts));
  wirte(reducers, reducersTemp(opts));
  wirte(func, funcTemp(opts));
}

function run(name = '', parentName = '', cmd = {}) {
  const opts = getOpts(name, parentName, cmd);

  if (opts.modules) {
    return createModule(opts);
  }

  if (opts.redux) {
    return createRedux(opts);
  }

  createComp(opts);
};

program
  .name('create-react-file')
  .arguments('<name> [parentName]')
  .option('-l, --low', 'React < 16.0 without PropTypes Or React-Router < 4.0')
  .option('-f, --function', 'create function component')
  .option('-m, --modules', 'create modules')
  .option('-p, --page', 'create page component')
  .option('-r, --redux', 'create redux part')
  .option('-s, --single', 'only create Component.jsx')
  .action(run)
  .parse(process.argv); 
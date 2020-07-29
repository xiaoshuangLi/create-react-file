#!/usr/bin/env node
'use strict';

const fs = require("fs");
const path = require("path");
const changeCase = require("change-case");
const program = require("commander");

const BASR_PATH = path.resolve(__dirname, './Component');
const common = require(path.resolve(__dirname, './common'));

const {
  clearLine,
  createClassName,
  createModuleName,
  createComponentName,
} = common;

function wirte(path, code) {
  fs.writeSync(fs.openSync(path, "w"), clearLine(code));
};

function getOpts(name = '', parentName = '', cmd = {}) {
  return Object.assign({
    name,
    parentName,
  }, cmd);
}

function createComponent(opts = {}) {
  const fileNames = fs.readdirSync(BASR_PATH);
  const name = createComponentName(opts);
  const {
    hooks: isHooks,
    single: isSingle,
    function: isFunction,
  } = opts;

  const dir = isSingle ? path.resolve() : path.resolve(name);

  if (isSingle) {
    const fn = require(path.resolve(BASR_PATH, 'component.template.js'));
    const code = fn(opts);
    const filePath = path.resolve(dir, `${name}.jsx`);

    wirte(filePath, code);
    return;
  }

  fs.mkdirSync(`./${name}`);

  fileNames.forEach((fileName) => {
    const fn = require(path.resolve(BASR_PATH, fileName));

    switch (fileName) {
      case 'component.template.js': {
        const code = fn(opts);
        const filePath = path.resolve(dir, `${name}.jsx`);

        wirte(filePath, code);

        break;
      }
      case 'style.template.js': {
        const code = fn(opts);
        const filePath = path.resolve(dir, `${name}.scss`);

        wirte(filePath, code);

        break;
      }
      case 'hooks.js': {
        if (isHooks && isFunction) {
          const code = fn(opts);
          const filePath = path.resolve(dir, fileName);

          wirte(filePath, code);
        }

        break;
      }
      default: {
        const code = fn(opts);
        const filePath = path.resolve(dir, fileName);

        wirte(filePath, code);
        break;
      }
    }
  });
}

function run(name = '', parentName = '', cmd = {}) {
  const opts = getOpts(name, parentName, cmd);

  createComponent(opts);
};

program
  .name('create-react-file')
  .arguments('<name> [parentName]')
  .option('-f, --function', 'create function component')
  .option('-p, --page', 'create component as page')
  .option('-s, --single', 'create single file Component.jsx')
  .option('-h, --hooks', 'create file hooks.js')
  .action(run)
  .parse(process.argv);

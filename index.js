#!/usr/bin/env node
'use strict';

const program = require('commander');

const createComponent = require('./createComponent');
const createAntComponent = require('./createAntComponent');

function getOpts(name = '', parentName = '', cmd = {}) {
  return Object.assign({
    name,
    parentName,
  }, cmd);
}

function run(name = '', parentName = '', cmd = {}) {
  const opts = getOpts(name, parentName, cmd);
  const { ant } = opts;

  ant
    ? createAntComponent(opts)
    : createComponent(opts);
};

program
  .name('create-react-file')
  .arguments('<name> [parentName]')
  .option('-f, --function', 'create function component')
  .option('-p, --page', 'create component as page')
  .option('-s, --single', 'create single file Component.jsx')
  .option('-h, --hooks', 'create file hooks.js')
  .option('-a, --ant', 'create ant typescript function component')
  .action(run)
  .parse(process.argv);

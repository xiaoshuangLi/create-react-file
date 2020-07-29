'use strict';

const path = require('path');
const common = require(path.resolve(__dirname, '../common'));

const { createClassName } = common;

module.exports = opts => `
.${createClassName(opts)} {
  
}
`;

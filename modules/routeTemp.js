const common = require('../common');

const { createModuleName } = common;

const createLower = ({ moduleName } = {}) => `
const route = {
  path: '${moduleName}',
  component: require('js/components/App'),
  indexRoute: {
    component: require('./pages/PageDefault'),
  },
  childRoutes: [
    {
      path: 'one',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/PageOne'));
        });
      },
    },
  ],
};

export default route;
`;

const create = ({ moduleName } = {}) => `
import React from 'react';

import Bundle from 'js/components/Bundle';
import RelativeRouter from 'js/components/RelativeRouter';

const createBundle = path => (props) => {
  const load = () => import(\`\${path}\`);

  return (
    <Bundle once load={load}>
      {Comp => <Comp {...props} />}
    </Bundle>
  );
};

const routes = [
  {
    exact: true,
    component: createBundle('./pages/PageDefault'),
  },
  {
    path: '/one',
    component: createBundle('./pages/PageOne'),
  },
];

const rootRoute = (
  <RelativeRouter path="/${moduleName}" routes={routes} />
);

export default rootRoute;
`;

module.exports = (opts) => {
  const moduleName = createModuleName(opts);
  const { low } = opts;

  const res = Object.assign({ moduleName }, opts);

  return low ? createLower(res) : create(res);
};
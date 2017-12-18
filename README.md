# create-react-file
Use comman line to create component or something else

## Installation

```sh
npm install create-react-file -g
```

## Execution

```sh
$ create-react-file Component
```

Create folder `./Component` and file `Component.jsx`, `index.js`, `Component.css`.

#### Component.jsx

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Component extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'components-component-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        { children }
      </div>
    );
  }
}

export default Component;
```

#### Component.scss

```scss
.components-component-render {
  
}
```

#### index.js

```js
import './Component.scss';
import Component from './Component';

export default Component;
```

## Help

```sh
$ create-react-file --help
  Usage: create-file [options] <name> [parentName]

  Options:

    -l, --low      React < 16.0 whitout PropTypes Or React-Router < 4.0
    -m, --modules  create modules
    -p, --page     create page component
    -r, --redux    create redux part
    -s, --signle   only create Component.jsx
    -h, --help     output usage information
```

## For arrow function in Class

Arrow function maybe not so good as we thought.You should read [this](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1) before use it.

## For require in webpack

Require will get different result with different version webpack.

In webpack@^1.0.0:

```js
  const Comp = require('./Comp');
  
  console.log(Comp); // class Comp { ... }
```

In webpack@^2.0.0:

```js
  const Comp = require('./Comp');
  
  console.log(Comp); // { default: class Comp { ... } }
```

## For sass awesome ability

If you're interested in Sass.You should read [this](https://gist.github.com/jslegers/9805919) something diffenent and awesome. 

## Simply command-line

Little tip with [oh my zsh](http://ohmyz.sh).
Changing `.zshrc` like this makes the tool be more convenient.

```
alias cf="create-react-file"
alias cfp="create-react-file -p"
```

# create-react-file
Use command line to create component or something else

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
  Usage: create-react-file [options] <name> [parentName]

  Options:
    -f, --function  create function component
    -p, --page      create component as page
    -s, --single    create single file Component.jsx
    -h, --hooks     create file hooks.js
    -h, --help      output usage information
```

## Simply command-line

Little tip with [oh my zsh](http://ohmyz.sh).
Changing `.zshrc` like this makes the tool be more convenient.

```
alias cf="create-react-file"
alias cfp="create-react-file -p"
```

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

Component.propTypes = {};
Component.defaultProps = {};

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

## Others

Little tip with [oh my zsh](http://ohmyz.sh).
Changing `.zshrc` like this makes the tool be more convenient.

```
alias cf="create-react-file"
alias cfp="create-react-file -p"
```


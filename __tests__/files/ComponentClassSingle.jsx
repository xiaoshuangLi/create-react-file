import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ComponentClassSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'component-class-single': true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        { children }
      </div>
    );
  }
}

export default ComponentClassSingle;

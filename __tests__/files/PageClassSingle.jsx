import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PageClassSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    const { className } = this.props;

    const cls = classnames({
      'page-class-single': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        PageClassSingle
      </div>
    );
  }
}

export default PageClassSingle;

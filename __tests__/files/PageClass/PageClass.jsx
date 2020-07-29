import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PageClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    const { className } = this.props;

    const cls = classnames({
      'pages-page-class-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        PageClass
      </div>
    );
  }
}

export default PageClass;

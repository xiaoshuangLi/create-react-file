module.exports = opts => `
import React, { Component } from 'react';
import qs from 'qs';

const loadedBundle = new WeakMap();

class Bundle extends Component {
  state = {
    mod: null,
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    const { load } = props;

    if (loadedBundle.has(load)) {
      return this.setState({
        mod: loadedBundle.get(load),
      });
    }

    load()
      .then((res = {}) => {
        const mod = res.default ? res.default : res;

        this.setState({ mod });
        loadedBundle.set(load, mod);
      });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}


const qsOpts = { ignoreQueryPrefix: true };

const getLocation = (props = {}) => {
  const { location } = props;

  if (location !== undefined) {
    return location;
  }

  if (typeof window === 'undefined') {
    return {};
  }

  return window.location;
}

const renderWithQuery = (Comp, props = {}) => {
  const location = getLocation();
  const { search = '' } = location;

  const query = qs.parse(search, qsOpts);

  return (
    <Comp query={query} {...props} />
  );
}

const createBundle = load => (props = {}) => {
  const renderComp = Comp => renderWithQuery(Comp, props);

  return (
    <Bundle once load={load}>
      { renderComp }
    </Bundle>
  );
};

export { createBundle, renderWithQuery };
export default Bundle;
`;

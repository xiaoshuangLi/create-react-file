module.exports = opts => `
import React, { Component } from 'react';
import { Form, Col, Input } from 'antd';
import classnames from 'classnames';

const { Item } = Form;

const defaultOpts = {
  className: 'input',
  size: 'default',
};

function getRules({ rules = [], required } = {}) {
  required && rules.push({ required: true });

  return rules;
}
function toArray(res = []) {
  return Array.isArray(res) ? res : [res];
}

const Span = (props = {}) => {
  const { value } = props;

  return (
    <span className="item-value-span">{ value }</span>
  );
};

const isRequired = (attr, inputs = []) => {
  const item = inputs.find(({ name } = {}) => name === attr);

  if (!item) {
    return false;
  }

  const { rules = [] } = item;
  return rules.some(({ required } = {}) => !!required);
};

class BaseForm extends Component {
  constructor(props) {
    super(props);

    this.baseGetDisabled = this.baseGetDisabled.bind(this);
    this.baseGetTouchedValus = this.baseGetTouchedValus.bind(this);
    this.baseRenderInputs = this.baseRenderInputs.bind(this);
    this.baseRenderDefaultInput = this.baseRenderDefaultInput.bind(this);
  }

  _baseSubmit() {
    const { form, onSubmit } = this.props;

    form.validateFields((err) => {
      if (err) {
        return null;
      }

      onSubmit && onSubmit();
    });
  }

  baseGetDisabled(opts = {}) {
    const { disabled } = opts;

    if (typeof disabled === 'function') {
      return disabled.apply(this, [opts]);
    }

    return !!disabled;
  }

  baseGetTouchedValus(fields = {}, inputs = []) {
    const keys = Object.keys(fields);

    return keys.reduce((res, attr) => {
      const curr = fields[attr] || {};
      const { touched, value } = curr;

      touched && isRequired(attr, inputs) && (res.attr = value);

      return res;
    }, {});
  }

  baseRenderComp(opts = {}, DefaultComp) {
    const { baseGetDisabled } = this;
    const { inputOpts = {}, comp, Comp } = opts;

    if (Comp) {
      return (
        <Comp {...defaultOpts} {...inputOpts} {...opts} />
      );
    }

    if (comp) {
      return comp.apply(this, [opts]);
    }

    return (
      <DefaultComp disabled={baseGetDisabled(opts)} {...defaultOpts} {...inputOpts} />
    );
  }

  baseRenderDefaultInput(opts = {}, DefaultComp) {
    const { title = '', name, comp, newComp, render, className, required, itemOpts = {}, fieldOpts = {}, ...others } = opts;
    const { form = {} } = this.props;
    const { getFieldDecorator } = form;
    const rules = getRules(opts);

    const Comp = this.baseRenderComp(opts, DefaultComp);

    return (
      <Item className={className} label={title} {...others} {...itemOpts}>
        { getFieldDecorator(name, { rules, ...fieldOpts })(Comp) }
      </Item>
    );
  }

  baseRender(DefaultComp = Input) {
    return (inputs = []) => {
      const { baseRenderDefaultInput } = this;

      inputs = toArray(inputs);

      return inputs.map((item, i) => {
        const { render = baseRenderDefaultInput, show, colOpts = {} } = item;
        const renderComp = render(item, DefaultComp);

        if (show && !show.apply(this)) {
          return null;
        }

        return (
          <Col span={24} key={i} {...colOpts}>
            { renderComp }
          </Col>
        );
      });
    };
  }

  baseRenderInputs(inputs) {
    inputs = toArray(inputs);
    return this.baseRender()(inputs);
  }

  baseRenderValues(inputs) {
    inputs = toArray(inputs);
    inputs = inputs.map((item) => {
      const { className } = item;

      return Object.assign({}, item, {
        className: classnames({ [className]: !!className, 'base-form-item-value': true }),
      });
    });

    return this.baseRender(Span)(inputs);
  }
}


export default BaseForm;
`;

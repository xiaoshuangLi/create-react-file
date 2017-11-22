module.exports = opts => `
import { Form } from 'antd';

const validateMessages = {
  required: () => '请正确输入信息',
  string: {
    max(attr, num) {
      return \`长度不得超过\$\{num\}位\`;
    },
    min(attr, num) {
      return \`长度在\$\{num\}以上\`;
    },
  },
};

class AntdForm {
  constructor(props) {
    const { values = {}, fields = {}, ...others } = props;

    this.state = {
      values,
      fields,
    };

    this.props = Object.assign({}, { validateMessages }, others);

    this.onFieldsChange = this.onFieldsChange.bind(this);
    this.onValuesChange = this.onValuesChange.bind(this);
    this.mapPropsToFields = this.mapPropsToFields.bind(this);
  }

  setProps(props, force) {
    this.props = force ? props : Object.assign({}, this.props, props);
  }

  setState(obj, cb) {
    this.state = Object.assign({}, this.state, obj);

    cb && cb(this.state);
  }

  setObj({ attr, obj, force, cb } = {}) {
    const res = this.state[attr] || {};

    this.setState({
      [attr]: force ? obj : Object.assign({}, res, obj),
    }, cb);
  }

  onFieldsChange(props, changedFields) {
    const { onFieldsChange } = this.props;

    this.setObj({
      attr: 'fields',
      obj: changedFields,
      cb: ({ fields = {} } = {}) => {
        onFieldsChange && onFieldsChange(fields);
      },
    });
  }

  onValuesChange(props, changedValues) {
    const { onValuesChange } = this.props;

    this.setObj({
      attr: 'values',
      obj: changedValues,
      cb: ({ values = {} } = {}) => {
        onValuesChange && onValuesChange(values);
      },
    });
  }

  mapPropsToFields(props) {
    const { values = {}, fields = {} } = this.state;
    const { valid = ({ detail = {} } = {}) => detail } = this.props;

    const detail = Object.keys(values).reduce((res, key) => {
      const field = fields[key] || {};

      res[key] = {
        ...field,
        value: values[key],
      };

      return res;
    }, {});

    Object.keys(fields).reduce((res, key) => {
      const field = fields[key] || {};

      res[key] = res[key] || {};
      res[key] = Object.assign({}, field, res[key]);

      return res;
    }, detail);

    return valid({ values, fields, detail });
  }

  render(props, force) {
    this.setProps(props, force);

    const { Comp } = this.props;

    return Form.create({
      validateMessages,
      onValuesChange: this.onValuesChange,
      onFieldsChange: this.onFieldsChange,
      mapPropsToFields: this.mapPropsToFields,
    })(Comp);
  }
}

export default AntdForm;
`;

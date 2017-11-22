module.exports = opts => `
import AntdForm from './AntdForm';
import BaseForm from './BaseForm';
import './BaseForm.scss';

AntdForm.BaseForm = BaseForm;

export default AntdForm;
`;

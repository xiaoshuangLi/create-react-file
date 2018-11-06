module.exports = opts => `
import './Bundle.scss';
import Bundle, { createBundle } from './Bundle';

export { createBundle };
export default Bundle;
`;
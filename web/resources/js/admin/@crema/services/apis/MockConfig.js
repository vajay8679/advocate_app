import jwtAxios from '../auth/jwt-auth/index.js';

// const MockAdapter = require('axios-mock-adapter');
import { MockAdapter } from 'axios-mock-adapter'
export default new MockAdapter(jwtAxios, {delayResponse: 100});

import axios from 'axios';
import {ACCESS_TOKEN_KEY} from '../../../../configs/Constants';
import Configuration from '../../../../configs/Config';


const jwtAxios = axios.create({
  baseURL: Configuration.apiUrl, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export default jwtAxios;

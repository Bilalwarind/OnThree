import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const baseUrl = axios.create({
  baseURL: '', //testing
});
baseUrl.interceptors.request.use(
  async function (config) {
    config.headers = {
      ...config.headers,
    };
    function User() {
      // Rule 2: call hooks in function component
      const {token} = useSelector(state => state.auth);
      return <>{token}</>;
    }
    config.headers.Authorization = `Bearer ${User}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

baseUrl.interceptors.response.use(function (response) {
  if (response.status === 401) {
  }
  return response;
});
export {baseUrl};

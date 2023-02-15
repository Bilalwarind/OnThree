import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://theonlinetest.info/onethree/api/',
});

export default baseUrl;

import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

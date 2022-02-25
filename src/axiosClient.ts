import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
export const ourRequest = axios.CancelToken.source();

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosClient.interceptors.request.use((request: any) => {
  const token = `Bearer ${
    localStorage.getItem('token')
      ? localStorage.getItem('token')
      : sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')
      : ''
  }`;

  request.headers['Authorization'] = token;
  return request;
});

axiosClient.interceptors.response.use((res) => {
  return res;
});

export default axiosClient;

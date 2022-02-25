import axiosClient from '../../axiosClient';
import { loginResType } from './login.type';

export const loginAPI = async (username: string, password: string) => {
  return await axiosClient.post<loginResType>(`log-in`, { username: username, password: password });
};

export const authAPI = async () => {
  return await axiosClient.post<loginResType>(`auth`);
};

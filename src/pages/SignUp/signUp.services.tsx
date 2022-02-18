import axiosClient from '../../axiosClient';
import { signUpResType } from './signUp.type';

export const signUpAPI = async (username: string, password: string) => {
  return await axiosClient.post<signUpResType>(`sign-up`, { username: username, password: password });
};

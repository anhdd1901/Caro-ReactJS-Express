import axiosClient from '../../axiosClient';
import { userType } from '../LoginPage/login.type';

export const getUserInfoAPI = async (id: string) => {
  return await axiosClient.get<{ user?: userType; errorMess?: string }>(`room/user/${id}`);
};

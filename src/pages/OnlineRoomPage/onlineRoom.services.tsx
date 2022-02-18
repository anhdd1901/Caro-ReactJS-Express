import axiosClient from '../../axiosClient';
import { onlineRoomType } from './onlineRoom.type';

export const getAllOnlineRoomAPI = async (filter: string) => {
  return await axiosClient.get<onlineRoomType[]>(`room?filter=${filter}`);
};

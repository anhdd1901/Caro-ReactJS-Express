import { userType } from '../LoginPage/login.type';

export interface onlineRoomStateType {
  isLoading: boolean;
}

export interface onlineRoomType {
  id: string;
  socketRoomID: string;
  table: string[][];
  playerOne: userType;
  playerTwo?: userType;
}

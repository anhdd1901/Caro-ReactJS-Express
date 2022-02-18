import { userType } from "../LoginPage/login.type";

export interface onlineRoomStateType {
  isLoading: boolean;
}

export interface onlineRoomType {
  id: string;
  status: string;
  playerOne: userType;
  playerTwo?: userType;
}

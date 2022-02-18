export interface loginStateType {
  isLoading: boolean;
}

export interface loginResType {
  errorMess?: string;
  token?: string;
}

export interface userType {
  id: string;
  username: string;
  displayName:string;
  avatar: string;
  rank: number;
  gamePlayed: number;
  gameWon: number;
  longestWinStreak: number;
  currentWinStreak: number;
  inStreak: boolean;
  currentWon: number;
}

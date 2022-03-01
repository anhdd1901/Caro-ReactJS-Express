import './GameOnlinePage.style.scss';
import View from './GameOnlinePage.view';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { gameStateType } from '../game.type';
import { useNavigate, useParams } from 'react-router-dom';
import { loginStateType, userType } from '../../LoginPage/login.type';
import { useAppDispatch } from '../../../hook';
import { getUserInfo } from '../game.slice';
import { ErrorMessage } from '../../../components/Message';

const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);

interface PT {}

const GameOnlinePage: React.FC<PT> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { opponentID, socket, isYouMoveFirst, playingRoomID } = useSelector<RootState, gameStateType>(
    (state) => state.gameReducer
  );
  const { userID } = useSelector<RootState, loginStateType>((state) => state.loginReducer);
  const [isYouWin, setYouWin] = useState<boolean>(false);
  const [yourSymbol, setYourSymbol] = useState<string>('');
  const [score, setScore] = useState<{ you: number; opp: number }>({ you: 0, opp: 0 });
  const [yourOpponentQuit, setYourOpponentQuit] = useState<string>('');
  const [isOpponentQuitAnnouncementOpen, setOpponentQuitAnnouncementOpen] = useState<boolean>(false);
  const [isOneMoreAnnoucementOn, setOneMoreAnnoucementOn] = useState<boolean>(false);
  const [opponentWannaOneMore, setOpponentWannaOneMore] = useState<string>('');
  const [youWannaOneMore, setYouWannaOneMore] = useState<string>('');
  const [waitingOpponentResponseModal, setWaitingOpponentResponseModal] = useState<boolean>(false);
  const [isYourTurn, setYourTurn] = useState<boolean>(false);
  const [justMovedCell, setJustMovedCell] = useState<number[] | null>(null);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [winRow, setWinRow] = useState<number[][]>([]);
  const [opponent, setOpponent] = useState<userType | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<userType | undefined>(undefined);
  const [newMove, setNewMove] = useState<{ Xmove: number[][]; Omove: number[][] } | null>(null);
  const [isWinningBackgroundOn, setWinningBackgroundOn] = useState<boolean>(false);
  const [gameArray, setGameArray] = useState<string[][]>(
    Array.from({ length: tableSize }, () => Array.from({ length: tableSize }, () => ''))
  );

  // Init setup
  useEffect(() => {
    if (isYouMoveFirst) {
      setYourTurn(true);
      setYourSymbol('x');
    } else {
      setYourTurn(false);
      setYourSymbol('o');
    }
  }, [isYouMoveFirst]);

  // Turn winning-background off
  useEffect(() => {
    if (isWinningBackgroundOn) {
      setTimeout(() => {
        setWinningBackgroundOn(false);
        setOneMoreAnnoucementOn(true);
      }, 800);
    }
  }, [isWinningBackgroundOn]);

  // Set new game array
  useEffect(() => {
    if (newMove) {
      const currentGameArray = [...gameArray];
      newMove.Xmove.forEach((a) => {
        currentGameArray[a[0]][a[1]] = 'x';
      });
      newMove.Omove.forEach((a) => {
        currentGameArray[a[0]][a[1]] = 'o';
      });
      setNewMove(null);
    }
  }, [newMove, gameArray]);

  // Socket event
  useEffect(() => {
    if (socket) {
      socket.on('delete-room', (result: any) => {
        setYourOpponentQuit(result.idRoom);
      });

      socket.on('opponent-move', (rowIndex: any, colIndex: any, Xmove: any, Omove: any) => {
        setJustMovedCell([rowIndex, colIndex]);
        setNewMove({ Xmove: Xmove, Omove: Omove });
        setYourTurn(true);
      });

      socket.on('opponent-win', (rowIndex: any, colIndex: any, Xmove: any, Omove: any, totalWinStraight: any) => {
        setYouWin(false);
        setJustMovedCell([rowIndex, colIndex]);
        setNewMove({ Xmove: Xmove, Omove: Omove });
        setWinRow(totalWinStraight);
        setWinningBackgroundOn(true);
        setYourTurn(true);
        setGameOver(true);
      });

      socket.on('you-win', (totalWinStraight: any) => {
        setYouWin(true);
        setWinRow(totalWinStraight);
        setWinningBackgroundOn(true);
        setGameOver(true);
      });

      socket.on('receive-agree-one-more', () => {
        setOpponentWannaOneMore('agree');
      });

      socket.on('error-mess', (errorMess: any) => {
        ErrorMessage(errorMess);
      });
    }
  }, [socket]);

  // Setup score
  useEffect(() => {
    if (isGameOver) {
      setGameOver(false);
      setScore({ you: score.you + Number(isYouWin ? 1 : 0), opp: score.opp + Number(isYouWin ? 0 : 1) });
    }
  }, [isGameOver, isYouWin, score]);

  // Set one more
  useEffect(() => {
    if (opponentWannaOneMore === 'agree' && youWannaOneMore === 'agree') {
      setGameArray(Array.from({ length: tableSize }, () => Array.from({ length: tableSize }, () => '')));
      setWinRow([]);
      setGameOver(false);
      setJustMovedCell(null);
      setWaitingOpponentResponseModal(false);
      setYouWannaOneMore('');
      setOpponentWannaOneMore('');
    }
  }, [opponentWannaOneMore, youWannaOneMore]);

  // Opponent quit
  useEffect(() => {
    if (!isOpponentQuitAnnouncementOpen && opponent && yourOpponentQuit !== '' && yourOpponentQuit === opponent.id) {
      setOpponentQuitAnnouncementOpen(true);
    }
  }, [yourOpponentQuit]);

  const getUserInfoError = () => {
    socket.emit('leave-online-mode');
    navigate('/mode');
    ErrorMessage('Failed: get user info');
  };

  // Get opponent info
  const getOpponentInfoSuccess = (user?: userType, errorMess?: string) => {
    if (user) setOpponent(user);
    else if (errorMess) {
      socket.emit('leave-online-mode');
      navigate('/mode');
      ErrorMessage(errorMess);
    }
  };

  useEffect(() => {
    if (opponentID === '') navigate('/mode');
    else dispatch(getUserInfo(opponentID, getOpponentInfoSuccess, getUserInfoError));
  }, [opponentID]);

  // Get your info
  const getUserInfoSuccess = (user?: userType, errorMess?: string) => {
    if (user) setUserInfo(user);
    else if (errorMess) {
      socket.emit('leave-online-mode');
      navigate('/mode');
      ErrorMessage(errorMess);
    }
  };

  useEffect(() => {
    if (userID !== '') dispatch(getUserInfo(userID, getUserInfoSuccess, getUserInfoError));
  }, [userID]);

  const onMove = (rowIndex: number, colIndex: number, isTurnX: boolean) => {
    console.log(gameArray[rowIndex][colIndex], isGameOver, isYourTurn);
    if (!gameArray[rowIndex][colIndex] && !isGameOver && isYourTurn) {
      setYourTurn(false);
      setJustMovedCell([rowIndex, colIndex]);
      const currentGameArray = [...gameArray];
      currentGameArray[rowIndex][colIndex] = yourSymbol;
      setGameArray(currentGameArray);

      socket.emit('on-move', params.socketID, playingRoomID, rowIndex, colIndex, yourSymbol);
    }
  };

  return (
    <View
      userInfo={userInfo}
      opponent={opponent}
      score={score}
      onMove={onMove}
      gameArray={gameArray}
      isYourTurn={isYourTurn}
      justMovedCell={justMovedCell}
      winRow={winRow}
      isWinningBackgroundOn={isWinningBackgroundOn}
      isOpponentQuitAnnouncementOpen={isOpponentQuitAnnouncementOpen}
      setOpponentQuitAnnouncementOpen={setOpponentQuitAnnouncementOpen}
      isYouWin={isYouWin}
      isOneMoreAnnoucementOn={isOneMoreAnnoucementOn}
      setOneMoreAnnoucementOn={setOneMoreAnnoucementOn}
      setYouWannaOneMore={setYouWannaOneMore}
      waitingOpponentResponseModal={waitingOpponentResponseModal}
      setWaitingOpponentResponseModal={setWaitingOpponentResponseModal}
    />
  );
};

export default memo(GameOnlinePage);

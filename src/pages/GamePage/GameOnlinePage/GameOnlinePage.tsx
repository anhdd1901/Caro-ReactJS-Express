import './GameOnlinePage.scss';

import React, { memo, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Header from '../../../components/Header/Header';
import Table from '../../../components/Table/Table';
import { KINDS_OF_WIN_CHECKER } from '../../../config';
import OnlinePageFooter from '../OnlinePageFooter/OnlinePageFooter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { gameStateType } from '../game.type';
import { useNavigate } from 'react-router-dom';
import { loginStateType, userType } from '../../LoginPage/login.type';
import { useAppDispatch } from '../../../hook';
import { getUserInfo } from '../game.slice';
import { ErrorMessage } from '../../../components/Message';
import UserInfoInRoomButton from '../../OnlineRoomPage/RoomButton/UserInfoInRoomButton';

const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);

interface PT {}

const GameOnlinePage: React.FC<PT> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { opponentID, socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);
  const { userID } = useSelector<RootState, loginStateType>((state) => state.loginReducer);
  const size = (window.innerHeight - 48 - 48 - 40 - 50 - 20) / tableSize;
  const [isTurnX, setTurn] = useState<boolean>(true);
  const [justMovedCell, setJustMovedCell] = useState<number[] | null>(null);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [winRow, setWinRow] = useState<number[][]>([]);
  const [opponent, setOpponent] = useState<userType | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<userType | undefined>(undefined);
  const [gameArray, setGameArray] = useState<string[][]>(
    Array.from({ length: tableSize }, () => Array.from({ length: tableSize }, () => ''))
  );

  // Get opponent info
  useEffect(() => {
    if (opponentID === '') navigate('/mode/online-game');
    else {
      const getUserInfoSuccess = (user?: userType, errorMess?: string) => {
        if (user) setOpponent(user);
        else if (errorMess) {
          socket.emit('leave-online-mode');
          navigate('/mode/online-game');
          ErrorMessage(errorMess);
        }
      };
      const getUserInfoError = () => {
        socket.emit('leave-online-mode');
        navigate('/mode/online-game');
        ErrorMessage('Failed: get user info');
      };
      dispatch(getUserInfo(opponentID, getUserInfoSuccess, getUserInfoError));
    }
  }, [opponentID]);

  // Get your info
  useEffect(() => {
    if (userID !== '') {
      const getUserInfoSuccess = (user?: userType, errorMess?: string) => {
        if (user) setUserInfo(user);
        else if (errorMess) {
          socket.emit('leave-online-mode');
          navigate('/mode/online-game');
          ErrorMessage(errorMess);
        }
      };
      const getUserInfoError = () => {
        socket.emit('leave-online-mode');
        navigate('/mode/online-game');
        ErrorMessage('Failed: get user info');
      };
      dispatch(getUserInfo(userID, getUserInfoSuccess, getUserInfoError));
    }
  }, [userID]);

  const onMove = (rowIndex: number, colIndex: number, isTurnX: boolean) => {
    if (!gameArray[rowIndex][colIndex] && !isGameOver) {
      const currentGameArray = [...gameArray];
      const currentTurn = isTurnX ? 'x' : 'o';
      currentGameArray[rowIndex][colIndex] = currentTurn;

      setJustMovedCell([rowIndex, colIndex]);
      checkWin(rowIndex, colIndex, currentGameArray, currentTurn);
      setGameArray(currentGameArray);
      setTurn(!isTurnX);
    }
  };

  const checkWin = (rowIndex: number, colIndex: number, currentGameArray: string[][], currentTurn: string) => {
    let totalWinStraight: number[][] = [];
    let gameOver = false;

    KINDS_OF_WIN_CHECKER.forEach((kindOfWinChecker) => {
      let winStraight: number[][] = [[rowIndex, colIndex]];

      kindOfWinChecker.forEach((checkFlow) => {
        let movingRowIndex = rowIndex;
        let movingColIndex = colIndex;

        while (
          movingRowIndex + checkFlow[0] >= 0 &&
          movingColIndex + checkFlow[1] >= 0 &&
          movingRowIndex + checkFlow[0] < tableSize &&
          movingColIndex + checkFlow[1] < tableSize
        ) {
          movingRowIndex += checkFlow[0];
          movingColIndex += checkFlow[1];
          if (currentGameArray[movingRowIndex][movingColIndex] === currentTurn) {
            winStraight = [...winStraight, [movingRowIndex, movingColIndex]];
          } else break;
        }
      });

      if (winStraight.length >= 5) {
        gameOver = true;
        totalWinStraight = [...totalWinStraight, ...winStraight];
      }
    });

    if (gameOver) {
      setGameOver(true);
      setWinRow(totalWinStraight);
    }
  };

  // console.log(userInfo, opponent);
  return (
    <div className="background-container game-container">
      <Modal
        footer={null}
        visible={true}
        closable={false}
        className="login-modal game-container-modal online-game-container-modal"
      >
        <Header
          title={
            <div className="receive-challenge-modal-main-challenge">
              <UserInfoInRoomButton player={1} playerOne={userInfo} notNeedName={true} />
              <div className="display-name">{userInfo?.displayName}</div>
            </div>
          }
          tail={
            <div className="receive-challenge-modal-main-challenge">
              <div className="display-name">{opponent?.displayName}</div>
              <UserInfoInRoomButton player={2} playerOne={opponent} notNeedName={true} />
            </div>
          }
          mid={<div>vs</div>}
        />

        <Table
          size={size}
          onClick={onMove}
          value={gameArray}
          turn={isTurnX}
          justMovedCell={justMovedCell}
          winRow={winRow}
        />

        <OnlinePageFooter opponent={opponent} />
      </Modal>
    </div>
  );
};

export default memo(GameOnlinePage);

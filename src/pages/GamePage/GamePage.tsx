import './GamePage.scss';

import React, { memo, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Table from '../../components/Table/Table';
import Header from '../../components/Header/Header';
import { KINDS_OF_WIN_CHECKER } from '../../config';
import Footer from './Footer/Footer';

const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);

const GamePage = () => {
  const size = (window.innerHeight - 48 - 48 - 40 - 50 - 20) / tableSize;
  const [isTurnX, setTurn] = useState<boolean>(true);
  const [justMovedCell, setJustMovedCell] = useState<number[] | null>(null);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [winRow, setWinRow] = useState<number[][]>([]);
  const [gameArray, setGameArray] = useState<string[][]>(
    Array.from({ length: tableSize }, () => Array.from({ length: tableSize }, () => ''))
  );

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

  return (
    <div className="background-container game-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal game-container-modal">
        <Header title="player one" tail="player two" mid={<div>vs</div>} />

        <Table
          size={size}
          onClick={onMove}
          value={gameArray}
          turn={isTurnX}
          justMovedCell={justMovedCell}
          winRow={winRow}
        />

        <Footer />
      </Modal>
    </div>
  );
};

export default memo(GamePage);

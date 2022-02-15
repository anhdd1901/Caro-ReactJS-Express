import './GamePage.scss';

import React, { memo, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Header from './Header';
import Footer from './Footer';
import Table from '../../components/Table/Table';

const GamePage = () => {
  const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);
  const size = (window.innerHeight - 48 - 48 - 40 - 50 - 20) / tableSize;
  const [isTurnX, setTurn] = useState<boolean>(true);
  const [justMovedCell, setJustMovedCell] = useState<number[] | null>(null);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [winRow, setWinRow] = useState<number[][] | null>(null);
  const [gameArray, setGameArray] = useState<string[][]>(
    Array.from({ length: tableSize }, () => Array.from({ length: tableSize }, () => ''))
  );

  const onMove = (rowIndex: number, colIndex: number, isTurnX: boolean) => {
    if (!gameArray[rowIndex][colIndex] && !isGameOver) {
      const currentGameArray = [...gameArray];
      currentGameArray[rowIndex][colIndex] = isTurnX ? 'x' : 'o';
      setJustMovedCell([rowIndex, colIndex]);
      setGameArray(currentGameArray);
      setTurn(!isTurnX);
    }
  };

  return (
    <div className="background-container game-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal game-container-modal">
        <Header />

        <Table size={size} onClick={onMove} value={gameArray} turn={isTurnX} justMovedCell={justMovedCell} />

        <Footer />
      </Modal>
    </div>
  );
};

export default memo(GamePage);

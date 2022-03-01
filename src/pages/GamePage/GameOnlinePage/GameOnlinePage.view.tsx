import './GameOnlinePage.style.scss';
import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Header from '../../../components/Header/Header';
import Table from '../../../components/Table/Table';
import OnlinePageFooter from './OnlinePageFooter/OnlinePageFooter';
import UserInfoInRoomButton from '../../OnlineRoomPage/RoomButton/UserInfoInRoomButton';
import WinningBackground from './WinningBackground/WinningBackground';
import { userType } from '../../LoginPage/login.type';
import ModalInGame from './ModalInGame/ModalInGame';

const tableSize = Number(process.env.REACT_APP_TABLE_SIZE);

interface PT {
  userInfo: userType | undefined;
  opponent: userType | undefined;
  score: { you: number; opp: number };
  onMove: (rowIndex: number, colIndex: number, isTurnX: boolean) => void;
  gameArray: string[][];
  isYourTurn: boolean;
  justMovedCell: number[] | null;
  winRow: number[][];
  isWinningBackgroundOn: boolean;
  isOpponentQuitAnnouncementOpen: boolean;
  setOpponentQuitAnnouncementOpen: (bool: boolean) => void;
  isYouWin: boolean;
  isOneMoreAnnoucementOn: boolean;
  setOneMoreAnnoucementOn: (bool: boolean) => void;
  setYouWannaOneMore: (str: string) => void;
  waitingOpponentResponseModal: boolean;
  setWaitingOpponentResponseModal: (bool: boolean) => void;
}

const View: React.FC<PT> = ({
  userInfo,
  opponent,
  score,
  onMove,
  gameArray,
  isYourTurn,
  justMovedCell,
  winRow,
  isWinningBackgroundOn,
  isOpponentQuitAnnouncementOpen,
  setOpponentQuitAnnouncementOpen,
  isYouWin,
  isOneMoreAnnoucementOn,
  setOneMoreAnnoucementOn,
  setYouWannaOneMore,
  waitingOpponentResponseModal,
  setWaitingOpponentResponseModal,
}) => {
  const size = (window.innerHeight - 48 - 48 - 40 - 50 - 20) / tableSize;

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
          mid={
            <div className="score-board">
              <div className="score">{score.you}</div>
              <div>vs</div>
              <div className="score">{score.opp}</div>
            </div>
          }
          tail={
            <div className="receive-challenge-modal-main-challenge">
              <div className="display-name">{opponent?.displayName}</div>
              <UserInfoInRoomButton player={2} playerOne={opponent} notNeedName={true} />
            </div>
          }
        />

        <Table
          size={size}
          onClick={onMove}
          value={gameArray}
          turn={isYourTurn}
          justMovedCell={justMovedCell}
          winRow={winRow}
        />

        <OnlinePageFooter opponent={opponent} />
        <WinningBackground disabled={!isWinningBackgroundOn} />
      </Modal>
      <ModalInGame
        opponent={opponent}
        isOpponentQuitAnnouncementOpen={isOpponentQuitAnnouncementOpen}
        setOpponentQuitAnnouncementOpen={setOpponentQuitAnnouncementOpen}
        isOneMoreAnnoucementOn={isOneMoreAnnoucementOn}
        setOneMoreAnnoucementOn={setOneMoreAnnoucementOn}
        isYouWin={isYouWin}
        setYouWannaOneMore={setYouWannaOneMore}
        waitingOpponentResponseModal={waitingOpponentResponseModal}
        setWaitingOpponentResponseModal={setWaitingOpponentResponseModal}
      />
    </div>
  );
};

export default memo(View);

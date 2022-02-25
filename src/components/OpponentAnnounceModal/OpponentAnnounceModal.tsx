import './OpponentAnnounceModal.scss';
import React, { memo, ReactNode } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ButtonAnt from '../ButtonAnt/ButtonAnt';
import { userType } from '../../pages/LoginPage/login.type';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { gameStateType } from '../../pages/GamePage/game.type';
import { useNavigate } from 'react-router-dom';
import UserInfoInRoomButton from '../../pages/OnlineRoomPage/RoomButton/UserInfoInRoomButton';

interface PT {
  opponent: userType | undefined;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  message: ReactNode;
}

const OpponentAnnounceModal: React.FC<PT> = ({ opponent, visible, setVisible, message }) => {
  const navigate = useNavigate();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);

  return (
    <div className="receive-challenge-modal-container">
      <Modal
        footer={null}
        visible={visible}
        closable={false}
        className="login-modal rooms-page-modal online-rooms-page-modal receive-challenge-modal"
      >
        <div className="receive-challenge-modal-main">
          <div className="receive-challenge-modal-main-challenge">
            <UserInfoInRoomButton player={1} playerOne={opponent} notNeedName={true} />
            {message}
          </div>

          <div className="receive-challenge-modal-main-buttons">
            <ButtonAnt
              title="quit"
              onClick={() => {
                setVisible(false);
                navigate('/mode/online-game');
                socket.emit('leave-online-mode');
              }}
            />
            <ButtonAnt
              title="cancel"
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(OpponentAnnounceModal);

import './OpponentAnnounceModal.scss';
import React, { memo, ReactNode } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ButtonAnt from '../ButtonAnt/ButtonAnt';
import { userType } from '../../pages/LoginPage/login.type';
import UserInfoInRoomButton from '../../pages/OnlineRoomPage/RoomButton/UserInfoInRoomButton';

interface PT {
  opponent: userType | undefined;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  message: ReactNode;
  onClick: () => void;
  oneButton?: boolean;
}

const OpponentAnnounceModal: React.FC<PT> = ({ opponent, visible, setVisible, message, onClick, oneButton }) => {
  return (
    <div className="receive-challenge-modal-container">
      <Modal
        footer={null}
        visible={visible}
        closable={false}
        className={`login-modal rooms-page-modal online-rooms-page-modal receive-challenge-modal ${
          oneButton ? 'one-button' : ''
        }`}
      >
        <div className="receive-challenge-modal-main">
          <div className="receive-challenge-modal-main-challenge">
            <UserInfoInRoomButton player={1} playerOne={opponent} notNeedName={true} />
            {message}
          </div>

          <div className="receive-challenge-modal-main-buttons">
            <ButtonAnt title="quit" onClick={onClick} />
            {!oneButton && (
              <ButtonAnt
                title="cancel"
                onClick={() => {
                  setVisible(false);
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(OpponentAnnounceModal);

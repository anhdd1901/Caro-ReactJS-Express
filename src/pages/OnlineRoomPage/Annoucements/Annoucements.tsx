import './Annoucements.scss';
import React, { memo, ReactNode, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import UserInfoInRoomButton from '../RoomButton/UserInfoInRoomButton';
import { userType } from '../../LoginPage/login.type';

interface PT {
  challenger: userType;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  text: ReactNode;
}

const Annoucements: React.FC<PT> = ({ challenger, visible, setVisible, text }) => {
  setTimeout(() => {
    if (visible) setVisible(false);
  }, 2000);

  return (
    <Modal
      footer={null}
      visible={visible}
      closable={false}
      className="login-modal rooms-page-modal online-rooms-page-modal receive-challenge-modal"
    >
      <div className="receive-challenge-modal-main">
        <div className="receive-challenge-modal-main-challenge">
          <UserInfoInRoomButton player={1} playerOne={challenger} notNeedName={true} />
          {text}
        </div>
      </div>
    </Modal>
  );
};

export default memo(Annoucements);

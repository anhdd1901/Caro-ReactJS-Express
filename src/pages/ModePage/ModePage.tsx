import './ModePage.scss';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ModeButton from './ModeButton';

const ModePage = () => {
  const navigate = useNavigate();

  const modeButtonList = [
    {
      title: 'online mode',
      imageLink: 'online',
      onClick: () => {
        navigate('/room/online-game');
      },
    },
    {
      title: 'offline mode',
      imageLink: 'offline',
      onClick: () => {
        navigate('/room/offline-game');
      },
    },
    {
      title: 'logout',
      imageLink: 'back',
      onClick: () => {
        sessionStorage.setItem('token', '');
        navigate('/');
      },
    },
  ];

  return (
    <div className="background-container rooms-page-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal rooms-page-modal">
        <Header title="chose room" />

        <div className="login-modal-form">
          <div className="login-modal-form-buttons">
            {modeButtonList.map((a) => (
              <ModeButton key={a.title} title={a.title} imageLink={a.imageLink} onClick={a.onClick} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(ModePage);

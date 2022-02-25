import './ModePage.scss';

import React, { memo, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ModeButton from './ModeButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { gameStateType } from '../GamePage/game.type';
import { loginStateType } from '../LoginPage/login.type';

const ModePage = () => {
  const navigate = useNavigate();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);
  const { username } = useSelector<RootState, loginStateType>((state) => state.loginReducer);

  useEffect(() => {
    if (socket) {
      socket.emit('leave-online-mode');
    }
  }, [socket]);

  const modeButtonList = [
    {
      title: 'online mode',
      imageLink: 'online',
      onClick: () => {
        navigate('/mode/online-game');
      },
    },
    {
      title: 'offline mode',
      imageLink: 'offline',
      onClick: () => {
        navigate('/mode/offline-game');
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
        <Header
          title={
            <div>
              <span style={{ color: '#26A69A' }}>hello</span>.{username}
            </div>
          }
        />

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

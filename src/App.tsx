import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage.index';
import ModePage from './pages/ModePage/ModePage';
import SignUpPage from './pages/SignUp/SignUpPage.index';
import GamePage from './pages/GamePage/GamePage';

import React, { memo, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OnlineRoomPage from './pages/OnlineRoomPage/OnlineRoomPage.index';
import { useAppDispatch } from './hook';
import { auth, loginAction } from './pages/LoginPage/login.slice';
import { loginResType } from './pages/LoginPage/login.type';
import { ErrorMessage } from './components/Message';
import { useConnectSocket } from './useConnectSocket/useConnectSocket';
import { Socket } from 'socket.io-client';
import { gameAction } from './pages/GamePage/game.slice';
import GameOnlinePage from './pages/GamePage/GameOnlinePage/GameOnlinePage';

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : sessionStorage.getItem('token')
  ? sessionStorage.getItem('token')
  : '';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, client } = useConnectSocket();

  // Check auth
  useEffect(() => {
    const authSuccess = (data: loginResType) => {
      if (data.username && data.userID) {
        dispatch(loginAction.setUsername(data.username));
        dispatch(loginAction.setUserID(data.userID));
        if (location.pathname === '/') navigate('/mode');
        else navigate(location.pathname);
      } else if (data.errorMess) {
        ErrorMessage(data.errorMess);
        navigate('/');
      }
    };
    const authError = () => {
      ErrorMessage('Auth failed');
      navigate('/');
    };
    if (token) dispatch(auth(authSuccess, authError));
  }, []);

  useEffect(() => {
    if (isConnected) {
      const socket = client as Socket;
      dispatch(gameAction.setSocket(socket));
    }
  }, [isConnected]);

  return (
    <div className="container-app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/mode/online-game" element={<OnlineRoomPage />} />
        <Route path="/mode/online-game/:socketID" element={<GameOnlinePage />} />
        <Route path="/mode/offline-game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default memo(App);

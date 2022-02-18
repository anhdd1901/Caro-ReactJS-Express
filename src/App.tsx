import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage.index';
import RoomsPage from './pages/ModePage/ModePage';
import SignUpPage from './pages/SignUp/SignUpPage.index';
import GamePage from './pages/GamePage/GamePage';

import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';
import OnlineRoomPage from './pages/OnlineRoomPage/OnlineRoomPage';

const App = () => {
  return (
    <div className="container-app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/room" element={<RoomsPage />} />
        <Route path="/room/online-game" element={<OnlineRoomPage />} />
        <Route path="/room/offline-game" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default memo(App);

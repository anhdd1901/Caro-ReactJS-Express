import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import SignUp from './pages/SignUp/SignUp';
import GamePage from './pages/GamePage/GamePage';

import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="container-app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/room" element={<RoomsPage />} />
        <Route path="/room/:id" element={<GamePage />} />
      </Routes>
    </div>
  );
};

export default memo(App);

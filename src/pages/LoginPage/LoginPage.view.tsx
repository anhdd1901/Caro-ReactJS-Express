import './LoginPage.style.scss';
import InputAnt from '../../components/InputAnt/InputAnt';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';
import Header from '../../components/Header/Header';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';

interface PT {
  onLogin: () => void;
  username: string;
  password: string;
  errorMessUsername: string;
  errorMessPassword: string;
  setUsername: (str: string) => void;
  setPassword: (str: string) => void;
  isLoadingHandleLogin: boolean;
}

const LoginPage: React.FC<PT> = ({
  onLogin,
  username,
  password,
  errorMessUsername,
  errorMessPassword,
  setUsername,
  setPassword,
  isLoadingHandleLogin,
}) => {
  const navigate = useNavigate();

  return (
    <div className="login-container background-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal">
        <Header title="login" />

        <div className="login-modal-form">
          <InputAnt
            placeholder="username"
            text={username}
            setText={setUsername}
            errorMess={errorMessUsername}
            disabled={isLoadingHandleLogin}
            onPressEnter={onLogin}
          />
          <InputAnt
            placeholder="password"
            type="password"
            text={password}
            setText={setPassword}
            errorMess={errorMessPassword}
            disabled={isLoadingHandleLogin}
            onPressEnter={onLogin}
          />
          <div className="login-modal-form-buttons">
            <ButtonAnt title="login" onClick={onLogin} disabled={isLoadingHandleLogin} />
            <ButtonAnt
              title="sign-up"
              onClick={() => {
                if (!isLoadingHandleLogin) navigate('/sign-up');
              }}
              disabled={isLoadingHandleLogin}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(LoginPage);

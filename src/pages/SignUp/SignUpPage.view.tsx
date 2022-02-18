import '../LoginPage/LoginPage.style.scss';
import './SignUpPage.style.scss';
import InputAnt from '../../components/InputAnt/InputAnt';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

interface PT {
  username: string;
  password: string;
  errorMessUsername: string;
  errorMessPassword: string;
  setUsername: (str: string) => void;
  setPassword: (str: string) => void;
  onSignUp: () => void;
  isLoadingHandleSignUp: boolean;
}

const SignUp: React.FC<PT> = ({
  username,
  password,
  errorMessUsername,
  errorMessPassword,
  setUsername,
  setPassword,
  onSignUp,
  isLoadingHandleSignUp,
}) => {
  const navigate = useNavigate();
  return (
    <div className="sign-up-container background-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal">
        <Header title="sign-up" />

        <div className="login-modal-form">
          <InputAnt
            placeholder="username"
            text={username}
            setText={setUsername}
            errorMess={errorMessUsername}
            disabled={isLoadingHandleSignUp}
            onPressEnter={onSignUp}
          />
          <InputAnt
            placeholder="password"
            type="password"
            text={password}
            setText={setPassword}
            errorMess={errorMessPassword}
            disabled={isLoadingHandleSignUp}
            onPressEnter={onSignUp}
          />
          <div className="login-modal-form-buttons">
            <ButtonAnt title="sign-up" onClick={onSignUp} disabled={isLoadingHandleSignUp} />
            <ButtonAnt
              title="back"
              onClick={() => {
                if (!isLoadingHandleSignUp) navigate('/');
              }}
              disabled={isLoadingHandleSignUp}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(SignUp);

import './LoginPage.scss';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import InputAnt from '../../components/InputAnt/InputAnt';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/room');
  };

  return (
    <div className="login-container background-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal">
        <Header title="login" />

        <div className="login-modal-form">
          <InputAnt placeholder="username" />
          <InputAnt placeholder="password" type="password" />
          <div className="login-modal-form-buttons">
            <ButtonAnt title="login" onClick={onLogin} />
            <ButtonAnt
              title="sign-up"
              onClick={() => {
                navigate('/sign-up');
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(LoginPage);

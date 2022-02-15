import './LoginPage.scss';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import InputAnt from '../../components/InputAnt/InputAnt';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <div className="login-modal-header">
      <div className="login-modal-title">
        <div>login</div>
      </div>

      <div className="login-modal-title">
        <div>.caro</div>
        <div className="login-modal-title-secondary-text">.games</div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container background-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal">
        <Header />

        <div className="login-modal-form">
          <InputAnt placeholder="username" />
          <InputAnt placeholder="password" type="password" />
          <div className="login-modal-form-buttons">
            <ButtonAnt title="login" onClick={() => {}} />
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

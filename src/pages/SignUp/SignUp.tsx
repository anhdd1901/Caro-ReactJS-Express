import '../LoginPage/LoginPage.scss';
import './SignUp.scss';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import InputAnt from '../../components/InputAnt/InputAnt';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const SignUp = () => {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate('/');
  };

  return (
    <div className="sign-up-container background-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal">
        <Header title="sign-up" />

        <div className="login-modal-form">
          <InputAnt placeholder="username" />
          <InputAnt placeholder="password" type="password" />
          <div className="login-modal-form-buttons">
            <ButtonAnt title="sign-up" onClick={onSignUp} />
            <ButtonAnt
              title="back"
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(SignUp);

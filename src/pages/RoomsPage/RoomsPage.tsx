import './RoomsPage.scss';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

interface PTButtonWithImage {
  title: string;
  imageLink: string;
}

const ButtonWithImage: React.FC<PTButtonWithImage> = ({ title, imageLink }) => {
  return (
    <div className="button-with-image">
      <div className="button-with-image-img">
        <img src={`./assets/${imageLink}.png`} alt={`${title} image`} />
      </div>
      <div className="button-with-image-title">{title}</div>
    </div>
  );
};

const RoomsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background-container rooms-page-container">
      <Modal footer={null} visible={true} closable={false} className="login-modal rooms-page-modal">
        <Header title="chose mode" />

        <div className="login-modal-form">
          <div className="login-modal-form-buttons">
            <ButtonAnt
              style="chose-mode-button"
              title={<ButtonWithImage title="online mode" imageLink="online" />}
              onClick={() => {}}
            />
            <ButtonAnt
              style="chose-mode-button"
              title={<ButtonWithImage title="offline mode" imageLink="offline" />}
              onClick={() => {
                navigate('/room/random-id');
              }}
            />
            <ButtonAnt
              style="chose-mode-button"
              title={<ButtonWithImage title="back" imageLink="back" />}
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

export default memo(RoomsPage);

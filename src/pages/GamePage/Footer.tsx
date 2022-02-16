import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="login-modal-form-buttons">
      <ButtonAnt
        title="quit"
        onClick={() => {
          navigate('/room');
        }}
      />
    </div>
  );
};

export default memo(Footer);

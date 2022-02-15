import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="login-modal-form-buttons">
      <ButtonAnt
        title="quit"
        onClick={() => {
          navigate('/rooms');
        }}
      />
    </div>
  );
};

export default Footer;

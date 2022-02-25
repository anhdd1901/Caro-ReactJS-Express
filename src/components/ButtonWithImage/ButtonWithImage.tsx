import './ButtonWithImage.scss';
import React, { memo, ReactNode } from 'react';

interface PT {
  onClick: () => void;
  fontAwesomeCpn: ReactNode;
  style?: string;
  disabled?: boolean;
}

const ButtonWithImage: React.FC<PT> = ({ fontAwesomeCpn, onClick, style, disabled }) => {
  return (
    <div
      className={`button-with-image-container ${style ? style : ''} ${
        disabled ? 'button-with-image-container-disabled' : ''
      }`}
      onClick={onClick}
    >
      {fontAwesomeCpn}
    </div>
  );
};

export default memo(ButtonWithImage);

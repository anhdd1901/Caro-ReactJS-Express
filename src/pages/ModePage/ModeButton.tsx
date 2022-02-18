import React, { memo } from 'react';
import ButtonAnt from '../../components/ButtonAnt/ButtonAnt';

interface PTButtonWithImage {
  title: string;
  imageLink: string;
}

const ButtonWithImage: React.FC<PTButtonWithImage> = ({ title, imageLink }) => {
  return (
    <div className="button-with-image">
      <div className="button-with-image-img">
        <img src={`./assets/mode/${imageLink}.png`} alt={`${title} image`} />
      </div>
      <div className="button-with-image-title">{title}</div>
    </div>
  );
};

interface PT {
  title: string;
  imageLink: string;
  onClick: () => void;
}

const ModeButton: React.FC<PT> = ({ title, imageLink, onClick }) => {
  return (
    <ButtonAnt
      style="chose-mode-button"
      title={<ButtonWithImage title={title} imageLink={imageLink} />}
      onClick={onClick}
    />
  );
};

export default memo(ModeButton);

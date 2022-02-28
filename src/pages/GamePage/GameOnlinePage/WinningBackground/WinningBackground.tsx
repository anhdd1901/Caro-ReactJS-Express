import './WinningBackground.scss';
import React, { memo } from 'react';

interface PT {
  disabled: boolean;
}

const WinningBackground: React.FC<PT> = ({ disabled }) => {
  return <div className={`online-game-win-background ${disabled ? 'disabled-background' : ''}`}></div>;
};

export default memo(WinningBackground);

import './ButtonAnt.scss';

import React, { memo, ReactNode } from 'react';
import { Button } from 'antd';

interface PT {
  title: ReactNode;
  style?: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonAnt: React.FC<PT> = ({ title, style, onClick, disabled }) => {
  return (
    <div className={`button-ant-customized-container ${style}`}>
      <Button className={`button-ant-customized ${disabled ? 'button-ant-customized-disabled' : ''}`} onClick={onClick}>
        {title}
      </Button>
    </div>
  );
};

export default memo(ButtonAnt);

import './ButtonAnt.scss';

import React, { memo } from 'react';
import { Button } from 'antd';

interface PT {
  title: string;
  style?: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonAnt: React.FC<PT> = ({ title, style, onClick, disabled }) => {
  return (
    <div className="button-ant-customized-container">
      <Button
        className={`button-ant-customized ${style} ${disabled ? 'button-ant-customized-disabled' : ''}`}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
};

export default memo(ButtonAnt);

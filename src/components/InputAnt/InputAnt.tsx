import './InputAnt.scss';

import React, { memo } from 'react';
import { Input } from 'antd';

interface PT {
  placeholder: string;
  style?: string;
  type?: string;
  disabled?: boolean;
  errorMess?: string;
  text: string;
  setText: (str: string) => void;
  onPressEnter?: () => void;
}

const InputAnt: React.FC<PT> = ({ placeholder, style, type, disabled, errorMess, text, setText, onPressEnter }) => {
  return (
    <div className="input-ant-customized-container">
      <Input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className={`input-ant-customized ${style} ${errorMess ? 'input-ant-customized-error' : ''}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={onPressEnter}
      />
      <div className="input-ant-customized-error-mess">{errorMess}</div>
    </div>
  );
};

export default memo(InputAnt);

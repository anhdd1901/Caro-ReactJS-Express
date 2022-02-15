import './InputAnt.scss';

import React, { memo } from 'react';
import { Input } from 'antd';

interface PT {
  placeholder: string;
  style?: string;
  type?: string;
  disabled?: boolean;
}

const InputAnt: React.FC<PT> = ({ placeholder, style, type, disabled }) => {
  return (
    <div className="input-ant-customized-container">
      <Input disabled={disabled} type={type} placeholder={placeholder} className={`input-ant-customized ${style}`} />
    </div>
  );
};

export default memo(InputAnt);

import './Header.scss';

import React, { memo } from 'react';

interface PT {
  title: string;
  tail?: string;
}

const Header: React.FC<PT> = ({ title, tail }) => {
  return (
    <div className="login-modal-header">
      <div className="login-modal-title">
        <div>{title}</div>
      </div>

      <div className="login-modal-title">
        {tail ? (
          <div>{tail}</div>
        ) : (
          <>
            <div>.caro</div>
            <div className="login-modal-title-secondary-text">.game</div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Header);

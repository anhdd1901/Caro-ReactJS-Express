import './Header.scss';

import React, { memo, ReactNode } from 'react';

interface PT {
  title: ReactNode;
  tail?: ReactNode;
  mid?: ReactNode;
}

const Header: React.FC<PT> = ({ title, tail, mid }) => {
  return (
    <div className="login-modal-header">
      <div className="login-modal-title">
        <div>{title}</div>
      </div>

      {mid && <div className="login-modal-title login-modal-title-mid">{mid}</div>}

      <div className="login-modal-title login-modal-title-right">
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

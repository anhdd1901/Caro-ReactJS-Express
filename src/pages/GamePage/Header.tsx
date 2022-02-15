import React, { memo } from 'react';

const Header = () => {
  return (
    <div className="login-modal-header">
      <div className="login-modal-title">
        <div>You</div>
      </div>

      <div className="login-modal-title">
        <div>Your opp</div>
      </div>
    </div>
  );
};

export default memo(Header);

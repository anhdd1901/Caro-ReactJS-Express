import './LoadingPage.scss';
import React, { memo } from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-page-container">
      <img src="/assets/loading/game.gif" />
    </div>
  );
};

export default memo(LoadingPage);

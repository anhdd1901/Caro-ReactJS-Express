import './UserInfoInRoomButton.scss';
import React, { memo } from 'react';
import { userType } from '../../LoginPage/login.type';
import { RANK_LIST } from '../../../config';

interface PT {
  playerOne?: userType;
  style?: string;
  player: number;
  notNeedName?: boolean;
}

const UserInfoInRoomButton: React.FC<PT> = ({ playerOne, style, player, notNeedName }) => {
  return (
    <div className={`button-with-image-img-user-info ${style ? style : ''}`}>
      <div className="button-with-image-img-avatar">
        <img
          src={
            playerOne ? (playerOne.avatar !== '' ? playerOne.avatar : '/assets/user.png') : '/assets/loading/user.gif'
          }
          alt={`${playerOne ? playerOne.displayName : 'waiting'} ava`}
        />
        <div className={`medal-rank medal-rank-${player}`}>
          <div className="medal-rank-img">
            {playerOne ? (
              <>
                <div
                  style={{
                    color:
                      Math.floor(playerOne.rank % 13 === 0 ? (playerOne.rank - 1) / 13 : playerOne.rank / 13) > 1
                        ? '#f17b89'
                        : '#4a5058',
                  }}
                  className="medal-rank-img-detail"
                >
                  {RANK_LIST[Math.min(52, playerOne.rank) % 13]}
                </div>
                <div className="medal-rank-img-detail">
                  <img
                    src={`/assets/rankMedal/${
                      Math.min(
                        3,
                        Math.floor(playerOne.rank % 13 === 0 ? (playerOne.rank - 1) / 13 : playerOne.rank / 13)
                      ) + 1
                    }.png`}
                    alt={`${Math.min(3, Math.floor(playerOne.rank / 13)) + 1} grade`}
                  />
                </div>
              </>
            ) : (
              <>
                <div></div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </div>

      {!notNeedName && (
        <>
          <div className="button-with-image-img-username">{playerOne ? playerOne.displayName : ''}</div>
          <div className="button-with-image-img-current-won">{playerOne ? playerOne.currentWon : ''}</div>
        </>
      )}
    </div>
  );
};

export default memo(UserInfoInRoomButton);

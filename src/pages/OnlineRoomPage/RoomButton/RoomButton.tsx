import './RoomButton.scss';
import React, { memo } from 'react';
import ButtonAnt from '../../../components/ButtonAnt/ButtonAnt';
import { onlineRoomType } from '../onlineRoom.type';
import { RANK_LIST } from '../../../config';

interface PT {
  roomInfo: onlineRoomType;
}

const ButtonWithImage: React.FC<PT> = ({ roomInfo }) => {
  return (
    <div className="button-with-image">
      <div className="button-with-image-img">
        <div className="button-with-image-img-user-info">
          <div className="button-with-image-img-avatar">
            <img src={roomInfo.playerOne.avatar} alt={`${roomInfo.playerOne.displayName} ava`} />
            <div className="medal-rank medal-rank-1">
              <div className="medal-rank-img">
                <div
                  style={{
                    color:
                      Math.floor(
                        roomInfo.playerOne.rank % 13 === 0
                          ? (roomInfo.playerOne.rank - 1) / 13
                          : roomInfo.playerOne.rank / 13
                      ) > 1
                        ? '#f17b89'
                        : '#4a5058',
                  }}
                  className="medal-rank-img-detail"
                >
                  {RANK_LIST[Math.min(52, roomInfo.playerOne.rank) % 13]}
                </div>
                <div className="medal-rank-img-detail">
                  <img
                    src={`/assets/rankMedal/${
                      Math.min(
                        3,
                        Math.floor(
                          roomInfo.playerOne.rank % 13 === 0
                            ? (roomInfo.playerOne.rank - 1) / 13
                            : roomInfo.playerOne.rank / 13
                        )
                      ) + 1
                    }.png`}
                    alt={`${Math.min(3, Math.floor(roomInfo.playerOne.rank / 13)) + 1} grade`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="button-with-image-img-username">{roomInfo.playerOne.displayName}</div>
          <div className="button-with-image-img-current-won">{roomInfo.playerOne.currentWon}</div>
        </div>

        <div className="button-with-image-img-vs">vs</div>

        {roomInfo.playerTwo ? (
          <div className="button-with-image-img-user-info">
            <div className="button-with-image-img-avatar">
              <img src={roomInfo.playerTwo.avatar} alt={`${roomInfo.playerTwo.displayName} image`} />
              <div className="medal-rank medal-rank-2">
                <div className="medal-rank-img">
                  <div
                    style={{
                      color:
                        Math.floor(
                          roomInfo.playerTwo.rank % 13 === 0
                            ? (roomInfo.playerTwo.rank - 1) / 13
                            : roomInfo.playerTwo.rank / 13
                        ) > 1
                          ? '#f17b89'
                          : '#4a5058',
                    }}
                    className="medal-rank-img-detail"
                  >
                    {RANK_LIST[Math.min(52, roomInfo.playerTwo.rank) % 13]}
                  </div>
                  <div className="medal-rank-img-detail">
                    <img
                      src={`/assets/rankMedal/${
                        Math.min(
                          3,
                          Math.floor(
                            roomInfo.playerTwo.rank % 13 === 0
                              ? (roomInfo.playerTwo.rank - 1) / 13
                              : roomInfo.playerTwo.rank / 13
                          )
                        ) + 1
                      }.png`}
                      alt={`${Math.min(3, Math.floor(roomInfo.playerTwo.rank / 13)) + 1} grade`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="button-with-image-img-username">{roomInfo.playerTwo.displayName}</div>
            <div className="button-with-image-img-current-won">{roomInfo.playerTwo.currentWon}</div>
          </div>
        ) : (
          <div className="button-with-image-img-user-info">
            <div className="button-with-image-img-avatar">
              <img src="/assets/loading/user.gif" alt="waiting" />
              <div className="medal-rank medal-rank-2">
                <div className="medal-rank-img">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className="button-with-image-img-username"></div>
            <div className="button-with-image-img-current-won"></div>
          </div>
        )}
      </div>
      <div className="button-with-image-title">{roomInfo.status}</div>
    </div>
  );
};

const RoomButton: React.FC<PT> = ({ roomInfo }) => {
  return (
    <ButtonAnt
      style="chose-mode-button online-room-buttom"
      title={<ButtonWithImage roomInfo={roomInfo} />}
      onClick={() => {}}
    />
  );
};

export default memo(RoomButton);

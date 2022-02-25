import './RoomButton.scss';
import React, { memo } from 'react';
import ButtonAnt from '../../../components/ButtonAnt/ButtonAnt';
import { onlineRoomType } from '../onlineRoom.type';
import UserInfoInRoomButton from './UserInfoInRoomButton';
import { userType } from '../../LoginPage/login.type';
import { RootState } from '../../../store';
import { gameStateType } from '../../GamePage/game.type';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hook';
import { gameAction } from '../../GamePage/game.slice';

interface PT {
  roomInfo: onlineRoomType;
  userID: string;
  setChallengeTo: (data: { user: userType; challengerSocketID: string }) => void;
  setVisibleChallengeTo: (bool: boolean) => void;
}

const ButtonWithImage: React.FC<PT> = ({ roomInfo }) => {
  return (
    <div className="button-with-image">
      <div className="button-with-image-img">
        <UserInfoInRoomButton playerOne={roomInfo.playerOne} player={1} />

        <div className="button-with-image-img-vs">vs</div>

        {roomInfo.playerTwo ? (
          <UserInfoInRoomButton playerOne={roomInfo.playerTwo} player={2} />
        ) : (
          <UserInfoInRoomButton player={2} />
        )}
      </div>
      <div className="button-with-image-title">{roomInfo.playerTwo ? 'playing' : 'waiting'}</div>
    </div>
  );
};

const RoomButton: React.FC<PT> = ({ roomInfo, userID, setChallengeTo, setVisibleChallengeTo }) => {
  const dispatch = useAppDispatch();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);

  return (
    <ButtonAnt
      style={`chose-mode-button online-room-buttom ${roomInfo.playerTwo ? 'playing-room' : ''}`}
      title={
        <ButtonWithImage
          roomInfo={roomInfo}
          userID={userID}
          setChallengeTo={setChallengeTo}
          setVisibleChallengeTo={setVisibleChallengeTo}
        />
      }
      onClick={() => {
        if (socket && !roomInfo.playerTwo) {
          dispatch(gameAction.setOpponentID(roomInfo.id));
          socket.emit('send-challenge', roomInfo.socketRoomID, userID, socket.id);
          setChallengeTo({ user: roomInfo.playerOne, challengerSocketID: roomInfo.socketRoomID });
          setVisibleChallengeTo(true);
        }
      }}
    />
  );
};

export default memo(RoomButton);

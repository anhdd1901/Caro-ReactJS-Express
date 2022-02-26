import './ReceiveChallengeModal.scss';
import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ButtonAnt from '../../../components/ButtonAnt/ButtonAnt';
import { loginStateType, userType } from '../../LoginPage/login.type';
import UserInfoInRoomButton from '../RoomButton/UserInfoInRoomButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { gameStateType } from '../../GamePage/game.type';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hook';
import { gameAction } from '../../GamePage/game.slice';

interface PT {
  challenger?: { user: userType; challengerSocketID: string };
  challengeTo?: { user: userType; challengerSocketID: string };
  visible: boolean;
  setVisible: (bool: boolean) => void;
}

const ReceiveChallengeModal: React.FC<PT> = ({ challenger, challengeTo, visible, setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);
  const { userID } = useSelector<RootState, loginStateType>((state) => state.loginReducer);

  return (
    <div className="receive-challenge-modal-container">
      <Modal
        footer={null}
        visible={visible}
        closable={false}
        className="login-modal rooms-page-modal online-rooms-page-modal receive-challenge-modal"
      >
        <div className="receive-challenge-modal-main">
          {challenger ? (
            <div className="receive-challenge-modal-main-challenge">
              <UserInfoInRoomButton player={1} playerOne={challenger.user} notNeedName={true} />
              {challenger?.user.displayName}.<span>challenge you</span>
            </div>
          ) : (
            <div className="receive-challenge-modal-main-challenge">
              <UserInfoInRoomButton player={1} playerOne={challengeTo?.user} notNeedName={true} />
              {challengeTo?.user.displayName}.<span>responsing</span>
              <img
                className="receive-challenge-modal-main-challenge-img"
                src="/assets/loading/user.gif"
                alt="waiting-respose"
              />
            </div>
          )}

          {challenger && (
            <div className="receive-challenge-modal-main-buttons">
              <ButtonAnt
                title="accept"
                onClick={() => {
                  socket.emit('accept-challenge', challenger.challengerSocketID, socket.id, challenger.user.id, userID);
                  dispatch(gameAction.setOpponentID(challenger.user.id));
                  dispatch(gameAction.setYouMoveFirst(true));
                  dispatch(gameAction.setPlayingRoomID(userID));
                  navigate(`/mode/online-game/${challenger.challengerSocketID}`);
                }}
              />
              <ButtonAnt
                title="refuse"
                onClick={() => {
                  setVisible(false);
                  socket.emit('refuse-challenge', challenger.challengerSocketID);
                }}
              />
            </div>
          )}

          {challengeTo && (
            <div className="receive-challenge-modal-main-buttons one-button">
              <ButtonAnt
                title="decline"
                onClick={() => {
                  setVisible(false);
                  socket.emit('decline-challenge', challengeTo.challengerSocketID);
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default memo(ReceiveChallengeModal);

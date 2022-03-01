import './ModalInGame.scss';
import React, { memo } from 'react';
import OpponentAnnounceModal from '../../../../components/OpponentAnnounceModal/OpponentAnnounceModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { gameStateType } from '../../game.type';
import { userType } from '../../../LoginPage/login.type';

interface PT {
  opponent: userType | undefined;
  isOpponentQuitAnnouncementOpen: boolean;
  setOpponentQuitAnnouncementOpen: (bool: boolean) => void;
  isOneMoreAnnoucementOn: boolean;
  setOneMoreAnnoucementOn: (bool: boolean) => void;
  isYouWin: boolean;
  setYouWannaOneMore: (str: string) => void;
  waitingOpponentResponseModal: boolean;
  setWaitingOpponentResponseModal: (bool: boolean) => void;
}

const ModalInGame: React.FC<PT> = ({
  opponent,
  isOpponentQuitAnnouncementOpen,
  setOpponentQuitAnnouncementOpen,
  isOneMoreAnnoucementOn,
  setOneMoreAnnoucementOn,
  isYouWin,
  setYouWannaOneMore,
  waitingOpponentResponseModal,
  setWaitingOpponentResponseModal,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);
  return (
    <>
      {/* Annouce your opponent quit */}
      <OpponentAnnounceModal
        opponent={opponent}
        visible={isOpponentQuitAnnouncementOpen}
        setVisible={setOpponentQuitAnnouncementOpen}
        message={
          <div>
            <div>
              <span style={{ color: '26A69A' }}>i gotta go </span>!!!
            </div>
            <div>see you next time</div>
          </div>
        }
        oneButton={true}
        onClick={() => {
          navigate('/mode/online-game');
          socket.emit('leave-online-mode');
        }}
      />
      {/* Ask one more game */}
      <OpponentAnnounceModal
        opponent={opponent}
        visible={isOneMoreAnnoucementOn}
        setVisible={setOneMoreAnnoucementOn}
        message={
          <div>
            <div>
              {isYouWin ? (
                <>
                  congratulation on <span style={{ color: '26A69A' }}>your winning</span>!!!
                </>
              ) : (
                <>
                  good game. <span style={{ color: '26A69A' }}>you are not bad</span>!!!
                </>
              )}
            </div>
            <div>try again???</div>
          </div>
        }
        oneButton={false}
        buttonOneText="yeah !!!"
        onClick={() => {
          setYouWannaOneMore('agree');
          setOneMoreAnnoucementOn(false);
          if (!waitingOpponentResponseModal) setWaitingOpponentResponseModal(true);
          socket.emit('agree-one-more', params.socketID);
        }}
        onSecondButtonClick={() => {
          navigate('/mode/online-game');
          socket.emit('leave-online-mode');
        }}
      />
      {/* Waiting your opponent responding your one-more request */}
      <OpponentAnnounceModal
        opponent={opponent}
        visible={waitingOpponentResponseModal}
        setVisible={setWaitingOpponentResponseModal}
        message={
          <div>
            <div>
              waiting your opponent <span style={{ color: '26A69A' }}>responding</span>!!!
            </div>
          </div>
        }
        oneButton={true}
        buttonOneText="quit"
        onClick={() => {
          navigate('/mode/online-game');
          socket.emit('leave-online-mode');
        }}
      />
    </>
  );
};

export default memo(ModalInGame);

import '../ModePage/ModePage.scss';
import './OnlineRoomPage.style.scss';

import React, { memo } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Tabs } from 'antd';
import RoomButton from './RoomButton/RoomButton';
import { useAppDispatch } from '../../hook';
import { getAllOnlineRoom } from './onlineRoom.slice';
import { ROOM_TAB_LIST } from '../../config';
import ButtonWithImage from '../../components/ButtonWithImage/ButtonWithImage';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import { onlineRoomType } from './onlineRoom.type';
import ReceiveChallengeModal from './ReceiveChallengeModal/ReceiveChallengeModal';
import { userType } from '../LoginPage/login.type';
import Annoucements from './Annoucements/Annoucements';

interface PT {
  onChoseRoomTab: (str: string) => void;
  isLoadingGetRoom: boolean;
  setLoadingGetRoom: (bool: boolean) => void;
  tab: string;
  onGetAllRoomsSuccess: (data: onlineRoomType[]) => void;
  onGetAllRoomsError: () => void;
  allOnlineRooms: onlineRoomType[];
  userID: string;
  challenger: { user: userType; challengerSocketID: string } | null;
  challengeTo: { user: userType; challengerSocketID: string } | null;
  setChallengeTo: (data: { user: userType; challengerSocketID: string }) => void;
  visibleChallenger: boolean;
  visibleChallengeTo: boolean;
  setVisibleChallenger: (bool: boolean) => void;
  setVisibleChallengeTo: (bool: boolean) => void;
  visibleAnnouceRefuse: boolean;
  setVisibleAnnouceRefuse: (bool: boolean) => void;
  visibleAnnouceDecline: boolean;
  setVisibleAnnouceDecline: (bool: boolean) => void;
}

const OnlineRoomPage: React.FC<PT> = ({
  onChoseRoomTab,
  isLoadingGetRoom,
  setLoadingGetRoom,
  tab,
  onGetAllRoomsSuccess,
  onGetAllRoomsError,
  allOnlineRooms,
  userID,
  challenger,
  setChallengeTo,
  challengeTo,
  visibleChallenger,
  visibleChallengeTo,
  setVisibleChallenger,
  setVisibleChallengeTo,
  visibleAnnouceRefuse,
  setVisibleAnnouceRefuse,
  visibleAnnouceDecline,
  setVisibleAnnouceDecline,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="background-container rooms-page-container online-rooms-page-container">
      <Modal
        footer={null}
        visible={true}
        closable={false}
        className="login-modal rooms-page-modal online-rooms-page-modal"
      >
        <Header title="waiting room" />

        <div className="online-rooms-page-modal-tabs">
          <Tabs defaultActiveKey={ROOM_TAB_LIST[0]} onChange={onChoseRoomTab}>
            {ROOM_TAB_LIST.map((a) => (
              <Tabs.TabPane tab={a} key={a} />
            ))}
          </Tabs>

          <div className="online-rooms-page-modal-tabs-back-buttons">
            <ButtonWithImage
              onClick={() => {
                setLoadingGetRoom(true);
                dispatch(getAllOnlineRoom(tab, onGetAllRoomsSuccess, onGetAllRoomsError));
              }}
              fontAwesomeCpn={<i className="fa-solid fa-arrow-rotate-right"></i>}
            />
            <ButtonWithImage
              onClick={() => {
                navigate('/mode');
              }}
              fontAwesomeCpn={<i className="fa-solid fa-right-to-bracket"></i>}
            />
          </div>
        </div>

        <div className="login-modal-form">
          <div className="login-modal-form-buttons">
            {isLoadingGetRoom ? (
              <LoadingPage />
            ) : allOnlineRooms.length !== 0 ? (
              allOnlineRooms.map((a) => (
                <RoomButton
                  key={a.id}
                  roomInfo={a}
                  userID={userID}
                  setChallengeTo={setChallengeTo}
                  setVisibleChallengeTo={setVisibleChallengeTo}
                />
              ))
            ) : (
              <div className="annouce-empty">
                <div>
                  ask your friends to <span className="annouce-empty-special">come</span> and{' '}
                  <span className="annouce-empty-special">chill</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {challenger && (
        <ReceiveChallengeModal challenger={challenger} visible={visibleChallenger} setVisible={setVisibleChallenger} />
      )}
      {challengeTo && (
        <ReceiveChallengeModal
          challengeTo={challengeTo}
          visible={visibleChallengeTo}
          setVisible={setVisibleChallengeTo}
        />
      )}
      {challengeTo && (
        <Annoucements
          challenger={challengeTo.user}
          visible={visibleAnnouceRefuse}
          setVisible={setVisibleAnnouceRefuse}
          text={
            <>
              {challengeTo.user.displayName}.<span>refused your challenge !!!</span>
            </>
          }
        />
      )}
      {challenger && (
        <Annoucements
          challenger={challenger.user}
          visible={visibleAnnouceDecline}
          setVisible={setVisibleAnnouceDecline}
          text={
            <>
              {challenger.user.displayName}.<span>declined !!!</span>
            </>
          }
        />
      )}
    </div>
  );
};

export default memo(OnlineRoomPage);

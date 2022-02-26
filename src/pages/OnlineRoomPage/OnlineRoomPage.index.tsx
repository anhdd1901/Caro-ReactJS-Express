import '../ModePage/ModePage.scss';
import View from './OnlineRoomPage.view';

import React, { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hook';
import { getAllOnlineRoom } from './onlineRoom.slice';
import { onlineRoomType } from './onlineRoom.type';
import { ErrorMessage } from '../../components/Message';
import { ROOM_TAB_LIST } from '../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { loginStateType, userType } from '../LoginPage/login.type';
import { gameStateType } from '../GamePage/game.type';
import { useLocation, useNavigate } from 'react-router-dom';
import { gameAction } from '../GamePage/game.slice';

const OnlineRoomPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [challenger, setChallenger] = useState<{ user: userType; challengerSocketID: string } | null>(null);
  const [newChallenger, setNewChallenger] = useState<{ user: userType; challengerSocketID: string } | null>(null);
  const [challengeTo, setChallengeTo] = useState<{ user: userType; challengerSocketID: string } | null>(null);
  const [allOnlineRooms, setAllOnlineRooms] = useState<onlineRoomType[]>([]);
  const [tab, setTab] = useState<string>(ROOM_TAB_LIST[0]);
  const [isLoadingGetRoom, setLoadingGetRoom] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<onlineRoomType | null>(null);
  const [delRoom, setDelRoom] = useState<string>('');
  const [visibleChallenger, setVisibleChallenger] = useState<boolean>(false);
  const [visibleChallengeTo, setVisibleChallengeTo] = useState<boolean>(false);
  const [visibleAnnouceRefuse, setVisibleAnnouceRefuse] = useState<boolean>(false);
  const [visibleAnnouceDecline, setVisibleAnnouceDecline] = useState<boolean>(false);
  const [challengerJoinedRoom, setChallengerJoinedRoom] = useState<string>('');
  const [changedRoom, setChangedRoom] = useState<string>('');
  const { username, userID } = useSelector<RootState, loginStateType>((state) => state.loginReducer);
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);

  // Connect socket event
  useEffect(() => {
    if (socket) {
      // Connect
      if (location.pathname === '/mode/online-game') {
        socket.emit('enter-online-mode');
      }

      // New user join online mode => create new room
      socket.on('new-room', (result: { user: userType; socketRoomID: string }) => {
        if (result.user.username !== username)
          setNewRoom({
            id: result.user.id,
            socketRoomID: result.socketRoomID,
            playerOne: result.user,
            table: [],
          });
      });

      // User leave online mode => delete room
      socket.on('delete-room', (result: any) => {
        setDelRoom(result.idRoom);
      });

      // Receive challenge
      socket.on('receive-challenge', (result: any) => {
        setNewChallenger({ user: result.challenger, challengerSocketID: result.challengerSocketID });
      });

      // Receive refuse challenge
      socket.on('receive-refuse-challenge', () => {
        setVisibleChallengeTo(false);
        setVisibleAnnouceRefuse(true);
      });

      // Receive decline challenge
      socket.on('receive-decline-challenge', () => {
        setVisibleChallenger(false);
        setVisibleAnnouceDecline(true);
      });

      // Receive accept challenge
      socket.on('receive-accept-challenge', (roomSocketID: any, roomID: any) => {
        dispatch(gameAction.setPlayingRoomID(roomID));
        dispatch(gameAction.setYouMoveFirst(false));
        navigate(`/mode/online-game/${roomSocketID}`);
      });

      // Chage room status
      socket.on('one-room-full', (challengerSocketID: any, roomSocketID: any) => {
        if (location.pathname === '/mode/online-game') {
          setChallengerJoinedRoom(challengerSocketID);
          setChangedRoom(roomSocketID);
        }
      });
    }
  }, [socket]);

  // User join room => Change room status
  useEffect(() => {
    if (challengerJoinedRoom && changedRoom) {
      const challenger = allOnlineRooms.filter((a) => a.socketRoomID === challengerJoinedRoom)[0].playerOne;
      let changedStatusRoom = allOnlineRooms.filter((a) => a.socketRoomID === changedRoom)[0];
      changedStatusRoom = { ...changedStatusRoom, playerTwo: challenger };
      let updatedRooms = allOnlineRooms
        .filter((a) => a.socketRoomID !== challengerJoinedRoom)
        .filter((a) => a.socketRoomID !== changedRoom);
      updatedRooms = [...updatedRooms, changedStatusRoom];
      setAllOnlineRooms(updatedRooms);

      setChallengerJoinedRoom('');
      setChangedRoom('');
    }
  }, [challengerJoinedRoom, allOnlineRooms, changedRoom]);

  // Receive challenge
  useEffect(() => {
    if (newChallenger) {
      if (!visibleChallengeTo && !visibleChallenger) {
        setChallenger(newChallenger);
        setVisibleChallenger(true);
      } else {
        socket.emit('refuse-challenge', newChallenger.challengerSocketID);
      }
      setNewChallenger(null);
    }
  }, [newChallenger, visibleChallengeTo, visibleChallenger]);

  // Add new room
  useEffect(() => {
    if (newRoom) {
      setAllOnlineRooms([...allOnlineRooms, newRoom]);
      setNewRoom(null);
    }
  }, [newRoom, allOnlineRooms]);

  // Delete room
  useEffect(() => {
    if (delRoom) {
      setAllOnlineRooms(allOnlineRooms.filter((a) => a.id !== delRoom));
      if (visibleChallenger) {
        setVisibleChallenger(false);
        setVisibleAnnouceDecline(true);
      }
      if (visibleChallengeTo) {
        setVisibleChallengeTo(false);
        setVisibleAnnouceRefuse(true);
      }
      setDelRoom('');
    }
  }, [delRoom, allOnlineRooms]);

  // Get all online rooms
  const onGetAllRoomsSuccess = (data: onlineRoomType[]) => {
    setAllOnlineRooms(data.filter((a) => a.id !== userID));
    setLoadingGetRoom(false);
  };

  const onGetAllRoomsError = () => {
    ErrorMessage('Failed: Get all online rooms');
    setLoadingGetRoom(false);
  };

  useEffect(() => {
    setLoadingGetRoom(true);
    dispatch(getAllOnlineRoom(tab, onGetAllRoomsSuccess, onGetAllRoomsError));
  }, [tab]);

  const onChoseRoomTab = (selectedTab: string) => {
    if (!isLoadingGetRoom) setTab(selectedTab);
  };

  return (
    <View
      onChoseRoomTab={onChoseRoomTab}
      setLoadingGetRoom={setLoadingGetRoom}
      tab={tab}
      onGetAllRoomsSuccess={onGetAllRoomsSuccess}
      onGetAllRoomsError={onGetAllRoomsError}
      isLoadingGetRoom={isLoadingGetRoom}
      allOnlineRooms={allOnlineRooms}
      userID={userID}
      challenger={challenger}
      setChallengeTo={setChallengeTo}
      challengeTo={challengeTo}
      visibleChallenger={visibleChallenger}
      visibleChallengeTo={visibleChallengeTo}
      setVisibleChallenger={setVisibleChallenger}
      setVisibleChallengeTo={setVisibleChallengeTo}
      visibleAnnouceRefuse={visibleAnnouceRefuse}
      setVisibleAnnouceRefuse={setVisibleAnnouceRefuse}
      visibleAnnouceDecline={visibleAnnouceDecline}
      setVisibleAnnouceDecline={setVisibleAnnouceDecline}
    />
  );
};

export default memo(OnlineRoomPage);

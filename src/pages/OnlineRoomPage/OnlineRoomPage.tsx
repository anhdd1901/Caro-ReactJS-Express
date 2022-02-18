import '../ModePage/ModePage.scss';
import './OnlineRoomPage.scss';

import React, { memo, useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Tabs } from 'antd';
import RoomButton from './RoomButton/RoomButton';
import { useAppDispatch } from '../../hook';
import { getAllOnlineRoom } from './onlineRoom.slice';
import { onlineRoomType } from './onlineRoom.type';
import { ErrorMessage } from '../../components/Message';
import { ROOM_TAB_LIST } from '../../config';

const OnlineRoomPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allOnlineRooms, setAllOnlineRooms] = useState<onlineRoomType[]>([]);
  const [tab, setTab] = useState<string>(ROOM_TAB_LIST[0]);

  useEffect(() => {
    dispatch(getAllOnlineRoom(tab, onGetAllRoomsSuccess, onGetAllRoomsError));
  }, [tab]);

  const onGetAllRoomsSuccess = (data: onlineRoomType[]) => {
    setAllOnlineRooms(data);
  };

  const onGetAllRoomsError = () => {
    ErrorMessage('Failed: Get all online rooms');
  };

  const onChoseRoomTab = (selectedTab: string) => {
    setTab(selectedTab);
  };

  return (
    <div className="background-container rooms-page-container online-rooms-page-container">
      <Modal
        footer={null}
        visible={true}
        closable={false}
        className="login-modal rooms-page-modal online-rooms-page-modal"
      >
        <Header title="chose mode" />

        <div className="online-rooms-page-modal-tabs">
          <Tabs defaultActiveKey={ROOM_TAB_LIST[0]} onChange={onChoseRoomTab}>
            {ROOM_TAB_LIST.map((a) => (
              <Tabs.TabPane tab={a} key={a} />
            ))}
          </Tabs>

          <div
            className="online-rooms-page-modal-tabs-back-button"
            onClick={() => {
              navigate('/room');
            }}
          >
            <i className="fa-solid fa-right-to-bracket"></i>
          </div>
        </div>

        <div className="login-modal-form">
          <div className="login-modal-form-buttons">
            {allOnlineRooms.map((a) => (
              <RoomButton key={a.id} roomInfo={a} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default memo(OnlineRoomPage);

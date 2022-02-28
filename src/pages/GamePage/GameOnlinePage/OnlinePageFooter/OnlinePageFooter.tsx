import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonAnt from '../../../../components/ButtonAnt/ButtonAnt';
import OpponentAnnounceModal from '../../../../components/OpponentAnnounceModal/OpponentAnnounceModal';
import { RootState } from '../../../../store';
import { userType } from '../../../LoginPage/login.type';
import { gameStateType } from '../../game.type';

interface PT {
  opponent: userType | undefined;
}

const OnlinePageFooter: React.FC<PT> = ({ opponent }) => {
  const navigate = useNavigate();
  const { socket } = useSelector<RootState, gameStateType>((state) => state.gameReducer);
  const [visibleOpponentAnnoucement, setVisibleOpponentAnnoucement] = useState<boolean>(false);

  return (
    <div className="login-modal-form-buttons">
      <ButtonAnt
        title="give up & back"
        onClick={() => {
          setVisibleOpponentAnnoucement(true);
        }}
      />
      <OpponentAnnounceModal
        onClick={() => {
          setVisibleOpponentAnnoucement(false);
          navigate('/mode/online-game');
          socket.emit('leave-online-mode');
        }}
        opponent={opponent}
        visible={visibleOpponentAnnoucement}
        setVisible={setVisibleOpponentAnnoucement}
        message={
          <div>
            <div>are you sure?</div>
            <div>
              winner <span style={{ color: '26A69A' }}>never</span> quit. quiter{' '}
              <span style={{ color: '26A69A' }}>never</span> win
            </div>
          </div>
        }
      />
    </div>
  );
};

export default memo(OnlinePageFooter);

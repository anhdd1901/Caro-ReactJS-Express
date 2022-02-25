import React, { memo, useState } from 'react';
import ButtonAnt from '../../../components/ButtonAnt/ButtonAnt';
import OpponentAnnounceModal from '../../../components/OpponentAnnounceModal/OpponentAnnounceModal';
import { userType } from '../../LoginPage/login.type';

interface PT {
  opponent: userType | undefined;
}

const OnlinePageFooter: React.FC<PT> = ({ opponent }) => {
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

import '../LoginPage/LoginPage.style.scss';
import './SignUpPage.style.scss';
import View from './SignUpPage.view';

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { signUp } from './signUp.slice';
import { ErrorMessage, SuccessMessage } from '../../components/Message';
import { signUpResType } from './signUp.type';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessUsername, setErrorMessUsername] = useState<string>('');
  const [errorMessPassword, setErrorMessPassword] = useState<string>('');
  const [isLoadingHandleSignUp, setLoadingHandleSignUp] = useState<boolean>(false);

  const onSignUp = () => {
    if (!isLoadingHandleSignUp) {
      if (!username.trim() || !password.trim()) {
        if (!username.trim()) {
          setErrorMessUsername('Please type your username');
          setUsername(username.trim());
        } else setErrorMessUsername('');
        if (!password.trim()) {
          setErrorMessPassword('Please type your password');
          setPassword(password.trim());
        } else setErrorMessPassword('');
      } else {
        setErrorMessUsername('');
        setErrorMessPassword('');
        setLoadingHandleSignUp(true);
        dispatch(signUp(username.trim(), password.trim(), onSignUpSuccess, onSignUpError));
      }
    }
  };

  const onSignUpSuccess = (data: signUpResType) => {
    if (data.errorMess) {
      ErrorMessage(data.errorMess);
      setLoadingHandleSignUp(false);
    } else {
      SuccessMessage('Sign-up successfully!');
      setLoadingHandleSignUp(false);
      navigate('/');
    }
  };

  const onSignUpError = () => {
    ErrorMessage('Failed: Sign-up');
    setLoadingHandleSignUp(false);
  };

  return (
    <View
      username={username}
      password={password}
      errorMessUsername={errorMessUsername}
      errorMessPassword={errorMessPassword}
      setUsername={setUsername}
      setPassword={setPassword}
      onSignUp={onSignUp}
      isLoadingHandleSignUp={isLoadingHandleSignUp}
    />
  );
};

export default memo(SignUp);

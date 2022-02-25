import './LoginPage.style.scss';
import View from './LoginPage.view';
import { useAppDispatch } from '../../hook';
import { ErrorMessage, SuccessMessage } from '../../components/Message';
import { login, loginAction } from './login.slice';

import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginResType } from './login.type';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessUsername, setErrorMessUsername] = useState<string>('');
  const [errorMessPassword, setErrorMessPassword] = useState<string>('');
  const [isLoadingHandleLogin, setLoadingHandleLogin] = useState<boolean>(false);

  const onLogin = () => {
    if (!isLoadingHandleLogin) {
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
        setLoadingHandleLogin(true);
        setErrorMessUsername('');
        setErrorMessPassword('');
        dispatch(login(username.trim(), password.trim(), onLoginSuccess, onLoginError));
      }
    }
  };

  const onLoginSuccess = (data: loginResType) => {
    if (data.errorMess) {
      setLoadingHandleLogin(false);
      ErrorMessage(data.errorMess);
    } else if (!data.token) {
      ErrorMessage(`Failed: Get login token: ${data.token}`);
      setLoadingHandleLogin(false);
    } else {
      setLoadingHandleLogin(false);
      SuccessMessage('Welcome to .Caro.Game!');
      dispatch(loginAction.setUsername(data.username ? data.username : ''));
      dispatch(loginAction.setUserID(data.userID ? data.userID : ''));
      sessionStorage.setItem('token', data.token);
      navigate('/mode');
    }
  };

  const onLoginError = () => {
    ErrorMessage('Failed: Log in');
    setLoadingHandleLogin(false);
  };

  return (
    <View
      onLogin={onLogin}
      username={username}
      password={password}
      errorMessUsername={errorMessUsername}
      errorMessPassword={errorMessPassword}
      setUsername={setUsername}
      setPassword={setPassword}
      isLoadingHandleLogin={isLoadingHandleLogin}
    />
  );
};

export default memo(LoginPage);

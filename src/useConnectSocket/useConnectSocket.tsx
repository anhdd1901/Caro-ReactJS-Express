import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useConnectSocket = () => {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : '';
  const [isConnected, setConnected] = useState(false);
  const [client, setClient] = useState<Socket>();

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Todo: Init socket client
    if (!isConnected) {
      const client = io(baseURL ? baseURL : '', {
        timeout: 5000,
        extraHeaders: {
          auth: token ? token : '',
        },
      });

      // Todo: Listen events
      setClient(client);
      client.on('connect', () => {
        setConnected(true);
      });

      client.on('disconnect', () => {
        setConnected(false);
      });

      return () => {
        client.disconnect();
      };
    }
  }, [token]);

  return { isConnected, client };
};

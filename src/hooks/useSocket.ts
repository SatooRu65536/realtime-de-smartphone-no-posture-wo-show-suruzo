import { EventName, listen } from '@tauri-apps/api/event';
import { useEffect, useRef } from 'react';

export type SocketState = 'Started' | 'Connected' | 'Disconnected' | 'Received' | 'Error';
type recvHandler = (state: SocketState, data: string) => void;

type SocketEvent = {
  payload: {
    state: SocketState;
    data: string;
  };
};

export const useSocket = (handler: recvHandler, event: EventName = 'socket') => {
  const isListening = useRef(false);

  useEffect(() => {
    if (isListening.current) return;
    isListening.current = true;

    (async () => {
      console.log('Listening to socket events');
      const unlisten = await listen(event, (event: SocketEvent) => {
        handler(event.payload.state, event.payload.data);
      });

      return () => {
        unlisten();
        isListening.current = false;
      };
    })();
  }, []);
};

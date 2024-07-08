import { useEffect, useState } from 'react';

type CallBack = (data: unknown) => void;

export const useWS = (url: string, callBack: CallBack) => {
  const [ws, setWS] = useState(() => new WebSocket(url));

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      callBack(data);
    };

    return () => {
      ws.close();
    };
  }, []);

  function send<T>(data: T): boolean {
    if (ws.readyState !== ws.OPEN) return false;

    ws.send(JSON.stringify(data));
    return true;
  }

  function reConnect() {
    setWS(new WebSocket(url));
  }

  return { send, reConnect } as const;
};

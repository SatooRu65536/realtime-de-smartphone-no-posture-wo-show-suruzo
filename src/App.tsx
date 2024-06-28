import { SocketData, SocketState, useSocket } from "./hooks/useSocket";

export default function App() {
  const handler = (state: SocketState, data: SocketData) => {
    console.log(state, data);
  }

  useSocket(handler);

  return <main>Hello</main>;
}

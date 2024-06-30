import styled from 'styled-components';
import Player from './components/Player';
import { useArray } from './hooks/useArray';
import { SocketState, useSocket } from './hooks/useSocket';
import { Sensor, tryParseSensor } from './schema/sensor';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

export default function App() {
  const [state, { push }] = useArray<Sensor>([], 10);

  useSocket((_: SocketState, data: string) => {
    const sensor = tryParseSensor(data);
    if (!sensor) return;

    push(sensor);
  });

  return (
    <Main>
      <Player />
    </Main>
  );
}

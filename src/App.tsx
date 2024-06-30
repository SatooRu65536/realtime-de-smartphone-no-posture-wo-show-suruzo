import styled from 'styled-components';
import Player from './components/Player';
import { useArray } from './hooks/useArray';
import { SocketState, useSocket } from './hooks/useSocket';
import { Sensor, tryParseSensor } from './schema/sensor';
import { useRotation } from './hooks/useRotation';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

export default function App() {
  const [_sensorValues, { push }] = useArray<Sensor>([], 10);
  const [rotation, { setRotation: _setRotation }] = useRotation([0, 0, 0]);

  useSocket((state: SocketState, data: string) => {
    if (state !== 'Received') return;

    const sensor = tryParseSensor(data);
    if (!sensor) return;

    push(sensor);
  });

  return (
    <Main>
      <Player rotation={rotation} />
    </Main>
  );
}

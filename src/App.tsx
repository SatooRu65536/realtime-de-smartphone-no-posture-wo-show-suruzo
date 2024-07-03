import styled from 'styled-components';
import Player from './components/Player';
import { useArray } from './hooks/useArray';
import { SocketState, useSocket } from './hooks/useSocket';
import { Sensor, tryParseSensor } from './schema/sensor';
import { useRotation } from './hooks/useRotation';
import { estimatePoseBymutualFilter } from './util/filters';

const Main = styled.main`
  height: 100vh;
  width: 100vw;
`;

export default function App() {
  const [sensorValues, { push }] = useArray<Sensor>([], (s, arr) => (arr.at(-1)?.timestamp ?? 0) - s.timestamp < 1);
  const [rotation, setRotation] = useRotation([0, 0, 0]);

  useSocket((state: SocketState, data: string) => {
    if (state !== 'Received') return;

    const sensor = tryParseSensor(data);
    if (!sensor) return;

    push(sensor);
  });

  const newRot = estimatePoseBymutualFilter(rotation, sensorValues, 0.05);
  setRotation(newRot);

  return (
    <Main>
      <Player rotation={newRot} />
    </Main>
  );
}

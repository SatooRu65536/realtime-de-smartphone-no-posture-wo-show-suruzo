import { useArray } from './hooks/useArray';
import { SocketState, useSocket } from './hooks/useSocket';
import { Sensor, tryParseSensor } from './schema/sensor';

export default function App() {
  const [state, { push }] = useArray<Sensor>([], 10);

  useSocket((_: SocketState, data: string) => {
    const sensor = tryParseSensor(data);
    if (!sensor) return;

    push(sensor);
  });

  return (
    <main>
      {state.map((sensor, i) => (
        <p key={i}>{JSON.stringify(sensor)}</p>
      ))}
    </main>
  );
}

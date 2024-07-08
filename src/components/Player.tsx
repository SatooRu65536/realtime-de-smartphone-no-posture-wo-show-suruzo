import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import RotateModel from './RotateModel';

export default function Player() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }} shadows>
      <Stage adjustCamera={false} shadows={false}>
        <RotateModel />
        <ambientLight intensity={1} />
        <gridHelper args={[20, 20, 0xff0000]} />
      </Stage>
    </Canvas>
  );
}

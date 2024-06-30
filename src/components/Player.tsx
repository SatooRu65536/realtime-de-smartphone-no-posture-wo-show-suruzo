import { Canvas } from '@react-three/fiber';
import MobileModel from './MobileModel';
import { Stage } from '@react-three/drei';

export default function Player() {
  return (
    <Canvas camera={{ position: [3, 3, 3] }} shadows>
      <Stage adjustCamera={false} shadows={false}>
        <MobileModel src="/models/mobile.glb" />
        <ambientLight intensity={1} />
        <gridHelper args={[20, 20, 0xff0000]} />
      </Stage>
    </Canvas>
  );
}

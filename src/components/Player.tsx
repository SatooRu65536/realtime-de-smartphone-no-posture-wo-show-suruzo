import { Canvas } from '@react-three/fiber';
import MobileModel from './MobileModel';
import { Stage } from '@react-three/drei';
import { Quaternion } from 'three';

interface Props {
  rotation: Quaternion;
}

export default function Player({ rotation }: Props) {
  return (
    <Canvas camera={{ position: [3, 3, 3] }} shadows>
      <Stage adjustCamera={false} shadows={false}>
        <MobileModel src="/models/mobile.glb" rotation={rotation} />
        <ambientLight intensity={1} />
        <gridHelper args={[20, 20, 0xff0000]} />
      </Stage>
    </Canvas>
  );
}

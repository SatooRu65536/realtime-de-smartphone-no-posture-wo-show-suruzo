import { useGLTF } from '@react-three/drei';
import { type Quaternion } from 'three';

interface Props {
  quaternion: Quaternion;
  src: string;
}

export default function MobileModel({ quaternion, src }: Props) {
  const { scene } = useGLTF(src);

  return (
    <mesh scale={10} quaternion={quaternion}>
      <primitive object={scene} />
    </mesh>
  );
}

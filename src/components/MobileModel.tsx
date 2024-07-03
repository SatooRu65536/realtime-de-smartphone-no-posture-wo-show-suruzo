import { useGLTF } from '@react-three/drei';
import { Euler, type Quaternion } from 'three';

interface Props {
  rotation: Quaternion;
  src: string;
}

export default function MobileModel({ rotation, src }: Props) {
  const { scene } = useGLTF(src);
  const euler = new Euler();
  euler.setFromQuaternion(rotation);

  return (
    <mesh scale={10} rotation={[-euler.x, -euler.z, -euler.y]}>
      <primitive object={scene} />
    </mesh>
  );
}

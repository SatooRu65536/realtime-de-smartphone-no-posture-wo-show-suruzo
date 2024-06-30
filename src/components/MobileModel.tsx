import { useGLTF } from '@react-three/drei';

interface Props {
  src: string;
}

export default function MobileModel({ src }: Props) {
  const { scene } = useGLTF(src);

  return (
    <mesh scale={10}>
      <primitive object={scene} />
    </mesh>
  );
}

import MobileModel from './MobileModel';
import { useQuats } from '@/hooks/useQuats';

const { VITE_WS_BASE_URL } = import.meta.env;
const WS_URL = new URL('/ws/posture', VITE_WS_BASE_URL);

export default function RotateModel() {
  const quat = useQuats(WS_URL);

  return <MobileModel src="/models/mobile.glb" quaternion={quat} />;
}

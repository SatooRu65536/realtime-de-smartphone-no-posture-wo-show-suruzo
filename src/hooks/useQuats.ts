import { Quat, quatResponseSchema } from '@/schema/sensor';
import { useWS } from './useWS';
import { useMemo, useState } from 'react';
import { Quaternion } from 'three';

export const useQuats = (url: URL) => {
  const [quaternion, setQuaternion] = useState<Quat>([0, 0, 0, 0]);

  useWS(url.href, (data) => {
    const isValid = quatResponseSchema.safeParse(data);
    if (!isValid.success) return;

    setQuaternion(isValid.data.quaternions[0]);
  });

  const qut = useMemo(() => {
    const [x, y, z, w] = quaternion;
    return new Quaternion().fromArray([y, -x, z, w]);
  }, [quaternion]);

  return qut;
};

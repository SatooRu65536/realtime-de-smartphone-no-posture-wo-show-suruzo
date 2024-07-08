import { Quat, quatResponseSchema } from '@/schema/sensor';
import { useArray } from './useArray';
import { useWS } from './useWS';
import { useEffect, useMemo, useState } from 'react';
import { Quaternion } from 'three';

export const useQuats = (url: URL, intervalTime = 1000 / 60) => {
  const [quats, { set }] = useArray<Quat>();
  const [quaternion, setQuaternion] = useState<Quat>([0, 0, 0, 0]);

  useWS(url.href, (data) => {
    const isValid = quatResponseSchema.safeParse(data);
    if (!isValid.success) return;

    // set(isValid.data.quaternions);
    setQuaternion(isValid.data.quaternions[0]);
  });

  useEffect(() => {
    const clonedQuats = structuredClone(quats);

    const interval = setInterval(() => {
      const quat = clonedQuats.pop();
      if (!quat) return;

      setQuaternion(quat);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [quats]);

  const qut = useMemo(() => {
    const [x, y, z, w] = quaternion;
    return new Quaternion().fromArray([y, -x, z, w]);
  }, [quaternion]);

  return qut;
};

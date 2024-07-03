import { useRef } from 'react';
import { Euler, MathUtils, Quaternion } from 'three';

export type Rotation = [number, number, number];

export const useRotation = (initRot: Rotation = [0, 0, 0]) => {
  const rotate = useRef(new Quaternion().setFromEuler(new Euler(...initRot.map((r) => MathUtils.degToRad(r)))));

  function setRotation(quaternion: Quaternion) {
    rotate.current = quaternion;
  }

  return [rotate.current, setRotation] as const;
};

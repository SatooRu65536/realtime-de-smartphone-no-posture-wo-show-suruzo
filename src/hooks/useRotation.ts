import { useState } from 'react';
import { Euler, MathUtils, Quaternion } from 'three';

export type Rotation = [number, number, number];

export const useRotation = (initRot: Rotation = [0, 0, 0]) => {
  const [currentRot, setCurrentRot] = useState(toQuaternion(initRot));

  /**
   * 回転を設定する
   * @param xDeg
   * @param yDeg
   * @param zDeg
   */
  const setRotation = (xDeg: number, yDeg: number, zDeg: number) => {
    const targetQuaternion = toQuaternion([xDeg, yDeg, zDeg]);
    setCurrentRot(targetQuaternion);
  };

  return [currentRot, { setRotation }] as const;
};

function toQuaternion(rotation: Rotation) {
  const euler = new Euler(
    MathUtils.degToRad(rotation[0]),
    MathUtils.degToRad(rotation[1]),
    MathUtils.degToRad(rotation[2]),
  );
  return new Quaternion().setFromEuler(euler);
}

import { Euler, MathUtils, Quaternion } from 'three';
import { Sensor, SensorData } from '../schema/sensor';

/**
 * 相互フィルターで姿勢推定を行う
 */
export const estimatePoseBymutualFilter = (currentRot: Quaternion, sensorValues: Sensor[], threshold = 1) => {
  const norms = sensorValues.map((sensor) => toNorm(sensor.accelerometer));
  // 合計
  const normSum = norms.reduce((acc, norm) => acc + norm, 0);
  // 平均
  const normAverage = normSum / norms.length;
  // 分散
  const normVar = norms.reduce((acc, norm) => acc + (norm - normAverage) ** 2, 0) / norms.length;

  const lastData = sensorValues.at(-1);
  if (!lastData) console.log('no data');
  if (!lastData) return currentRot;

  const frameRate = sensorValues.length / (lastData.timestamp - sensorValues[0].timestamp);

  console.log(Date.now());
  if (normVar > threshold) {
    // 動いている場合
    const { x, y, z } = lastData.gyroscope;
    const delta = new Quaternion().setFromEuler(
      new Euler(
        0,// MathUtils.degToRad(x / frameRate),
        MathUtils.degToRad(y / frameRate),
        0,// MathUtils.degToRad(z / frameRate),
      ),
    );
    const newRot = currentRot.clone().multiply(delta);

    return newRot.normalize();
  } else {
    // 動いていない場合
    const { x, y, z } = lastData.accelerometer;
    const gravity = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    const pitch = Math.asin(-x / gravity);
    const roll = Math.asin(-y / gravity);
    const yaw = Math.asin(-z / gravity);

    const newRot = new Quaternion().setFromEuler(new Euler(pitch, roll, yaw));
    return newRot.normalize();
  }
};

/**
 * ノルムを計算する
 * @param accelerometer 加速度
 * @returns ノルム
 */
const toNorm = (accelerometer: SensorData) => {
  const { x, y, z } = accelerometer;
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
};

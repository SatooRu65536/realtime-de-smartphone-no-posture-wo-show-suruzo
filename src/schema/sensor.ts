import { z } from 'zod';

/**
 * センサーデータのスキーマ
 */
export const SensorSchema = z.object({
  timestamp: z.number(),
  accelerometer: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  gyroscope: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
});

/**
 * センサーデータ型
 */
export type Sensor = z.infer<typeof SensorSchema>;

/**
 * センサーデータをパースする
 * @param data センサーデータ
 * @returns パースされたセンサーデータ
 */
export function tryParseSensor(data: string): Sensor | null {
  try {
    const parsedData = JSON.parse(data);
    const sensor = SensorSchema.safeParse(parsedData);

    if (sensor.success) return sensor.data;
    return null;
  } catch {
    return null;
  }
}

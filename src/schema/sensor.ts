import { z } from 'zod';

/**
 * クォータニオンのスキーマ
 */
export const quatSchema = z.tuple([z.number(), z.number(), z.number(), z.number()]);

/**
 *クォータニオンの型
 */
export type Quat = z.infer<typeof quatSchema>;

/**
 * クォータニオンのレスポンスのスキーマ
 */
export const quatResponseSchema = z.object({
  quaternions: z.array(quatSchema),
});

/**
 * クォータニオンのレスポンスの型
 */
export type QuatResponse = z.infer<typeof quatResponseSchema>;

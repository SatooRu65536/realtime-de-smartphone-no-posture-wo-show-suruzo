import { useState } from 'react';

/**
 * 配列を扱うためのカスタムフック
 * @param initialArray 初期配列
 * @param maxLength 配列の最大長
 * @returns
 */
export const useArray = <T>(initialArray: T[] = [], maxLength = -1) => {
  const [array, setArray] = useState(initialArray);

  /**
   * 配列に要素を追加する
   * @param element
   */
  const push = (element: T) => {
    setArray((prev) => {
      const clone = [...prev, element];
      if (maxLength !== -1 && prev.length >= maxLength) clone.shift();
      return clone;
    });
  };

  return [array, { push }] as const;
};

import { useState } from 'react';

type Filter<T> = (element: T, array: T[]) => boolean;

/**
 * 配列を扱うためのカスタムフック
 * @param initialArray 初期配列
 * @param maxLength 配列の最大長
 * @returns
 */
export const useArray = <T>(initialArray: T[] = [], filter?: Filter<T> | number) => {
  const [array, setArray] = useState(initialArray);

  /**
   * 配列に要素を追加する
   * @param element
   */
  const push = (element: T) => {
    setArray((prev) => {
      const clone = [...prev, element];
      if (typeof filter === 'number' && prev.length >= filter) clone.shift();
      if (typeof filter === 'function') return clone.filter((e) => filter(e, clone));
      return clone;
    });
  };

  return [array, { push }] as const;
};

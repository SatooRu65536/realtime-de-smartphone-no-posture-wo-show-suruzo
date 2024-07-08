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

  /**
   * 配列を上書きする
   */
  const set = (newArray: T[]) => {
    setArray(newArray);
  };

  /**
   * 配列の先頭から要素を取り出す
   */
  const pop = () => {
    const clone = [...array];
    const element = clone.pop();
    setArray(clone);

    return element;
  };

  return [array, { push, set, pop }] as const;
};

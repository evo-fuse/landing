import { useRef } from 'react';
import type { MutableRefObject } from 'react';

const useLazyRef = <T>(init: () => T) => {
  const lazyRef = useRef<T | undefined>(undefined);

  if (lazyRef.current == null) {
    lazyRef.current = init();
  }

  return lazyRef as MutableRefObject<T>;
};

export default useLazyRef;

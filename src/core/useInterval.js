import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }

    return undefined; // eslint-disable-line consistent-return
  }, [delay]);
}

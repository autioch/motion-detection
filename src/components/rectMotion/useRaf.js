import { useEffect, useRef } from 'react';

export default function useRaf(callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let id;

    const tick = () => {
      savedCallback.current();
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(id);
  }, []);
}

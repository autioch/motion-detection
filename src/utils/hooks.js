import { useEffect, useRef } from 'react';

export function useObserver({ callback, element }) {
  const current = element?.current;

  const observer = useRef(null);

  function observe() {
    if (current && observer.current) {
      observer.current.observe(current);
    }
  }

  useEffect(() => {
    // if we are already observing old element
    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    observer.current = new ResizeObserver(callback);
    observe();

    return () => {
      if (observer && observer.current && current) {
        observer.current.unobserve(current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
}

export function useRaf(callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let animationFrameId;

    const tick = () => {
      savedCallback.current();
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
}

export function useCanvas(drawFn) {
  const canvasRef = useRef(null);

  useRaf(() => drawFn(canvasRef.current?.getContext('2d')));

  return canvasRef;
}

export function useInterval(callback, delay) {
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

import { useEffect, useRef } from 'react';

export const useObserver = ({ callback, element }) => {
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
};

export const useCanvas = (drawFn) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId;

    const render = () => {
      drawFn(context);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFn]);

  return canvasRef;
};

export function useRaf(callback) {
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

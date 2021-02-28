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

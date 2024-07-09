import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const getWindowSize = () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
};

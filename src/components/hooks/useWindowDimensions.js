import { useState, useEffect } from 'react';

/**
 * Gets the dimensions of the global window object.
 *
 * @returns {{width: *, height: *}} The dimensions for the window
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  console.log(width, height);
  return {
    width,
    height,
  };
}

/**
 * The React hook for getting the dimensions of the current viewport window.
 *
 * @returns {{width: *, height: *}} The dimension
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    /**
     * Handles the resize of the window.
     * @returns {void}
     */
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

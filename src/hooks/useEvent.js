import { useEffect } from 'react';

export const useEvent = (event, handler) => {
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    }
  });
}
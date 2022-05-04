import { useEffect, useRef } from 'react';

export const usePrevious = (props) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = props;
  });

  return ref.current;
}
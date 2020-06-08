import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useBodyClass(): Dispatch<SetStateAction<string>> {
  const [bodyClass, setBodyClass] = useState('');

  useEffect(() => {
    document.body.className = bodyClass;

    return () => {
      document.body.className = '';
    };
  }, [bodyClass]);

  return setBodyClass;
}

export default useBodyClass;

import { useState } from 'react';
import { useEffect } from 'react';

function useShowDropdown() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleShow = (e: any) => {
    e.stopPropagation();
    setIsVisible((isVisible) => !isVisible);
  };

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setIsVisible(false);
    });
  }, []);

  return { isVisible, toggleShow, hide: () => setIsVisible(false) };
}

export default useShowDropdown;

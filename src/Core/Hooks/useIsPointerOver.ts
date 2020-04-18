import { useRef, useState, MutableRefObject, useEffect } from "react";

export const useIsPointerOver = <T extends HTMLElement | null>(initial: T): [boolean, MutableRefObject<T>] => {
  const [isPointerOver, setIsPointerOver] = useState(false);
  const ref = useRef(initial);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.onpointerover = (e) => setIsPointerOver(true);
      ref.current.onpointerleave = (e) => setIsPointerOver(false);

      return () => {
        if (ref.current !== null) {
          ref.current.onpointerover = null;
          ref.current.onpointerleave = null;
        }
      };
    }
  }, [])

  return [isPointerOver, ref];
}
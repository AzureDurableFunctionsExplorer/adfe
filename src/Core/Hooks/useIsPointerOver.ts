import { useRef, useState, MutableRefObject, useEffect } from "react";

export const useIsPointerOver = <T extends HTMLElement | null>(initial: T): [boolean, MutableRefObject<T>] => {
  const [isPointerOver, setIsPointerOver] = useState(false);
  const ref = useRef(initial);

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef !== null) {
      currentRef.onpointerover = (e) => setIsPointerOver(true);
      currentRef.onpointerleave = (e) => setIsPointerOver(false);

      return () => {
        currentRef.onpointerover = null;
        currentRef.onpointerleave = null;
      };
    }
  }, [])

  return [isPointerOver, ref];
}
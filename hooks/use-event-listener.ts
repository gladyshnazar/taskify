import { useEffect, useRef } from "react";

export function useEventListener(
  eventType: keyof WindowEventMap,
  callback: (e?: any) => void,
  element: HTMLElement | Window  = window
) {
  /* Ensures the most up-to-date version of callback function,
  preventing potential bugs with closures and capturing stale references */
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: any) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

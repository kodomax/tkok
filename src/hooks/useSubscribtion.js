import { useCallback } from 'react';

export const useSubscribtion = (eventName) => {
  const publish = useCallback(() => {
    document.dispatchEvent(new Event(eventName))
  }, []);

  const subscribe = useCallback((callback) => {
    document.addEventListener(eventName, callback);
  }, []);

  const unsubscribe = useCallback((callback) => {
    document.removeEventListener(eventName, callback);
  }, []);

  return { publish, subscribe, unsubscribe }
};
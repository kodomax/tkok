import { useEffect, useMemo } from 'react'
import { useSubscribtion } from './useSubscribtion'

export const useClearFilters = (callback) => {
  const { publish, subscribe, unsubscribe } = useSubscribtion('clearFields')

  const memoisedCallback = useMemo(() => callback, [])

  useEffect(() => {
    if (memoisedCallback) {
      subscribe(memoisedCallback)

      return () => unsubscribe(memoisedCallback);
    }
  }, [memoisedCallback])

  return { resetFilterValues: publish }
}
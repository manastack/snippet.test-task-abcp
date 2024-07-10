import { useMemo } from 'react'

type ApiListener = (...details: unknown[]) => void

type UseApiListeners = () => {
  onError: ApiListener
  onLoading: ApiListener
  onSuccess: ApiListener
}

export const useApiListeners: UseApiListeners = () =>
  useMemo(
    () => ({
      onError: (...p: unknown[]) => console.error(...p), // eslint-disable-line no-console
      onLoading: () => {},
      onSuccess: () => {},
    }),
    [],
  )

import { PropsWithChildren, ReactElement, Suspense, useMemo } from 'react'
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ApiContext } from './api.context'
import { ApiConfig } from './api-config.types'

type Props<MainQueryKey extends string> = {
  config: ApiConfig<MainQueryKey>
  options?: DefaultOptions
  queryDevtoolsEnabled?: boolean
}

export const ApiProvider = <MainQueryKey extends string>({
  children,
  config,
  options,
  queryDevtoolsEnabled = false,
}: PropsWithChildren<Props<MainQueryKey>>): null | ReactElement => {
  const value = useMemo(() => ({ config }), [config])

  const client = useMemo(() => {
    const defaultOptions: DefaultOptions = {
      mutations: {
        networkMode: 'offlineFirst',
        ...options?.mutations,
      },
      queries: {
        keepPreviousData: true,
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 30, // 30 min
        ...options?.queries,
      },
    }

    return new QueryClient({ defaultOptions })
  }, [options?.mutations, options?.queries])

  return (
    <ApiContext.Provider {...{ value }}>
      <QueryClientProvider {...{ client }}>
        {children}
        {queryDevtoolsEnabled && (
          <Suspense>
            <ReactQueryDevtools />
          </Suspense>
        )}
      </QueryClientProvider>
    </ApiContext.Provider>
  )
}

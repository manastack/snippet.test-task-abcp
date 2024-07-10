import { createContext } from 'react'

import { ApiConfig } from './api-config.types'

type ApiContextValue<MainQueryKey extends string> = {
  config: ApiConfig<MainQueryKey>
}

export const ApiContext = (<MainQueryKey extends string>() =>
  createContext<ApiContextValue<MainQueryKey>>({
    config: {} as ApiConfig<MainQueryKey>,
  }))()

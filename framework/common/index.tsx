import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ApiConfig, ApiHooks, ApiProviderContext } from './types/api'

interface ApiProviderProps {
  children: ReactNode | ReactNode[]
  config: ApiConfig
  hooks: ApiHooks
}

export const ApiContext = createContext<Partial<ApiProviderContext>>({})

export const CoreApiProvider = ({ children, config, hooks }: ApiProviderProps) => {
  const coreConfig = useMemo(
    () => ({
      fetcher: config.fetch,
      hooks,
    }),
    [config.fetch, hooks]
  )

  return <ApiContext.Provider value={coreConfig}>{children}</ApiContext.Provider>
}
export const useCoreApiProvider = () => useContext(ApiContext) as ApiProviderContext

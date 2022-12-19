import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ApiConfig, ApiProviderContext } from './types/api'
import { ApiHooks } from './types/hooks'

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
      checkoutCookie: config.checkoutCookie,
    }),
    [config.fetch, config.checkoutCookie, hooks]
  )

  return <ApiContext.Provider value={coreConfig}>{children}</ApiContext.Provider>
}
export const useCoreApiProvider = () => useContext(ApiContext) as ApiProviderContext

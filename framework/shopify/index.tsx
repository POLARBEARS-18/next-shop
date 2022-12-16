import { ReactNode } from 'react'
import { CoreApiProvider, useCoreApiProvider } from '../common'
import { getConfig } from './api/config'
import { shopifyHooks } from './hooks'

interface ShopifyApiProviderProps {
  children: ReactNode | ReactNode[]
}

const config = getConfig()

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => (
  <CoreApiProvider config={{ ...config }} hooks={shopifyHooks}>
    {children}
  </CoreApiProvider>
)

export const useApiProvider = () => useCoreApiProvider()

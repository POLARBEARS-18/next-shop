import Cookies from 'js-cookie'
import { useApiProvider } from '../../shopify'
import { ApiHooks, SWRHook } from '../types/hooks'
import { useHook, useSWRHook } from '../utils/use-hook'

export type UseCart<H extends SWRHook = SWRHook<any>> = ReturnType<H['useHook']>

export const useCart: UseCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useApiProvider()

  const fetcherWrapper: typeof hook.fetcher = (context: any) => {
    const copyContext = context
    copyContext.input.checkoutId = Cookies.get(checkoutCookie)

    return hook.fetcher(copyContext)
  }

  return useSWRHook({ ...hook, fetcher: fetcherWrapper })()
}

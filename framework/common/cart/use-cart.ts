import Cookies from 'js-cookie'
import { useApiProvider } from '../../shopify'
import { ApiHooks } from '../types/hooks'
import { useHook, useSWRHook } from '../utils/use-hook'

export const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart)
  const { checkoutCookie } = useApiProvider()

  const fetcherWrapper: typeof hook.fetcher = (context) => {
    const copyContext = context
    copyContext.input.checkoutId = Cookies.get(checkoutCookie)

    return hook.fetcher(context)
  }

  return useSWRHook({ ...hook, fetcher: fetcherWrapper })
}

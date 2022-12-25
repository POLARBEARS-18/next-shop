import { useMemo } from 'react'
import { UseCart, useCart } from '../../common/cart/use-cart'
import { Cart } from '../../common/types/cart'
import { SWRHook } from '../../common/types/hooks'
import { Checkout } from '../schema'
import { checkoutToCart } from '../utls/checkout-to-cart'
import { createCheckout } from '../utls/create-checkout'
import { getCheckoutQuery } from '../utls/queries/get-checkout'

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string
  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }: any) {
    let checkout: Checkout

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      })

      checkout = data.node
    } else {
      // チェックアウトする
      // チェックアウトがない場合は、チェックアウトを作成

      // チェックアウトするにはIDをチェックアウトする必要がある

      checkout = await createCheckout(fetch)
    }

    const cart = checkoutToCart(checkout)

    // Normalize checkout!
    return cart
  },
  useHook:
    ({ useData }) =>
    () => {
      const result = useData({
        swrOptions: {
          revalidateOnFocus: false,
        },
      })

      return useMemo(
        () => ({
          ...result,
          isEmpty: (result.data?.lineItems.length ?? 0) <= 0,
        }),
        [result]
      )
    },
}

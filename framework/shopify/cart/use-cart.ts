import { useMemo } from 'react'
import { useCart } from '../../common/cart/use-cart'
import { checkoutToCart } from '../utls/checkout-to-cart'
import { createCheckout } from '../utls/create-checkout'
import { getCheckoutQuery } from '../utls/queries/get-checkout'

export default useCart

export const handler = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ fetch, options, input: { checkoutId } }: any) {
    let checkout

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
    debugger
    return cart
  },
  useHook: ({ useData }: any) => {
    const data = useData({
      swrOptions: {
        revalidateOnFocus: false,
      },
    })

    return useMemo(() => data, [data])
  },
}

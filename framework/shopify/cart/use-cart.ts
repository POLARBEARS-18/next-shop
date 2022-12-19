import { useCart } from '../../common/cart/use-cart'
import { createCheckout } from '../utls/create-checkout'

export default useCart

export const handler = {
  fetchOptions: {
    query: 'query {hello}',
  },
  async fetcher({ fetch, options, input: { checkoutId } }: any) {
    let checkout

    if (checkoutId) {
      const { data } = await fetch({ ...options })

      checkout = data.none
    } else {
      // チェックアウトする
      // チェックアウトがない場合は、チェックアウトを作成

      // チェックアウトするにはIDをチェックアウトする必要がある

      checkout = await createCheckout(fetch)
    }

    return checkout
  },
  useHook: ({ useData }: any) => {
    const data = useData()
    return {
      data,
    }
  },
}

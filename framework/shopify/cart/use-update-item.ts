import { UseUpdateItem, useUpdateItem } from '../../common/cart/use-update-item'
import { Cart } from '../../common/types/cart'
import { MutationHook } from '../../common/types/hooks'
import { CheckoutLineItemsUpdatePayload } from '../schema'
import { checkoutToCart } from '../utls/checkout-to-cart'
import { getCheckoutId } from '../utls/get-checkout-id'
import { checkoutLineItemUpdateMutation } from '../utls/mutations/checkout-line-items-update'
import useCart from './use-cart'

export default useUpdateItem as UseUpdateItem<typeof handler>

export type UpdateItemDescriptor = {
  fetcherInput: {
    id: string
    variantId: string
    quantity: number
  }
  fetcherOutput: {
    checkoutLineItemsUpdate: CheckoutLineItemsUpdatePayload
  }
  data: Cart
}

export const handler: MutationHook<UpdateItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemUpdateMutation,
  },
  async fetcher({ input: item, options, fetch }) {
    const { data } = await fetch({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity ?? 1,
          },
        ],
      },
    })

    const cart = checkoutToCart(data.checkoutLineItemsUpdate.checkout)
    return cart
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate: updateCart } = useCart()

      return async (input) => {
        const data = await fetch(input)
        void updateCart(data, false)
        return data
      }
    },
}

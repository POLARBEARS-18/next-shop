import { MutationHook } from '../../common/types/hooks'
import { getCheckoutId } from '../utls/get-checkout-id'
import { checkoutLineItemsAddMutation } from '../utls/mutations/checkout-line-items-add'

export const handler: MutationHook = {
  fetcherOptions: {
    query: checkoutLineItemsAddMutation,
  },
  fetcher: async ({ fetch, options, input }) => {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
          variantId: input.variantId,
          quantity: 1,
        },
      ],
    }

    const response = await fetch({
      ...options,
      variables,
    })
    return response
  },
  useHook:
    ({ fetch }) =>
    async (input: any) => {
      const response = await fetch(input)

      return {
        output: response,
      }
    },
}

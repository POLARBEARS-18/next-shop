import { checkoutDetailFragment } from '../common'

export const getCheckoutQuery = `
  query($checkoutId: ID!){
    node(id: $checkoutId) {
      ... on Checkout {
        ${checkoutDetailFragment}
      }
    }
  }
`

import { checkoutDetailFragment } from '../common'

export const checkoutCreateMutation = `
mutation checkoutCreate($input: CheckoutCreateInput = {}) {
  checkoutCreate(input: $input) {
    checkoutUserErrors {
      field
      message
      }
      checkout {
        ${checkoutDetailFragment}
      }
    }
  }
}
`

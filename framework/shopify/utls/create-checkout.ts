import Cookies from 'js-cookie'
import { ApiFetcher } from '../../common/types/api'
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from '../const'
import { Checkout, CheckoutCreatePayload } from '../schema'
import { checkoutCreateMutation } from './mutations/checkout-create'

export const createCheckout = async (
  fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Checkout> => {
  const { data } = await fetch({
    query: checkoutCreateMutation,
  })

  const { checkout } = data.checkoutCreate

  if (!checkout) {
    throw new Error('Checkout cnnot be created!')
  }

  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}

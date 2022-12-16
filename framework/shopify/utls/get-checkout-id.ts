import Cookies from 'js-cookie'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '../const'

export const getCheckoutId = () => Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)

import { ApiConfig } from '../../common/types/api'
import { SHOPIFY_CHECKOUT_ID_COOKIE } from '../const'
import { fetchApi } from '../utls/fetch-api'

class Config {
  private config: ApiConfig

  constructor(config: any) {
    this.config = config
  }

  getConfig(): ApiConfig {
    return this.config
  }
}

const configWrapper = new Config({
  fetch: fetchApi,
  checkoutCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
})

export const getConfig = () => configWrapper.getConfig()

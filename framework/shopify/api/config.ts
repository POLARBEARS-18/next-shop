import { ApiConfig } from '../../common/types/api'
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
})

export const getConfig = () => configWrapper.getConfig()

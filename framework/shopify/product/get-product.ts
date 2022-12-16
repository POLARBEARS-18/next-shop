import { ApiConfig, Variables } from '../../common/types/api'
import { Product } from '../../common/types/product'
import { Product as ShopifyProduct } from '../schema'
import { getProductQuery } from '../utls/queries/get-product'
import { normalizeProduct } from '../utls/queries/normalize'

type FetchType = {
  productByHandle: ShopifyProduct
}

type ReturnType = {
  product: Product | null
}

export const getProduct = async (options: { config: ApiConfig; variables: Variables }): Promise<ReturnType> => {
  const { config, variables } = options

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    variables,
  })

  const { productByHandle } = data

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  }
}

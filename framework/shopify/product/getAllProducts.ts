import { ProductConnection } from '../schema'
import { Product } from '../../common/types/product'
import { getAllProductsQuery } from '../utls/queries/getAllProducts'
import { normalizeProduct } from '../utls/queries/normalize'
import { ApiConfig } from '../../common/types/api'

type ReturnType = {
  products: ProductConnection
}

export const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  })

  const products = data.products.edges.map(({ node: product }) => normalizeProduct(product)) ?? []

  return products
}

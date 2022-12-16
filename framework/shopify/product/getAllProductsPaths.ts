import { ApiConfig } from '../../common/types/api'
import { Product } from '../../common/types/product'
import { ProductConnection } from '../schema'
import { getAllProductsPathsQuery } from '../utls/queries/get-all-products-paths'

type ReturnType = {
  products: Pick<Product, 'slug'>[]
}

export const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductsPathsQuery,
  })

  const products = data.products.edges.map(({ node: { handle } }) => ({
    slug: handle,
  }))

  return { products }
}

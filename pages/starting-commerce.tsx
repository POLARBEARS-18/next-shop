import { InferGetStaticPropsType } from 'next'
import { getConfig } from '../framework/shopify/api/config'
import { getAllProducts } from '../framework/shopify/product/getAllProducts'

export const getStaticProps = async () => {
  const config = getConfig()

  const products = await getAllProducts(config)

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60,
  }
}

const StartingCommerce = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>{JSON.stringify(products)}</div>
)
export default StartingCommerce

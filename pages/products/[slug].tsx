import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Layout from '../../components/common/Layout/Layout'
import ProductView from '../../components/product/ProductView/ProductView'
import { getConfig } from '../../framework/shopify/api/config'
import { getProduct } from '../../framework/shopify/product/get-product'
import { getAllProductsPaths } from '../../framework/shopify/product/getAllProductsPaths'

// すべての製品スラッグを取得
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig()
  const { products } = await getAllProductsPaths(config)

  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}
// 製品固有のデータを提供
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig()
  const { product } = await getProduct({ config, variables: { slug: params?.slug } })

  return {
    props: {
      product,
    },
  }
}
const ProductSlug = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const a = ''
  return <>{product && <ProductView product={product} />}</>
}

export default ProductSlug

ProductSlug.Layout = Layout

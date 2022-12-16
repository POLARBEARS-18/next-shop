import { InferGetStaticPropsType } from 'next'
import Layout from '../components/common/Layout/Layout'
import ProductCard from '../components/product/ProductCard/ProductCard'
import Grid from '../components/ui/Grid/Grid'
import Hero from '../components/ui/Hero/Hero'
import Marquee from '../components/ui/Marquee/Marquee'
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

const Home = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Grid>
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
    <Hero
      headline="Hi There"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet esse repellendus facilis velit, possimus fuga consectetur maiores corporis veritatis quaerat deleniti illo qui, eum sed assumenda nemo eius optio eligendi."
    />
    <Marquee>
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} variant="slim" />
      ))}
    </Marquee>
    <Grid layout="B">
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
    <Marquee variant="secondary">
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} variant="slim" />
      ))}
    </Marquee>
  </>
)
export default Home

Home.Layout = Layout

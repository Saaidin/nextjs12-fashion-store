import Head from "next/head"
import Link from "next/link"
import Hero from "./components/Hero"
import Product from "../components2/Product"
import Sidebar from "./components/Sidebar"

export async function getStaticProps() {
  const menRes = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  )
  const menData = await menRes.json()

  const womenRes = await fetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  )
  const womenData = await womenRes.json()

  return {
    props: {
      products: [...menData, ...womenData],
    },
  }
}

export default function Products({ products }) {
  return (
    <div>
      <div>
        <Head>
          <title>Home Page | Fashion Store</title>
          <meta name="description" content="Best Cloth Store in town" />
          <link rel="icon" href="/favicon-1.ico" />
        </Head>
      </div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Link href={"/product/" + product.id} key={product.id}>
                <Product product={product} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Sidebar />
    </div>
  )
}

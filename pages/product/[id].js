import Head from "next/head"
import Image from "next/image"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import Sidebar from "../components/Sidebar"

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res.json()

  const paths = data.map((product) => {
    return {
      params: { id: product.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const res = await fetch("https://fakestoreapi.com/products/" + id)
  const data = await res.json()

  return {
    props: {
      product: data,
    },
  }
}

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext)

  return (
    <div>
      <div>
        <Head>
          <title>Product | Fashion Store</title>
          <meta name="description" content="Best Cloth Store in town" />
          <link rel="icon" href="/favicon-1.ico" />
        </Head>
      </div>
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto sm:w-11/12">
          <div className="flex flex-col lg:flex-row">
            {/* image */}
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <Image
                className="max-w-[200px] lg:max-w-sm"
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
              />
            </div>
            {/* text */}
            <div className="flex-1 text-center self-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.title}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                ${product.price}
              </div>
              <p className="mb-8">{product.description}</p>
              <button
                onClick={() => addToCart(product, product.id)}
                className="bg-primary py-4 px-8 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Sidebar />
    </div>
  )
}

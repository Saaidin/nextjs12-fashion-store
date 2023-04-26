import "../styles/globals.css"
import CartProvider from "../contexts/CartContext"
import Layout from "./components/Layout"
import SidebarProvider from "../contexts/SidebarContext"

function MyApp({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </SidebarProvider>
  )
}

export default MyApp

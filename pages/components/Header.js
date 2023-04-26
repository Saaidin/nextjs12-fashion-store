import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/img/logo.svg"
import { BsBag } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../contexts/CartContext"
import { SidebarContext } from "../../contexts/SidebarContext"

const Header = () => {
  //header state
  const [isActive, setIsActive] = useState(false)
  const { isOpen, setIsOpen } = useContext(SidebarContext)
  const { itemAmount } = useContext(CartContext)
  //event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    })
  })
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full sm:w-11/12">
        {/* logo */}
        <div className="cursor-pointer">
          <Link href={"/"}>
            <Image
              className="w-[40px]"
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
        </div>
        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

import { FC } from 'react'
import { ApiProvider } from '../../../framework/shopify'
import CartSidebar from '../../cart/CartSidebar/CartSidebar'
import { useUI } from '../../ui/context'
import Sidebar from '../../ui/Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import style from './Layout.module.css'

const Layout: FC = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI()

  return (
    <ApiProvider>
      <div className={style.root}>
        <Navbar />
        <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  )
}

export default Layout

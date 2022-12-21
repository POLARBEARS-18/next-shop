import Link from 'next/link'
import { FC } from 'react'
import { useCart } from '../../../framework/common/cart/use-cart'
import Bag from '../../icons/Bag'
import Heart from '../../icons/Heart'
import { useUI } from '../../ui/context'
import s from './Usernav.module.css'

const Usernav: FC = () => {
  const { openSidebar } = useUI()
  const { data } = useCart()

  return (
    <nav>
      <ul className={s.list}>
        <li className={s.item}>
          <Bag onClick={openSidebar} />
        </li>
        <li className={s.item}>
          <Link href="/wishlist">
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Usernav

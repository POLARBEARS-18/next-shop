import Link from 'next/link'
import { FC } from 'react'
import { LineItem } from '../../../framework/common/types/cart'
import useCart from '../../../framework/shopify/cart/use-cart'
import Bag from '../../icons/Bag'
import Heart from '../../icons/Heart'
import { useUI } from '../../ui/context'
import s from './Usernav.module.css'

const Usernav: FC = () => {
  const { openSidebar } = useUI()
  const { data } = useCart()

  const itemsCount = data?.lineItems.reduce((count: number, item: LineItem) => count + item.quantity, 0) ?? 0

  return (
    <nav>
      <ul className={s.list}>
        <li className={s.item}>
          <Bag onClick={openSidebar} />
          {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
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

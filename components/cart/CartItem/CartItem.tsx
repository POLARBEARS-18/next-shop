import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { LineItem } from '../../../framework/common/types/cart'
import useRemoveItem from '../../../framework/shopify/cart/use-remove-item'
import useUpdateItem from '../../../framework/shopify/cart/use-update-item'
import Minus from '../../icons/Minus'
import Plus from '../../icons/Plus'
import Trash from '../../icons/Trash'
import Swatch from '../../product/Swatch/Swatch'
import s from './CartItem.module.css'

const CartItem = ({ item, currencyCode }: { item: LineItem; currencyCode: string }) => {
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem()

  const [quantity, setQuantity] = useState(item.quantity)
  const price = item.variant.price! * item.quantity || 0
  const { options } = item

  const handleQuantityChange = (val: number) => {
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      void updateItem({
        id: item.id,
        variantId: item.variantId,
        quantity: val,
      })
    }
  }

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    void handleQuantityChange(val)
  }

  const incrementQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    void handleQuantityChange(val)
  }

  return (
    <li
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': false,
      })}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer">
        <Image
          onClick={() => {}}
          className={s.productImage}
          width={150}
          height={150}
          src={item.variant.image!.url}
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        <Link href="/">
          <span className="font-bold text-lg cursor-pointer leading-6" onClick={() => {}}>
            {item.name}
          </span>
        </Link>
        <div className="flex p-1">
          {options &&
            options.length > 0 &&
            options.map((option) => {
              const value = option.values[0]

              return (
                <Swatch
                  key={`${item.id}-${option.displayName}`}
                  size="sm"
                  onClick={() => {}}
                  label={value.label}
                  color={value.hexColor}
                  variant={option.displayName}
                />
              )
            })}
        </div>
        <div className="flex items-center mt-3">
          <button type="button">
            <Minus
              onClick={() => {
                void incrementQuantity(-1)
              }}
            />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={() => {
                handleQuantity
              }}
              onBlur={() => {}}
            />
          </label>
          <button type="button">
            <Plus
              onClick={() => {
                void incrementQuantity(+1)
              }}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>
          {price} {currencyCode}
        </span>
        <button
          type="button"
          onClick={() => {
            void removeItem({ id: item.id })
          }}
          className="flex justify-end outline-none"
        >
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem

import style from './styles.module.scss'
import { Button, CartIconWhite } from '@/UI'
import { CartProducts } from '@/components'
import { useState } from 'react'
import { useCart } from '@/hooks'

export const Header = () => {
  const [showCart, setShowCart] = useState(false)
  const { cart } = useCart()

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <div className={style.header}>
      <p className={style.logo}>
        Vegetable <span className={style.part}> SHOP </span>
      </p>
      <Button
        variant="header"
        title="Cart"
        icon={<CartIconWhite />}
        onClick={() => {
          setShowCart(!showCart)
          console.log('click')
        }}
        quantity={totalItems > 0 ? totalItems : undefined}
      />
      {showCart && <CartProducts />}
    </div>
  )
}

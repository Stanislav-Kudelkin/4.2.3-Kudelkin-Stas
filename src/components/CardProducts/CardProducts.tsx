import style from './styles.module.scss'
import { useState } from 'react'
import type { Product } from '@/modules'
import { Button, Card, CartIconGreen, LoaderIcon } from '@/UI'
import { Counter } from '@/components'
import { useCart } from '@/hooks'

interface TaskCard {
  product: Product
}

export const CardProducts = ({ product }: TaskCard) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [vegName, weight] = product.name.split('-')
  const { cart, addToCart, updateCart, removeFromCart } = useCart()
  const [previewQuantity, setPreviewQuantity] = useState(1)

  const cartItem = cart.find((item) => item.product.id === product.id)
  const inCart = !!cartItem

  const displayQuantity = inCart ? cartItem.quantity : previewQuantity

  const handleQuantity = (newQuantity: number) => {
    if (inCart) {
      updateCart(product, newQuantity)
    } else {
      setPreviewQuantity(newQuantity)
    }
  }

  const handleActionCart = () => {
    if (inCart) {
      removeFromCart(product.id)
    } else {
      addToCart(product, previewQuantity)
      setPreviewQuantity(1)
    }
  }

  return (
    <Card>
      {imageLoading && (
        <div className={style.imageLoader}>
          <LoaderIcon />
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        width={276}
        onLoad={() => setImageLoading(false)}
      />
      <div className={style.container}>
        <div className={style.row}>
          <h4 className={style.name}>
            <span className={style.vegName}>{vegName}</span>
            <span className={style.weight}>{weight}</span>
          </h4>
          <Counter count={displayQuantity} onChange={handleQuantity} min={1} />
        </div>
        <div className={style.row}>
          <h4 className={style.price}>{` $ ${product.price}`}</h4>
          <Button
            variant="card"
            title={inCart ? 'In cart' : 'Add to cart'}
            icon={<CartIconGreen />}
            id={product.id}
            onClick={handleActionCart}
          />
        </div>
      </div>
    </Card>
  )
}

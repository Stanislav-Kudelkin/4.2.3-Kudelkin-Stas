import { useState } from 'react'
import type { Product, CartItem } from '@/modules'
import { CartContext } from './CartContext'

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const same = prev.find((item) => item.product.id === product.id)
      if (same) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateCart = (product: Product, newQuantity: number) => {
    setCart((prev) => {
      if (newQuantity < 1) {
        return prev.filter((item) => item.product.id !== product.id)
      }

      const same = prev.find((item) => item.product.id === product.id)

      if (same) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      return [...prev, { product, quantity: newQuantity }]
    })
  }

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

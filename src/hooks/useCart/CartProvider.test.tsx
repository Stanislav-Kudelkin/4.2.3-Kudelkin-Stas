import { renderHook, act } from '@testing-library/react'
import { CartProvider } from './CartProvider'
import { useCart } from './useCart'
import { describe, it, expect } from 'vitest'

describe('CartProvider', () => {
  const testProduct = {
    id: 1,
    name: 'Brocolli - 1 Kg',
    price: 120,
    image:
      'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg',
    category: 'vegetables',
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  it('добавляет товар в корзину', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart(testProduct, 2)
    })
    expect(result.current.cart.length).toBe(1)
  })

  it('считает сумму', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart(testProduct, 3)
    })
    expect(result.current.total).toBe(360)
  })

  it('удаляет товар из корзины по кнопке в карточке товара', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart(testProduct, 2)
    })
    expect(result.current.cart.length).toBe(1)
    act(() => {
      result.current.removeFromCart(testProduct.id)
    })
    expect(result.current.cart.length).toBe(0)
  })

  it('удаляет товар при обнулении счетчика в корзине', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addToCart(testProduct, 2)
    })
    expect(result.current.cart.length).toBe(1)
    act(() => {
      result.current.updateCart(testProduct, 0)
    })
    expect(result.current.cart.length).toBe(0)
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartProducts } from './CartProducts'
import { useCart } from '@/hooks'

vi.mock('@/hooks', () => ({
  useCart: vi.fn(),
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

describe('CartProducts', () => {
  const mockUseCart = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Когда корзина пуста', () => {
    beforeEach(() => {
      mockUseCart.mockReturnValue({
        cart: [],
        total: 0,
        updateCart: vi.fn(),
      })
      vi.mocked(useCart).mockImplementation(mockUseCart)
    })

    it('показывает сообщение о пустой корзине', () => {
      render(<CartProducts />)
      expect(screen.getByText('You cart is empty!')).toBeInTheDocument()
    })
  })

  describe('Когда в корзине есть товары', () => {
    beforeEach(() => {
      mockUseCart.mockReturnValue({
        cart: [
          {
            product: {
              id: 1,
              name: 'Brocolli - 1 Kg',
              price: 120,
              image:
                'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg',
            },
            quantity: 2,
          },
        ],
        total: 240,
        updateCart: vi.fn(),
      })
      vi.mocked(useCart).mockImplementation(mockUseCart)
    })

    it('показывает товары, их цену и общую стоимость', () => {
      render(<CartProducts />)

      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByAltText('Brocolli - 1 Kg')).toBeInTheDocument()

      expect(screen.getByText('$ 120')).toBeInTheDocument()

      expect(screen.getByText(/Total/i)).toBeInTheDocument()
      expect(screen.getByText('$ 240')).toBeInTheDocument()
    })

    it('не показывает сообщение о пустой корзине', () => {
      render(<CartProducts />)
      expect(screen.queryByText('You cart is empty!')).toBeNull()
    })
  })
})

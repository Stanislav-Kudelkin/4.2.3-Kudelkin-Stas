import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardProducts } from './CardProducts'
import type { Product, CartContextType, CartItem } from '@/modules'
import { useCart } from '@/hooks'

vi.mock('@/hooks', () => ({
  useCart: vi.fn(),
}))

describe('CardProducts', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Brocolli - 1 Kg',
    price: 120,
    image:
      'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg',
    category: 'vegetables',
  }

  const mockCartItem: CartItem = {
    product: mockProduct,
    quantity: 2,
  }

  const createMockCart = (cartItems: CartItem[] = []): CartContextType => ({
    cart: cartItems,
    total: cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
    addToCart: vi.fn(),
    updateCart: vi.fn(),
    removeFromCart: vi.fn(),
  })

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCart).mockReturnValue(createMockCart())
  })

  it('должен рендериться без ошибок', () => {
    expect(() => render(<CardProducts product={mockProduct} />)).not.toThrow()
  })

  it('показывает название и вес продукта', () => {
    render(<CardProducts product={mockProduct} />)
    expect(screen.getByText('Brocolli')).toBeInTheDocument()
    expect(screen.getByText('1 Kg')).toBeInTheDocument()
  })

  it('показывает цену продукта', () => {
    render(<CardProducts product={mockProduct} />)
    expect(screen.getByText('$ 120')).toBeInTheDocument()
  })

  it('показывает изображение продукта', () => {
    render(<CardProducts product={mockProduct} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg'
    )
    expect(image).toHaveAttribute('alt', 'Brocolli - 1 Kg')
  })

  describe('Когда продукта нет в корзине', () => {
    it('показывает кнопку "Add to cart"', () => {
      render(<CardProducts product={mockProduct} />)
      expect(screen.getByText(/Add to cart/i)).toBeInTheDocument()
    })

    it('вызывает addToCart при клике на кнопку', async () => {
      const user = userEvent.setup()
      const addToCartMock = vi.fn()
      vi.mocked(useCart).mockReturnValue({
        ...createMockCart(),
        addToCart: addToCartMock,
      })

      render(<CardProducts product={mockProduct} />)
      const addButton = screen.getByText(/Add to cart/i)
      await user.click(addButton)

      expect(addToCartMock).toHaveBeenCalledWith(mockProduct, 1)
    })
  })

  describe('Когда продукт есть в корзине', () => {
    beforeEach(() => {
      vi.mocked(useCart).mockReturnValue(createMockCart([mockCartItem]))
    })

    it('показывает кнопку "In cart"', () => {
      render(<CardProducts product={mockProduct} />)
      const button = screen.getByRole('button', { name: /cart/i })
      expect(button).toHaveTextContent(/In cart/i)
    })

    it('показывает Counter со значением из корзины (2)', () => {
      render(<CardProducts product={mockProduct} />)
      const counterValue = screen.getByText('2')
      expect(counterValue).toBeInTheDocument()
    })
  })
})

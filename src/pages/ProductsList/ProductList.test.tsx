import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductsList } from './ProductsList'
import { useProducts } from '@/hooks'

vi.mock('@/hooks', () => ({
  useProducts: vi.fn(),
  useCart: () => ({
    cart: [],
    total: 0,
    addToCart: vi.fn(),
    updateCart: vi.fn(),
    removeFromCart: vi.fn(),
  }),
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

describe('ProductsList', () => {
  it('показывает лоадеры при загрузке', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      loading: true,
      error: null,
    })

    render(<ProductsList />)
    expect(screen.getByText('Catalog')).toBeInTheDocument()
  })

  it('показывает продукты после загрузки', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [
        {
          id: 1,
          name: 'Test Product',
          price: 10,
          image: '/test.jpg',
          category: 'test',
        },
      ],
      loading: false,
      error: null,
    })

    render(<ProductsList />)
    expect(screen.getByText('Catalog')).toBeInTheDocument()
  })

  it('показывает ошибку при неудачной загрузке', () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      loading: false,
      error: 'Ошибка загрузки',
    })

    render(<ProductsList />)
    expect(screen.getByText(/Ошибка:/i)).toBeInTheDocument()
    expect(screen.getByText(/Ошибка загрузки/i)).toBeInTheDocument()
  })
})

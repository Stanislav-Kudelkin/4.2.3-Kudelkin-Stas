import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

vi.mock('@/hooks', () => ({
  useCart: () => ({
    cart: [],
    total: 0,
    addToCart: vi.fn(),
    updateCart: vi.fn(),
    removeFromCart: vi.fn(),
  }),
}))

describe('Header', () => {
  it('рендерится без ошибок', () => {
    expect(() => render(<Header />)).not.toThrow()
  })

  it('содержит логотип магазина', () => {
    render(<Header />)

    const logoElement = screen.getByText(/Vegetable/i)
    expect(logoElement).toBeInTheDocument()

    const shopElement = screen.getByText(/SHOP/i)
    expect(shopElement).toBeInTheDocument()
  })

  it('содержит кнопку корзины', () => {
    render(<Header />)

    const cartElement = screen.getByText(/Cart/i, { exact: false })
    expect(cartElement).toBeInTheDocument()
  })
})

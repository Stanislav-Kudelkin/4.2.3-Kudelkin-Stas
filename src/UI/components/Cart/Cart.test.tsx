import { render, screen } from '@testing-library/react'
import { Cart } from './Cart'
import { describe, it, expect } from 'vitest'

describe('Cart', () => {
  it('рендерит children внутри корзины', () => {
    render(
      <Cart>
        <div data-testid="child">Cart content</div>
      </Cart>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

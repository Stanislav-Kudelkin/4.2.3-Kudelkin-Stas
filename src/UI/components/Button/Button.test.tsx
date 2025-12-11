import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
  it('рендерит кнопку с текстом', () => {
    render(
      <Button
        icon={<span></span>}
        title="Add to cart"
        onClick={() => {}}
        variant="card"
      />
    )

    expect(screen.getByText('Add to cart')).toBeInTheDocument()
  })

  it('вызывает функцию при клике', () => {
    let clicked = false
    const handleClick = () => {
      clicked = true
    }
    render(
      <Button
        icon={<span></span>}
        title="Добавить"
        onClick={handleClick}
        variant="card"
      />
    )
    const button = screen.getByText('Добавить')
    fireEvent.click(button)

    expect(clicked).toBe(true)
  })

  it('показывает количество товаров если оно указано и больше 0', () => {
    render(
      <Button
        icon={<span></span>}
        title="Корзина"
        onClick={() => {}}
        variant="header"
        quantity={3}
      />
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })
})

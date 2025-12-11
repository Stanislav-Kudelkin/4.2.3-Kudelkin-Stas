import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'
import { describe, it, expect } from 'vitest'

describe('Counter', () => {
  it('показывает текущее число', () => {
    render(<Counter count={5} onChange={() => {}} min={1} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('имеет кнопки + и -', () => {
    render(<Counter count={1} onChange={() => {}} min={1} />)
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('увеличивает значение при нажатии +', () => {
    let newValue = 0
    render(<Counter count={1} onChange={(val) => (newValue = val)} min={1} />)

    fireEvent.click(screen.getByText('+'))
    expect(newValue).toBe(2)
  })

  it('уменьшает значение при нажатии -', () => {
    let newValue = 0
    render(<Counter count={3} onChange={(val) => (newValue = val)} min={1} />)

    fireEvent.click(screen.getByText('-'))
    expect(newValue).toBe(2)
  })
})

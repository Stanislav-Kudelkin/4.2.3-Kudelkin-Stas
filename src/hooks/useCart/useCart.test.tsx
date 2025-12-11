import { renderHook } from '@testing-library/react'
import { useCart } from './useCart'
import { describe, it, expect } from 'vitest'

describe('useCart', () => {
  it('не работает без провайдера', () => {
    expect(() => {
      renderHook(() => useCart())
    }).toThrow()
  })
})

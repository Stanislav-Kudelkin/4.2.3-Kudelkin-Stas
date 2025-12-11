import { renderHook } from '@testing-library/react'
import { useProducts } from './useProduct'
import { describe, it, expect } from 'vitest'

describe('useProducts', () => {
  it('возвращает начальное состояние', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.products).toEqual([])
    expect(result.current.loading).toBe(true)
  })

  it('имеет все необходимые поля', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current).toHaveProperty('products')
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('error')
  })
})

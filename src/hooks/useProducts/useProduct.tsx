import { useState, useEffect } from 'react'
import type { Product } from '@/modules'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const response = await fetch(
          'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
        )
        if (!response.ok) throw Error(`Ошибка загрузки: ${response.status}`)

        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Ошибка:', error)
        setError(error instanceof Error ? error.message : 'Не известная ошибка')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return { products, loading, error }
}

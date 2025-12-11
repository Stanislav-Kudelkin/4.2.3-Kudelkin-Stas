import style from './styles.module.scss'
import { CardProducts, Header } from '@/components'
import { useProducts } from '@/hooks'
import { CardLoading } from '@/UI'
import { CartProvider } from '@/hooks'

export const ProductsList = () => {
  const { products, loading, error } = useProducts()
  if (error) return <div>Ошибка: {error}</div>
  return (
    <CartProvider>
      <Header />
      <h2 className={style.title}> Catalog </h2>
      <div className={style.container}>
        {loading
          ? [...Array(12)].map((_, index) => <CardLoading key={index} />)
          : products.map((product) => (
              <CardProducts key={product.id} product={product} />
            ))}
      </div>
    </CartProvider>
  )
}

import { Counter } from '../Counter'
import style from './styles.module.scss'
import { Cart, CartEmptyIcon } from '@/UI'
import { useCart } from '@/hooks'

export const CartProducts = () => {
  const { cart, total, updateCart } = useCart()
  return (
    <Cart>
      {cart.length === 0 ? (
        <div className={style.empti}>
          <CartEmptyIcon />
          <span className={style.title}>You cart is empty!</span>
        </div>
      ) : (
        <div className={style.cart}>
          {cart.map((item) => {
            const [vegName, weight] = item.product.name.split('-')

            return (
              <div key={item.product.id} className={style.card}>
                <img
                  className={style.image}
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                />
                <div className={style.core}>
                  <h4 className={style.name}>
                    <span className={style.vegName}>{vegName}</span>
                    <span className={style.weight}>{weight}</span>
                  </h4>
                  <div className={style.wrapper}>
                    <div className={style.price}>$ {item.product.price}</div>
                    <Counter
                      count={item.quantity}
                      onChange={(newQuantity) =>
                        updateCart(item.product, newQuantity)
                      }
                      min={0}
                    />
                  </div>
                </div>
              </div>
            )
          })}
          <div className={style.total}>
            <span>Total</span>$ {total}
          </div>
        </div>
      )}
    </Cart>
  )
}

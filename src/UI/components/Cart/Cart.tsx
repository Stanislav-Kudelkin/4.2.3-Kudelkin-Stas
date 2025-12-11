import style from './styles.module.scss'

export const Cart = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.cart}>{children}</div>
}
